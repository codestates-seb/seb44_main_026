package greenNare.product.repository;

import greenNare.product.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {

    Page<Product> findAll(Pageable pageable);

    @Query(value = "SELECT * FROM PRODUCT WHERE CATEGORY = category", nativeQuery = true)
    Page<Product> findByCategory(Pageable pageable, String category);
}
