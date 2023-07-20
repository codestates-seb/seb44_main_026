package greenNare.challenge.service;

import greenNare.auth.jwt.JwtTokenizer;
import greenNare.challenge.dto.ChallengeDto;
import greenNare.challenge.entity.Challenge;
import greenNare.challenge.repository.ChallengeRepository;
import greenNare.config.SecurityConfiguration;
import greenNare.exception.BusinessLogicException;
import greenNare.exception.ExceptionCode;
import greenNare.member.entity.Member;
import greenNare.member.service.MemberService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
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

    public static final String IMAGE_SAVE_URL = "/src/main/resources/static/images";
    public static final String SEPERATOR  = "_";

    public ChallengeService(ChallengeRepository challengeRepository, MemberService memberService, SecurityConfiguration securityConfiguration, JwtTokenizer jwtTokenizer) {
        this.challengeRepository = challengeRepository;
        this.memberService = memberService;
        this.securityConfiguration = securityConfiguration;
        this.jwtTokenizer = jwtTokenizer;
    }

    public ChallengeDto.Response createChallenge(Challenge challenge, String token, MultipartFile file) throws NullPointerException, IOException {
        Member member = findMemberByToken(token);

        challenge.setMemberId(member.getMemberId());

        Challenge imageSaveChallenge = saveImage(challenge, file);

        Challenge saveChallenge = challengeRepository.save(imageSaveChallenge);

        ChallengeDto.Response response = ChallengeDto.Response.from(saveChallenge);
        response.setName(member.getName());
        response.setPoint(member.getPoint());
        return response;
    }

    public Challenge saveImage(Challenge challenge, MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            log.info("patch 요청에 image 없음");
            return challenge;
        }
        log.info("patch 요청에 image 있음");
        String projectPath = System.getProperty("user.dir")+ IMAGE_SAVE_URL; // * 상수 값은 모두 변수로 만들기
        String path = "/home/ssm-user/seb44_main_026/image"+IMAGE_SAVE_URL;
        log.info("user.dir: {}", System.getProperty("user.dir"));

        UUID uuid = UUID.randomUUID();
        String fileName = uuid + SEPERATOR + file.getOriginalFilename(); // 숨기기. 파일 객체가 이메서드를 갖고 있도록

        File saveFile = new File(path, fileName);
        file.transferTo(saveFile);

        String image = "/images/" + fileName; // /user/images/
        //String image = "file:"+System.getProperty("user.dir")+"/images/" + fileName; // /user/images/

        challenge.setImage(image);
        return challengeRepository.save(challenge);
    }

    public List<ChallengeDto.PageResponse> getChallenges(Pageable pageable) {
        log.info("@@@@ getChallenges 호출");

        Page<Challenge> challengePage = challengeRepository.findAll(pageable);

        List<ChallengeDto.PageResponse> challenges = challengePage.stream()
                .map(challenge -> {
                    ChallengeDto.PageResponse response =  ChallengeDto.PageResponse.from(challenge);
                    Member member = memberService.findMemberById(challenge.getMemberId());
                    response.setName(member.getName());
                    response.setPoint(member.getPoint());

                    //response.setName(findUsername(challenge.getMemberId()));
                    //response.setPoint(findPoint(challenge.getMemberId()));
                    return response;
                }
                        /*
                        new ChallengeDto.PageResponse(
                        challenge.getChallengeId(),
                        challenge.getMemberId(),
                        challenge.getTitle(),
                        findUsername(challenge.getMemberId()),
                        findPoint(challenge.getMemberId()),
                        challenge.getCreatedAt(),
                        challenge.getUpdatedAt())*/
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
/*
    public Page<Object[]> getAllChallengeWithUsername(Pageable pageable) {
        return challengeRepository.getAllChallengeWithUsername(pageable);
        /*Page<Challenge> challengeList =  challengeRepository.findAll(PageRequest.of(page, size,
                Sort.by("challengeId").descending()));
        challengeList.stream()
                .map(challenge -> new ChallengeDto.Response(
                        challenge.getChallengeId(),
                        challenge.getMemberId(),
                        challenge.getTitle(),
                        challenge.getContent(),
                        challenge.getCreatedAt(),
                        challenge.getImage()
                ))*/
    //}

    public ChallengeDto.Response getChallenge(int challengeId) {
        log.info(String.valueOf("#### get challenge 시작 / challengeId :"+  String.valueOf(challengeId)));

        Challenge challenge = findVerifideChallenge(challengeId);
        log.info("### challenge content : {}", challenge.getContent());
        //ChallengeDto.Response response = challengeRepository.findByMemberId(challenge.getMemberId());
        ChallengeDto.Response response = ChallengeDto.Response.from(challenge);

        //response.setName(findUsername(challenge.getMemberId()));
        //response.setPoint(findPoint(challenge.getMemberId()));
        /*new ChallengeDto.Response(
                challenge.getChallengeId(),
                challenge.getMemberId(),
                challenge.getTitle(),
                challenge.getContent(),
                challenge.getUpdatedAt(),
                challenge.getCreatedAt(),
                challenge.getImage(),
                findUsername(challenge.getMemberId()),
                findPoint(challenge.getMemberId())
        );*/
        log.info("response : {}", response.getName());

        return addWriterInfo(challenge.getMemberId(), response);

    }

    public ChallengeDto.Response updateChallenge(Challenge challenge, int challengeId, MultipartFile image, String token) throws IOException {
        Challenge findChallenge = findVerifideChallenge(challengeId);
        validateWriter(challenge, token);

        File file = new File(System.getProperty("user.dir")+"/src/main/resources/static"+findChallenge.getImage());
        deleteImage(file);

        findChallenge.setImage(null);

        log.info("update image delete");

        Optional.ofNullable(challenge.getTitle())
                .ifPresent(title -> findChallenge.setTitle(title));
        Optional.ofNullable(challenge.getContent())
                .ifPresent(content -> findChallenge.setContent(content));

        Challenge imageSaveChallenge = saveImage(findChallenge, image);

        challengeRepository.save(imageSaveChallenge);
        //ChallengeDto.Response response = challengeRepository.findByMemberId(challenge.getMemberId());
        //ChallengeDto.Response challengeResponseDto = ChallengeDto.Response.from(imageSaveChallenge);
        ChallengeDto.Response response = ChallengeDto.Response.from(imageSaveChallenge);
        //response.setName(findUsername(challenge.getMemberId()));
        //response.setPoint(findPoint(challenge.getMemberId()));
                /*new ChallengeDto.Response(
                imageSaveChallenge.getChallengeId(),
                imageSaveChallenge.getMemberId(),
                imageSaveChallenge.getTitle(),
                imageSaveChallenge.getContent(),
                imageSaveChallenge.getUpdatedAt(),
                imageSaveChallenge.getCreatedAt(),
                imageSaveChallenge.getImage(),
                findUsername(challenge.getMemberId()),
                findPoint(challenge.getMemberId())

        );*/
        return addWriterInfo(imageSaveChallenge.getMemberId(), response);
    }

    public void deleteChallenge(int challengeId, String token){
        log.info("##### delete challenge start");
        //if(token.isEmpty()){
          //  throw new BusinessLogicException(ExceptionCode.INVALID_TOKEN);
        //}
        log.info("##### token empty 통과");
        Challenge findChallenge = findVerifideChallenge(challengeId);
        File file = new File(System.getProperty("user.dir")+"/src/main/resources/static"+findChallenge.getImage());
        deleteImage(file);
        log.info("##### find challenge 통과");
        challengeRepository.delete(findChallenge);
    }

    public ChallengeDto.Response addWriterInfo(int memberId, ChallengeDto.Response response) {
        Member member = memberService.findMemberById(memberId);
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
        int memberId = jwtTokenizer.getMemberId(token);
        return memberService.findMemberById(memberId);
    }

    public void validateWriter(Challenge challenge, String token) {
        if (findMemberByToken(token).getMemberId() != challenge.getMemberId()) {
            throw new BusinessLogicException(ExceptionCode.UNMATCHED_WRITER);
        }
    }
}
