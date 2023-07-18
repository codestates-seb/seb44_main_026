package greenNare.product;

import greenNare.product.entity.Product;
import greenNare.product.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class DataLoder implements CommandLineRunner {
    private final ProductRepository productRepository;

    public DataLoder(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }


    @Override
    public void run(String... args) {
//        Product product1 = new Product("칫솔1", "칫솔입니다", 100,10, "a.com", "bathroom1");
//        Product product2 = new Product("칫솔2", "칫솔입니다", 200,20, "b.com", "kitchen");
//        Product product3 = new Product("칫솔3", "칫솔입니다", 300,30, "c.com", "bathroom2");
//
//        productRepository.save(product1);
//        productRepository.save(product2);
//        productRepository.save(product3);
//
        makeTestProduct();
    }

    public void makeTestProduct() {

        for (int i=0; i<30; i++) {
            productRepository.save(new Product("칫솔"+i, "칫솔입니다", i*100, i, "link", "bathroom"));
            productRepository.save(new Product("오이"+i, "오이입니다", i*100, i, "link", "kitchen"));
            productRepository.save(new Product("집"+i, "집입니다", i*100, i, "link", "living"));
            productRepository.save(new Product("연필"+i, "연필입니다", i*100, i, "link", "stationery"));
            productRepository.save(new Product("손수건"+i, "손수건입니다", i*100, i, "link", "hygiene"));
        }
        for (int i=0; i<30; i++) {

        }

    }

}
