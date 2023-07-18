package greenNare.product.service;

import greenNare.product.entity.Product;
import greenNare.product.repository.ProductRepository;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

import javax.persistence.EntityManager;
import java.util.Arrays;
import java.util.List;

import static org.mockito.BDDMockito.given;

@SpringBootTest
@AutoConfigureMockMvc
@ExtendWith(SpringExtension.class)
@Transactional

public class ProductServiceTest {
    @Autowired
    MockMvc mockMvc;
    @Autowired
    ProductRepository productRepository;

    @Autowired
    private EntityManager entityManager;

    @BeforeEach //@BeforeAll 사용, static고려
    public void initAll() {

        Product product1 = new Product("칫솔1", "칫솔입니다", 100, 10, "a.com", "욕실");
        Product product2 = new Product("칫솔2", "칫솔입니다", 200, 20, "b.com", "주방");
        Product product3 = new Product("칫솔3", "칫솔입니다", 300, 30, "c.com", "욕실");

        entityManager.persist(product1);
        entityManager.persist(product2);
        entityManager.persist(product3);

        entityManager.flush();
    }

    @DisplayName("상품정보 리스트 확인(DI)")
    @Test
    public void getProductsTest() {
        //given
        List<Product> products = Arrays.asList(
                new Product("칫솔1", "칫솔입니다", 100, 10, "a.com", "욕실"),
                new Product("칫솔2", "칫솔입니다", 200, 20, "b.com", "주방"),
                new Product("칫솔3", "칫솔입니다", 300, 30, "c.com", "욕실"));

        PageRequest pageable = PageRequest.of(1,2, Sort.Direction.DESC,"productId");
        Page<Product> pagenated = new PageImpl<>(products, pageable, products.size());

        //when
        Page<Product> findProducts = productRepository.findAll(pageable);

        //Then
        assertEquals(pagenated.getTotalElements(), findProducts.getTotalElements());

    }
}
