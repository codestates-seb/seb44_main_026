package greenNare.product.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GetProductWithImageDto {
    private int productId;
    private String productName;
    private int price;
    private int point;
    List<String> imageLinks;
    //String imageLink;




}
