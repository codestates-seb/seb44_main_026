package greenNare.product.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int imageId;

    @Column(nullable = false, unique = true)
    String imageUri;

//    @ManyToOne
//    @JoinColumn(name = "reviewId")
//    Review review;
//
//    @ManyToOne
//    @JoinColumn(name = "productId")
//    Product product;

}
