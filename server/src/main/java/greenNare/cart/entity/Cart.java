package greenNare.cart.entity;

import greenNare.audit.Auditable;
import greenNare.member.entity.Member;
import greenNare.product.entity.Product;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Cart extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int likeId;

    @ManyToOne
    @JoinColumn(name = "memberId")
    private Member member;
    @ManyToOne
    @JoinColumn(name = "productId")
    private Product product;

    private LocalDateTime createdAt;



    public Cart(Member member, Product product) {
        this.member = member;
        this.product = product;

    }

}
