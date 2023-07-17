package greenNare.product.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Objects;

@NoArgsConstructor
@Getter
@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int productId;

    @Column(nullable = false, unique = true)
    private String productName;
    @Column(nullable = false)
    private String detail;
    @Column(nullable = false)
    private int price;
    @Column(nullable = false)
    private String storeLink;
    private String category;

    public Product(String productName, String detail, int price, String storeLink, String category){
        this.productName = Objects.requireNonNull(productName);
        this.detail = Objects.requireNonNull(detail);
        this.price = price;
        this.storeLink = Objects.requireNonNull(storeLink);
        this.category = category;
    }
//    public Product(String productName, String detail, int price, String storeLink, String category){
//        this.productName = productName;
//        this.detail = detail;
//        this.price = price;
//        this.storeLink = storeLink;
//        this.category = category;
//    }

}
