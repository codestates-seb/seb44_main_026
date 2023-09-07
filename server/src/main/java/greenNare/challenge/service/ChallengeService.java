package greenNare.challenge.service;

import com.google.cloud.storage.Blob;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import greenNare.challenge.dto.ChallengeDto;
import greenNare.challenge.entity.Challenge;
import greenNare.challenge.repository.ChallengeRepository;
import greenNare.config.SecurityConfiguration;
import greenNare.exception.BusinessLogicException;
import greenNare.exception.ExceptionCode;
import greenNare.member.entity.Member;
import greenNare.member.service.MemberService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

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
    @Value("${spring.cloud.gcp.storage.bucket}")
    private String bucketName;
    @Value("${spring.cloud.gcp.storage.url}")
    private String storageUrl;
    private final Storage storage;


    public static final String IMAGE_SAVE_URL = "/home/ssm-user/seb44_main_026/images/";
    public static final String IMAGE_DELETE_URL = "/home/ssm-user/seb44_main_026";
    public static final String SEPERATOR  = "_";

    public ChallengeService(ChallengeRepository challengeRepository, MemberService memberService, SecurityConfiguration securityConfiguration,  Storage storage) {
        this.challengeRepository = challengeRepository;
        this.memberService = memberService;
        this.securityConfiguration = securityConfiguration;
        this.storage = storage;
    }

    public ChallengeDto.Response createChallenge(Challenge challenge, int memberId, MultipartFile file) throws NullPointerException, IOException {
        Member member = memberService.findMemberById(memberId);

        challenge.setMember(member); // 멤버 넣어야함

        Challenge imageSaveChallenge = saveFile(challenge, file);

        memberService.deletePoint(member.getMemberId(), 500);

        Challenge saveChallenge = challengeRepository.save(imageSaveChallenge);

        ChallengeDto.Response response = ChallengeDto.Response.from(saveChallenge);
        response.setName(member.getName());
        response.setPoint(member.getPoint());
        return response;
    }
    public Challenge saveFile(Challenge challenge, MultipartFile file) throws IOException{
        log.info("## save File start");
        if (file == null || file.isEmpty()) {
            log.info("patch 요청에 image 없음");
            return challenge;
        }
        UUID uuid = UUID.randomUUID();
        String fileName = uuid.toString();
        System.out.println("bucket name: "+ bucketName);
        BlobInfo blobInfo = storage.create(
                BlobInfo.newBuilder(bucketName, fileName)
                        .setContentType("image/jpeg")
                        .build(),
                file.getInputStream()
        );
        String name = storageUrl+fileName;
        challenge.setImage(name);
        log.info(name);
        log.info(challenge.getImage());
        return challenge;//challengeRepository.save(challenge);
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
    public Page<Challenge> getMyChallengePage(Pageable pageable, int memberId){
        Page<Challenge> challengePage = challengeRepository.findByMemberMemberId(memberId, pageable);

        List<Challenge> list = challengeRepository.findByMemberMemberId(memberId);
        log.info("findByMemberId List로 추출했을 때 : {}", list.size());
        return challengePage;
    }

    public List<Challenge> getMyChallenges (Page<Challenge> challengePage){
        List<Challenge>  challengeList = challengePage.stream().collect(Collectors.toList());
        return challengeList;
    }

    public ChallengeDto.Response updateChallenge(ChallengeDto.Patch patchChallenge, int challengeId, MultipartFile image, int memberId) throws IOException {
        Challenge findChallenge = findVerifideChallenge(challengeId);

        validateWriter(findChallenge.getMember(), memberId);
        Challenge imageSaveChallenge = changeFile(findChallenge, image, patchChallenge.getDelImage());

        Optional.ofNullable(patchChallenge.getTitle())
                .ifPresent(title -> imageSaveChallenge.setTitle(title));
        Optional.ofNullable(patchChallenge.getContent())
                .ifPresent(content -> imageSaveChallenge.setContent(content));

        challengeRepository.save(imageSaveChallenge);
        ChallengeDto.Response response = ChallengeDto.Response.from(imageSaveChallenge);
        return addWriterInfo(imageSaveChallenge.getMember(), response);
    }

    public void deleteChallenge(int challengeId, int memberId){
        log.info("delete challenge start");
        Challenge findChallenge = findVerifideChallenge(challengeId);
        validateWriter(findChallenge.getMember(), memberId);

        deleteFile(findChallenge.getImage());
        challengeRepository.delete(findChallenge);
        log.info("delete challenge end");
    }

    public ChallengeDto.Response addWriterInfo(Member member, ChallengeDto.Response response) {
        response.setName(member.getName());
        response.setPoint(member.getPoint());
        return response;
    }

    public Challenge findVerifideChallenge(int challengeId) {
        Optional<Challenge> optionalChallenge =
                challengeRepository.findById(challengeId);
        Challenge findChallenge = optionalChallenge.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.CHALLENGE_NOT_FOUND));
        log.info("findVerifideChallenge complete");
        return findChallenge;
    }
    public Challenge changeFile(Challenge challenge, MultipartFile newImg, String delImage) throws IOException {
        /*
        Challenge imageSaveChallenge= new Challenge();
        if(challenge.getImage() != postImage){
            if(challenge.getImage() != null) {
                deleteFile(challenge.getImage());
                challenge.setImage(null);
            }
            return saveFile(challenge, newImg);
        }
        return challenge;*/

        if(delImage == null && newImg == null) {
            return challenge;
        }
        if(challenge.getImage() == null && delImage!=null){
            throw new BusinessLogicException(ExceptionCode.FILE_NOT_FOUND);
        } else if(challenge.getImage() != null && delImage == null){
            throw new BusinessLogicException(ExceptionCode.FILE_EXIST);
        }
        /*
        if(newImg == null) {
            if(delImage == null){
                return challenge;
            } else if(challenge.getImage() != delImage){
                throw new BusinessLogicException(ExceptionCode.FILE_NOT_FOUND);
            }
        }*/
        deleteFile(challenge.getImage());
        challenge.setImage(null);
        return saveFile(challenge, newImg);
    }
    public void deleteFile(String image){
        if(image == null) {
            log.info("image = null, 지울 이미지 없음");
            return;
        }
        image = image.replace(storageUrl, "");
        Storage storage = StorageOptions.newBuilder().setProjectId("greennare").build().getService();
        Blob blob = storage.get(bucketName, image);
        if (blob == null) {
            System.out.println("The object " + image + " wasn't found in " + bucketName);
            return;
        }
        Storage.BlobSourceOption precondition =
                Storage.BlobSourceOption.generationMatch(blob.getGeneration());
        storage.delete(bucketName, image, precondition);
        System.out.println("Object " + image + " was deleted from " + bucketName);
    }

    public void validateWriter(Member member, int memberId) {
        if (memberId != member.getMemberId()) {
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
