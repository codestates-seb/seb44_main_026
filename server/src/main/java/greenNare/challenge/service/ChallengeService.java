package greenNare.challenge.service;

import greenNare.challenge.dto.ChallengeDto;
import greenNare.challenge.entity.Challenge;
import greenNare.challenge.repository.ChallengeRepository;
import greenNare.config.SecurityConfiguration;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.lang.reflect.Member;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

@Service
public class ChallengeService {
    private final ChallengeRepository challengeRepository;
    private final SecurityConfiguration securityConfiguration;

    public ChallengeService(ChallengeRepository challengeRepository, SecurityConfiguration securityConfiguration) {
        this.challengeRepository = challengeRepository;
        this.securityConfiguration = securityConfiguration;
    }

    public Challenge createChallenge(Challenge challenge) throws NullPointerException {//, String token) {
        /*
        String memberEmail = jwtTokenizer.getUsername(token)
        Member member = findByEmail(memberEmail)
        Long id = member.getId()
        Long point = member.getPoint()
        challenge.setMemberId(id);
         */
        //challenge.setImage();
        challenge.setMemberId(1L); //
        Challenge saveChallenge = challengeRepository.save(challenge);
        return saveChallenge;
    }

    public Challenge saveImage(Challenge challenge, MultipartFile file) throws IOException {
        if(Objects.isNull(file)) {
            return challenge;
        }
        String projectPath = System.getProperty("user.dir")+"\\src\\main\\resources\\static\\images";

        UUID uuid = UUID.randomUUID();
        String fileName = uuid + "_" + file.getOriginalFilename();

        File saveFile = new File(projectPath, fileName);
        file.transferTo(saveFile);

        String image = "/images/" + fileName;

        challenge.setImage(image);
        return challengeRepository.save(challenge);
        //return challenge;
    }

    public Page<ChallengeDto.Response> getAllChallengeWithUsername(Pageable pageable) {
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
                ))

         */
    }
    /*
    public String findWriter(long challengeId) {
        //Optional<Challenge> challenge = challengeRepository.findById(challengeId);
        Challenge challenge = challengeRepository.findById(challengeId).orElse(null);
        if (challenge != null) {
            Member member = challenge.getMember();
            if (member != null) {
                return member.getUsername();
            }
        }
        return null;
    }

     */
}
