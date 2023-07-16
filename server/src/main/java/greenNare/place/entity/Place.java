package greenNare.place.entity;

import greenNare.audit.Auditable;
import lombok.*;

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
    private long placeId;

    @Column(nullable = false)
    private long memberId;

    @Column//(nullable = false)
    private String placeName;

    @Column(nullable = false)
    private double lat;

    @Column(nullable = false)
    private double longi;
}
