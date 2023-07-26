package greenNare.challenge;

import greenNare.challenge.entity.Challenge;
import greenNare.challenge.repository.ChallengeRepository;
import greenNare.challenge.service.ChallengeService;
import greenNare.exception.BusinessLogicException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.BDDMockito.given;

public class ServiceTest {
    @Mock
    private ChallengeRepository challengeRepository;

    @InjectMocks
    private ChallengeService challengeService;

    @DisplayName("create challenge test")
    @Test
    public void createChallengeTest() {
        /*
        // given
        Challenge challenge = new Challenge("title", "content");
        challenge.setMemberId(1);
        given(challengeRepository.findById(Mockito.any())).willReturn(Optional.of(challenge));

        // when/then
        assertThrows(BusinessLogicException.class, () -> challengeService.createChallenge(challenge));

         */
    }
}
