package greenNare.product.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import java.util.List;

@Getter
@Setter
public class ReviewDto {

    @Getter
    @Setter
    public static class Post {
        @NotBlank
        private String context;

    }
    @Getter
    @Setter
    public static class Patch {

        private String context;

    }

    @Getter
    @Setter
    public static class deleteImagesDto {

        private List<String> deleteImageLinks;

    }

}
