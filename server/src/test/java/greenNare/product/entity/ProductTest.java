package greenNare.product.entity;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertThrows;

public class ProductTest {
    @DisplayName("상품정보 유효성 검증 : 필수정보 포함여부")
    @Test
    public void validateProductTest() {
        //given
        String productName = null;
        String detail = null;
        int price = 0;
        int point = 0;
        String storeLink = null;
        String category = null;

        //when, then
        assertThrows(NullPointerException.class,
                () -> new Product(productName, detail, price, point, storeLink, category));


    }
}
