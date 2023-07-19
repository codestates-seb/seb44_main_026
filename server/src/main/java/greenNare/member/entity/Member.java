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
    @Column(name = "memberId", nullable = false)
    private long memberId;

    @Column(nullable = false, unique = true, updatable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(name = "username", nullable = false)
    private String name;

    @Column
    private int point;

}
