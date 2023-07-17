package greenNare.challenge.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Getter
@NoArgsConstructor
public class ChallengeDto {
    @NoArgsConstructor
    @AllArgsConstructor
    @Getter
    public static class Post {
        @NotBlank
        private String title;
        @NotBlank
        private String content;
    }

    @NoArgsConstructor
    @AllArgsConstructor
    @Getter
    public static class Patch {
        @NotBlank
        private String title;
        @NotBlank
        private String content;
    }

    //@NoArgsConstructor
    //@AllArgsConstructor
    @Getter
    @Builder
    public static class Response {
        private long challengeId;
        private long memberId;
        @NotBlank
        private String title;
        @NotBlank
        private String content;
        private String createdAt;
        private String image;
        private String name;

        public void setName(String name) {
            this.name = name;
        }
    }
}
