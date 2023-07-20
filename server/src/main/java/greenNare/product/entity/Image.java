package greenNare.product.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int imageId;

    @Column(nullable = false/*, unique = true*/)
    String imageUri;

    @ManyToOne
    @JoinColumn(name = "reviewId")
    Review review;

    @ManyToOne
    @JoinColumn(name = "productId")
    Product product;

    public Image(String imageUri, Review review) {
        this.imageUri = imageUri;
        this.review = review;
    }
    public Image(String imageUri, Product product) {
        this.imageUri = imageUri;
        this.product = product;
    }

}
