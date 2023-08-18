package greenNare.challenge.service;

import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import greenNare.auth.jwt.JwtTokenizer;
import greenNare.challenge.dto.ChallengeDto;
import greenNare.challenge.entity.Challenge;
import greenNare.challenge.repository.ChallengeRepository;
import greenNare.config.SecurityConfiguration;
import greenNare.exception.BusinessLogicException;
import greenNare.exception.ExceptionCode;
import greenNare.member.entity.Member;
import greenNare.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Transactional
@Service
public class ChallengeService {



    private final ChallengeRepository challengeRepository;
    private final MemberService memberService;
    private final SecurityConfiguration securityConfiguration;
    private final JwtTokenizer jwtTokenizer;
    @Value("${spring.cloud.gcp.storage.bucket}")
    private String bucketName;
    private final Storage storage;


    public static final String IMAGE_SAVE_URL = "/home/ssm-user/seb44_main_026/images/";
    public static final String IMAGE_DELETE_URL = "/home/ssm-user/seb44_main_026";
    public static final String SEPERATOR  = "_";

    public ChallengeService(ChallengeRepository challengeRepository, MemberService memberService, SecurityConfiguration securityConfiguration, JwtTokenizer jwtTokenizer, Storage storage) {
        this.challengeRepository = challengeRepository;
        this.memberService = memberService;
        this.securityConfiguration = securityConfiguration;
        this.jwtTokenizer = jwtTokenizer;
        this.storage = storage;
    }

    public ChallengeDto.Response createChallenge(Challenge challenge, String token, MultipartFile file) throws NullPointerException, IOException {
        if(token.isBlank()) {
            throw new BusinessLogicException(ExceptionCode.INVALID_TOKEN);
        }
        int memberId = jwtTokenizer.getMemberId(token);
        Member member = findMemberByToken(token);

        challenge.setMember(member); // 멤버 넣어야함

        Challenge imageSaveChallenge = saveFile(challenge, file);

        memberService.deletePoint(memberId, 500);

        Challenge saveChallenge = challengeRepository.save(imageSaveChallenge);

        ChallengeDto.Response response = ChallengeDto.Response.from(saveChallenge);
        response.setName(member.getName());
        response.setPoint(member.getPoint());
        return response;
    }
    public Challenge saveFile(Challenge challenge, MultipartFile file) throws IOException{
        UUID uuid = UUID.randomUUID();
        String fileName = uuid.toString();
        String type = file.getContentType();
        BlobInfo blobInfo = storage.create(
                BlobInfo.newBuilder(bucketName, fileName)
                        .setContentType("image/jpeg")
                        .build(),
                file.getInputStream()
        );
        String name = bucketName+"/"+fileName;
        challenge.setImage(name);
        return challengeRepository.save(challenge);

    }

    public Challenge saveImage(Challenge challenge, MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            log.info("patch 요청에 image 없음");
            return challenge;
        }
        log.info("patch 요청에 image 있음");
        String projectPath = IMAGE_SAVE_URL;

        UUID uuid = UUID.randomUUID();
        String fileName = uuid + SEPERATOR + file.getOriginalFilename(); // 숨기기. 파일 객체가 이메서드를 갖고 있도록

        File saveFile = new File(projectPath, fileName);
        file.transferTo(saveFile);

        String image = "/images/" + fileName;

