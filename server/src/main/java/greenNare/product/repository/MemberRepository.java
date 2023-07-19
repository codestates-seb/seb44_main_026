package greenNare.product.repository;

import greenNare.product.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Integer> {
    Member findBymemberId(int memberId);
}
