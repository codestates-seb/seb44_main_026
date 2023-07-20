package greenNare.cart.repository;

import greenNare.cart.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Integer> {
    Optional<Cart> findByMemberMemberIdAndProductProductId(int memberId, int productId);

}
