package greenNare.reply.repository;

import greenNare.reply.entity.Reply;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReplyRepository extends JpaRepository<Reply, Integer> {
    Page<Reply> findByChallengeChallengeId(int challengeId, Pageable pageable);
    List<Reply> findByChallengeChallengeId(int challengeId);
}
