package greenNare.product.service;


import greenNare.product.entity.Product;
import greenNare.product.repository.ProductRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    private ProductRepository productRepository;

    public ProductService (ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public Page<Product> getProducts(int page, int size, String category) {
        //PageRequest pageRequest = PageRequest.of(1, 2);
        PageRequest pageRequest = PageRequest.of(page, size);
        if(category.equals("all")) {
            Page<Product> products = productRepository.findAll(pageRequest);
            return products;
        }
        else {
            Page<Product> products = productRepository.findByCategory(pageRequest, category);
            return products;
        }

    }

    public Product getProduct(int productId) {
        Product productDetails = productRepository.findByProductId(productId);
        return productDetails;
    }

    public List<Product> findProducts(String productName) {

        List<Product> findProducts = productRepository.findByProductName(productName);
        System.out.println(productName + findProducts);

        //String일 경우 조회결과없음 -> int타입으로 price와비교해서 조회확인(ok)
        //List<Product> findProducts = productRepository.findByPrice(productName);

        return findProducts;
    }
}
