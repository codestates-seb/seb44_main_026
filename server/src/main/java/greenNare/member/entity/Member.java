package greenNare.member.entity;

import lombok.*;

import javax.persistence.*;

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

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(nullable = false)
    private String password;

    @Column(unique = true)
    private String image;
    private int point;

    public Member(String email, String name, String password, String image, int point){
        this.email = email;
        this.name = name;
        this.password = password;
        this.image = image;
        this.point = point;
    }
}
