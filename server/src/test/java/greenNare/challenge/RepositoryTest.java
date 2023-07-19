package greenNare.challenge;

import greenNare.challenge.repository.ChallengeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

@DataJpaTest
public class RepositoryTest {
    @Autowired
    private ChallengeRepository challengeRepository;
}
