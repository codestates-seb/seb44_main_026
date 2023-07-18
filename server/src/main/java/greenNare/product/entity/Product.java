package greenNare.product.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@NoArgsConstructor
@Getter
@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int productId;

    @Column(nullable = false, unique = true, name = "PRODUCT_NAME")
    private String productName;
    @Column(nullable = false)
    private String detail;
    @Column(nullable = false)
    private int price;
    @Column(nullable = false)
    private int point;
    @Column(nullable = false)
    private String storeLink;

    @Column(nullable = false)
    private String category;

    public Product(String productName, String detail, int price, int point, String storeLink, String category){
        this.productName = Objects.requireNonNull(productName);
        this.detail = Objects.requireNonNull(detail);
        this.price = price;
        this.point = point;
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

    public List<Product> makeTestProduct() {
        List<Product> products = new ArrayList<>();

        for (int i=0; i<50; i++) {
            products.add(new Product("칫솔"+i, "칫솔입니다", i*100, i, "link", "욕실"));
        }

        return products;
    }

}
