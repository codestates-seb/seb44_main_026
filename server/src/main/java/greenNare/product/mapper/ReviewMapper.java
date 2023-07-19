package greenNare.product.mapper;

import greenNare.product.dto.ReviewDto;
import greenNare.product.entity.Review;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ReviewMapper {
    Review ReviewPostDtoToReview(ReviewDto.Post reviewPostDto);

    Review ReviewPatchDtoToReview(ReviewDto.Patch reviewPatchDto);
}
