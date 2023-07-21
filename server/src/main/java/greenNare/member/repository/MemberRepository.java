package greenNare.member.repository;

import greenNare.cart.entity.Cart;
import greenNare.member.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Integer> {
    Member findBymemberId(int memberId);
    Optional<Member> findByEmail(String email);

    Page<Cart> findCartByMemberId(int memberId, PageRequest pageable);
}

