package greenNare.place.entity;

import greenNare.audit.Auditable;
import lombok.*;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
public class Place extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private int placeId;

    @Column(nullable = false)
    private int memberId;

    @Column//(nullable = false)
    private String placeName;

    @Column(nullable = false)
    private double lat;

    @Column(nullable = false)
    private double longi;
}
