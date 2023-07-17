package greenNare.challenge.repository;

import greenNare.challenge.dto.ChallengeDto;
import greenNare.challenge.entity.Challenge;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ChallengeRepository extends JpaRepository<Challenge, Long> {
    // inner join
    @Query("SELECT Challenge.*, Member.name "+
            "FROM Challenge c "+
            "JOIN Member m" +
            "ON c.memberId = m.memberId")
    Page<ChallengeDto.Response> getAllChallengeWithUsername(Pageable pageable);

    Challenge findByMemberId(Long memberId);

}
