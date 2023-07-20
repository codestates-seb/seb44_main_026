package greenNare.member.entity;

import greenNare.cart.entity.Cart;
import lombok.*;
import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int memberId;

    @Column(nullable = false, updatable = false, unique = true)
    private String email;

    @Column(length = 100, nullable = false)
    private String name;

    @Column(length = 100, nullable = false)
    private String password;
    @Column(nullable = false)
    private int point;

    @OneToMany(mappedBy = "member")
    private List<Cart> carts;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    public Member(String email, String name, String password, String image, int point){
        this.email = email;
        this.name = name;
        this.password = password;
        this.point = point;
    }
}
