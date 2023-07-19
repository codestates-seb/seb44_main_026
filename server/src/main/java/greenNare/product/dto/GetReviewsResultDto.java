package greenNare.product.dto;

import greenNare.product.entity.Review;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.mapstruct.Mapper;

import javax.persistence.Column;
import java.time.LocalDateTime;
import java.util.List;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GetReviewsResultDto {
    @Column(name = "REVIEW_ID")
    private int reviewId;
    @Column(name = "CONTEXT")
    private String context;

    @Column(name = "CREATED_AT")
    private LocalDateTime createdAt;

    @Column(name = "MEMBER_ID")
    private int memberId;
    @Column(name = "PRODUCT_ID")
    private int productId;

    //private List<String> image; //imageLinks

    @Column(name = "NAME")
    private String name;

    @Column(name = "POINT")
    private int point;

}
