package greenNare.product;

import greenNare.product.entity.Product;
import greenNare.product.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoder implements CommandLineRunner {
    private final ProductRepository productRepository;

    public DataLoder(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }


    @Override
    public void run(String... args) {
        Product product1 = new Product("칫솔1", "칫솔입니다", 100, "a.com", "bathroom1");
        Product product2 = new Product("칫솔2", "칫솔입니다", 200, "b.com", "kitchen");
        Product product3 = new Product("칫솔3", "칫솔입니다", 300, "c.com", "bathroom2");

        productRepository.save(product1);
        productRepository.save(product2);
        productRepository.save(product3);
    }
}