        challenge.setImage(image);
        return challengeRepository.save(challenge);
    }

    public List<ChallengeDto.PageResponse> getChallenges(Pageable pageable) {
        log.info("@@@@ getChallenges 호출");

        Page<Challenge> challengePage = challengeRepository.findAll(pageable);

        List<ChallengeDto.PageResponse> challenges = challengePage.stream()
                .map(challenge -> {
                    ChallengeDto.PageResponse response =  ChallengeDto.PageResponse.from(challenge);
                    response.setCountReply(getReplyCountForChallenge(challenge.getChallengeId())); //(countReply(challenge.getChallengeId()));
                    Member member = challenge.getMember();
                    response.setName(member.getName());
                    response.setPoint(member.getPoint());
                    return response;
                }

                ).collect(Collectors.toList());
        return challenges;
    }
    public Page<Challenge> getChallengesPage(Pageable pageable) {
        int pageNumber = pageable.getPageNumber();
        int pageSize = pageable.getPageSize();

        log.info("@@@@ getChallengePage 호출됨");
        Page<Challenge> challengePage = challengeRepository.findAll(PageRequest.of(pageNumber, pageSize));
        log.info("@@@ challengePage content : {}", challengePage.getNumber());
        return challengePage;
    }

    public ChallengeDto.Response getChallenge(int challengeId) {
        log.info(String.valueOf("#### get challenge 시작 / challengeId :"+  String.valueOf(challengeId)));

        Challenge challenge = findVerifideChallenge(challengeId);
        log.info("### challenge content : {}", challenge.getContent());
        ChallengeDto.Response response = ChallengeDto.Response.from(challenge);
        response.setCountReply(getReplyCountForChallenge(challengeId)); //(countReply(challengeId));

        log.info("response : {}", response.getName());

        return addWriterInfo(challenge.getMember(), response);

    }
    public Page<Challenge> getMyChallengePage(Pageable pageable, String token){
        int memberId = jwtTokenizer.getMemberId(token);
        Page<Challenge> challengePage = challengeRepository.findByMemberMemberId(memberId, pageable);

        List<Challenge> list = challengeRepository.findByMemberMemberId(memberId);
        log.info("findByMemberId List로 추출했을 때 : {}", list.size());
        return challengePage;
    }

    public List<Challenge> getMyChallenges (Page<Challenge> challengePage){
        List<Challenge>  challengeList = challengePage.stream().collect(Collectors.toList());
        return challengeList;
    }

    public ChallengeDto.Response updateChallenge(Challenge challenge, int challengeId, MultipartFile image, String token) throws IOException {
        Challenge findChallenge = findVerifideChallenge(challengeId);

        validateWriter(findChallenge.getMember(), token);

        File file = new File(IMAGE_DELETE_URL+findChallenge.getImage());
        deleteImage(file);

        findChallenge.setImage(null);

        log.info("update image delete");

        Optional.ofNullable(challenge.getTitle())
                .ifPresent(title -> findChallenge.setTitle(title));
        Optional.ofNullable(challenge.getContent())
                .ifPresent(content -> findChallenge.setContent(content));

        Challenge imageSaveChallenge = saveImage(findChallenge, image);

        challengeRepository.save(imageSaveChallenge);
        ChallengeDto.Response response = ChallengeDto.Response.from(imageSaveChallenge);
        return addWriterInfo(imageSaveChallenge.getMember(), response);
    }

    public void deleteChallenge(int challengeId, String token){
        log.info("##### delete challenge start");
        if(token.isBlank()){
            throw new BusinessLogicException(ExceptionCode.INVALID_TOKEN);
        }
        log.info("##### token empty 통과");
        Challenge findChallenge = findVerifideChallenge(challengeId);
        validateWriter(findChallenge.getMember(),token);

        File file = new File(IMAGE_DELETE_URL+findChallenge.getImage());
        deleteImage(file);
        log.info("##### find challenge 통과");
        challengeRepository.delete(findChallenge);
    }

    public ChallengeDto.Response addWriterInfo(Member member, ChallengeDto.Response response) {
        response.setName(member.getName());
        response.setPoint(member.getPoint());
        return response;
    }

    public Challenge findVerifideChallenge(int challengeId) {
        log.info("findVerifiedChallenge challengeId : {}", challengeId);
        Optional<Challenge> optionalChallenge =
                challengeRepository.findById(challengeId);
        Challenge findChallenge = optionalChallenge.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.CHALLENGE_NOT_FOUND));
        log.info("성공");
        return findChallenge;
    }
    public void deleteImage(File file){
        if(file.exists()) file.delete();
    }

    public Member findMemberByToken(String token) {
        if(token.isBlank()) {
            throw new BusinessLogicException(ExceptionCode.INVALID_TOKEN);
        }
        int memberId = jwtTokenizer.getMemberId(token);
        log.info("token에서 추출한 memberId : {}", memberId);
        return memberService.findMemberById(memberId);
    }

    public void validateWriter(Member member, String token) {
        if(token.isBlank()) {
            throw new BusinessLogicException(ExceptionCode.INVALID_TOKEN);
        }
        if (findMemberByToken(token).getMemberId() != member.getMemberId()) {
            log.info("작성자와 접근자(수정) 불일치");
            throw new BusinessLogicException(ExceptionCode.UNMATCHED_WRITER);
        }
        log.info("validateWriter OK");
    }

    public int getReplyCountForChallenge(int challengeId) {
        Challenge challenge = challengeRepository.findById(challengeId)
                .orElseThrow(() -> new NoSuchElementException("Challenge not found with ID: " + challengeId));

        return challenge.getReply().size();
    }
}
