package greenNare.product.repository;

import greenNare.product.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {

    Page<Product> findAll(Pageable pageable);

    //@Query(value = "SELECT * FROM PRODUCT WHERE CATEGORY = category", nativeQuery = true)
    Page<Product> findByCategory(Pageable pageable, String category);

    Optional<Product> findById(int productId);

    @Query(value = "SELECT * FROM PRODUCT WHERE PRODUCT_NAME LIKE %:productName%", nativeQuery = true)
    List<Product> findByProductName(String productName);
//    @Query(value = "SELECT * FROM PRODUCT WHERE PRICE = :productName", nativeQuery = true)
//    List<Product> findByPrice(int productName);


    //(내부쿼리확인필요)
    List<Product> findByProductNameContaining(String productName);



}
