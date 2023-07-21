package greenNare.cart.repository;

import greenNare.cart.entity.Cart;
import greenNare.member.entity.Member;
import greenNare.product.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Integer> {
    Optional<Cart> findByMemberMemberIdAndProductProductId(int memberId, int productId);

    Page<Product> findProductByMemberMemberId(int memberId, PageRequest pageable);

    Member findMemberByMemberMemberId(int memberId);

}
