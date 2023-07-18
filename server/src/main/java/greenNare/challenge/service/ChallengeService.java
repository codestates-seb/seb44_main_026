package greenNare.challenge.service;

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

import javax.swing.text.html.Option;
import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Objects;
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

    public ChallengeService(ChallengeRepository challengeRepository, MemberService memberService, SecurityConfiguration securityConfiguration) {
        this.challengeRepository = challengeRepository;
        this.memberService = memberService;
        this.securityConfiguration = securityConfiguration;
    }

    public Challenge createChallenge(Challenge challenge) throws NullPointerException {//, String token) {
        /*
        String memberEmail = jwtTokenizer.getUsername(token)
        Member member = memberService.findMemberByEmail(memberEmail);
        Long id = member.getId()
        Long point = member.getPoint()
        challenge.setMemberId(id);
         */
        //challenge.setImage();
        challenge.setMemberId(1L); //임시아이디 변수로 만들기
        Challenge saveChallenge = challengeRepository.save(challenge);
        return saveChallenge;
    }

    public Challenge saveImage(Challenge challenge, MultipartFile file) throws IOException {
        if(Objects.isNull(file)) {
            return challenge;
        }
        String projectPath = System.getProperty("user.dir")+"\\src\\main\\resources\\static\\images";
        // 상수 값은 모두 변수로 만들기

        UUID uuid = UUID.randomUUID();
        String fileName = uuid + "_" + file.getOriginalFilename(); // 숨기기. 파일 객체가 이메서드를 갖고 있도록
        //_도 seperator로 변수 선언

        File saveFile = new File(projectPath, fileName);
        file.transferTo(saveFile);

        String image = "/images/" + fileName; // /user/images/
        //String image = "file:"+System.getProperty("user.dir")+"/images/" + fileName; // /user/images/

        challenge.setImage(image);
        return challengeRepository.save(challenge);
        //return challenge;
    }

    public List<ChallengeDto.PageResponse> getChallenges(Pageable pageable) {
        log.info("@@@@ getChallenges 호출됨");
        //int pageNumber = pageable.getPageNumber();
        //int pageSize = pageable.getPageSize();

        Page<Challenge> challengePage = challengeRepository.findAll(pageable);
        //challengeRepository.findAll(pageable);//pageable.getPageNumber(), pageable.getPageSize(), pageable.getSort());

        List<ChallengeDto.PageResponse> challenges = challengePage.stream()
                .map(challenge -> new ChallengeDto.PageResponse(
                        challenge.getChallengeId(),
                        challenge.getMemberId(),
                        challenge.getTitle(),
                        "name",10,
                        //findUsername(challenge.getMemberId()),
                        //findPoint(challenge.getMemberId()),
                        challenge.getCreatedAt(),
                        challenge.getUpdatedAt()
                )).collect(Collectors.toList());
        log.info("challenge List : {}", challenges);
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
    }

    public ChallengeDto.Response getChallenge(long challengeId) {
        log.info(String.valueOf("#### get challenge 시작 / challengeId :"+  String.valueOf(challengeId)));

        Challenge challenge = findVerifideChallenge(challengeId);
        log.info("### challenge content : {}", challenge.getContent());
        //ChallengeDto.Response response = challengeRepository.findByMemberId(challenge.getMemberId());
        ChallengeDto.Response response = new ChallengeDto.Response(
                challenge.getChallengeId(),
                challenge.getMemberId(),
                challenge.getTitle(),
                challenge.getContent(),
                challenge.getUpdatedAt(),
                challenge.getCreatedAt(),
                challenge.getImage(),
                "name",10
                //findUsername(challenge.getMemberId()),
                //findPoint(challenge.getMemberId())
        );
        log.info("response : {}", response.getName());

        //long memberId = challenge.getMemberId();
        //findWriterInfo(memberId, response);

        return response;
    }

    public ChallengeDto.Response updateChallenge(Challenge challenge, long challengeId, MultipartFile image) throws IOException {
        Challenge findChallenge = findVerifideChallenge(challengeId);

        File file = new File(System.getProperty("user.dir")+"/src/main/resources/static"+findChallenge.getImage());
        deleteImage(file);

        log.info("update image delete");

        Optional.ofNullable(challenge.getTitle())
                .ifPresent(title -> findChallenge.setTitle(title));
        Optional.ofNullable(challenge.getContent())
                .ifPresent(content -> findChallenge.setContent(content));
        Challenge imageSaveChallenge = saveImage(findChallenge, image);

        challengeRepository.save(imageSaveChallenge);
        //ChallengeDto.Response response = challengeRepository.findByMemberId(challenge.getMemberId());
        //ChallengeDto.Response challengeResponseDto = ChallengeDto.Response.from(imageSaveChallenge);
        ChallengeDto.Response response = new ChallengeDto.Response(
                imageSaveChallenge.getChallengeId(),
                imageSaveChallenge.getMemberId(),
                imageSaveChallenge.getTitle(),
                imageSaveChallenge.getContent(),
                imageSaveChallenge.getUpdatedAt(),
                imageSaveChallenge.getCreatedAt(),
                imageSaveChallenge.getImage(),
                "name", 10
                //findUsername(challenge.getMemberId()),
                //findPoint(challenge.getMemberId())
        );
        long memberId = imageSaveChallenge.getMemberId();
        //ChallengeDto.Response response = findWriterInfo(memberId, challengeResponseDto);

        return response;
    }

    public void deleteChallenge(long challengeId, String token){
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

    public ChallengeDto.Response findWriterInfo(long memberId, ChallengeDto.Response response) {
        Member member = memberService.findMemberById(memberId);
        response.setName(member.getName());
        response.setPoint(member.getPoint());
        return response;
    }
    public String findUsername(long memberId) {
        Member member = memberService.findMemberById(memberId);
        log.info(member.getName());
        return member.getName();
    }
    public int findPoint(long memberId) {
        Member member = memberService.findMemberById(memberId);
        log.info(String.valueOf(member.getPoint()));
        return member.getPoint();
    }
    public Challenge findVerifideChallenge(long challengeId) {
        log.info("findVerifiedChallenge challengeId : {}", challengeId);
        Optional<Challenge> optionalChallenge =
                challengeRepository.findById(challengeId);
        log.info("optionalChallenge : {}",optionalChallenge);
        Challenge findChallenge = optionalChallenge.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.CHALLENGE_NOT_FOUND));
        log.info("findChallenge : {}",findChallenge);
        log.info("성공");
        return findChallenge;
    }
    public void deleteImage(File file){
        if(file.exists()) file.delete();
    }
}
