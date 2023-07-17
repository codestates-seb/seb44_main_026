package greenNare.challenge.repository;

import greenNare.challenge.dto.ChallengeDto;
import greenNare.challenge.entity.Challenge;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ChallengeRepository extends JpaRepository<Challenge, Long> {
    // inner join
    /*@Query("SELECT c.boardId, c.title, c.content, m.name "+
            "FROM Challenge c "+
            "JOIN c.member m")

     */
    //Page<Object[]> getAllChallengeWithUsername(Pageable pageable);

    Challenge findByMemberId(Long memberId);

}
