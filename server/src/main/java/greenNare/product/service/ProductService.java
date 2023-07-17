package greenNare.product.service;


import greenNare.product.entity.Product;
import greenNare.product.repository.ProductRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
public class ProductService {
    private ProductRepository productRepository;

    public ProductService (ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public Page<Product> getProducts(int page, int size, String category) {
        //PageRequest pageRequest = PageRequest.of(1, 2);
        PageRequest pageRequest = PageRequest.of(page, size);
        if(category.isEmpty()) {
            Page<Product> products = productRepository.findAll(pageRequest);
            return products;
        }
        else {
            Page<Product> products = productRepository.findByCategory(pageRequest, category);
            return products;
        }

    }
}
