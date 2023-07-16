package greenNare.challenge.service;

import greenNare.challenge.entity.Challenge;
import greenNare.challenge.repository.ChallengeRepository;
import greenNare.config.SecurityConfiguration;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Objects;
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


}
