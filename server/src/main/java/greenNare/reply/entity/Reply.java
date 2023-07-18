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
    private long replyId;

    //@ManyToOne
    @Column
    private long memberId;
    //@ManyToOne
    @Column
    private long challengeId;
    @Column(nullable = false)
    private String content;
}
