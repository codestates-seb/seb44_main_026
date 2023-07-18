package greenNare.product.repository;

import greenNare.product.entity.Product;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

import javax.persistence.EntityManager;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest    //@Transactional 포함
public class ProductRepoTest {
    @Autowired
    private EntityManager entityManager;

    @Autowired
    private ProductRepository productRepository;

    @DisplayName("모든 상품정보 조회(페이지네이션 적용) 확인(데이터베이스조회)")        //??
    @Test
    public void getProductsTest() {
        //given
        Product product1 = new Product("칫솔1", "칫솔입니다", 100, 10, "a.com", "욕실");
        Product product2 = new Product("칫솔2", "칫솔입니다", 200, 20, "b.com", "주방");
        Product product3 = new Product("칫솔3", "칫솔입니다", 300, 30, "c.com", "욕실");

        entityManager.persist(product1);
        entityManager.persist(product2);
        entityManager.persist(product3);

        entityManager.flush();

        PageRequest pageable = PageRequest.of(1, 2, Sort.Direction.DESC, "productId");

        //when
        Page<Product> products = productRepository.findAll(pageable);

        //then
        assertEquals(3, products.getTotalElements());
        assertEquals(2, products.getTotalPages());



    }
}
