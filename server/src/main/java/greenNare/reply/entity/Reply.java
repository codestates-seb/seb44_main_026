package greenNare.reply.entity;

import greenNare.audit.Auditable;
import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Reply extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private int replyId;

    //@ManyToOne
    @Column
    private int memberId;
    //@ManyToOne
    @Column
    private int challengeId;
    @Column(nullable = false)
    private String content;
}
