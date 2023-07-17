package greenNare.challenge.entity;

import greenNare.audit.Auditable;
import lombok.*;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class Challenge extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private long ChallengeId;

    //@ManyToOne
    //@joinColumn
    @Column(nullable = false)
    private long memberId;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String content;

    @Column
    private String image;

    public Challenge(String title, String content) {
        this.title = title;
        this.content = content;
    }
}
