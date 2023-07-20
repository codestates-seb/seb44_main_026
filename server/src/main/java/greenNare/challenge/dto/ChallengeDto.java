package greenNare.challenge.dto;

import greenNare.challenge.entity.Challenge;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

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
    @AllArgsConstructor
    @Getter
    @Builder
    public static class Response {
        private long challengeId;
        private long memberId;
        @NotBlank
        private String title;
        @NotBlank
        private String content;
        //private String createdAt;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;
        private String image;

        private String name;
        private int point;

        public void setName(String name) {
            this.name = name;
        }
        public void setPoint(int point) {
            this.point = point;
        }
        public static Response from(Challenge challenge) {
            return Response.builder()
                    .challengeId(challenge.getChallengeId())
                    .memberId(challenge.getMemberId())
                    .title(challenge.getTitle())
                    .content(challenge.getContent())
                    .image(challenge.getImage())
                    .createdAt(challenge.getCreatedAt())
                    .updatedAt(challenge.getUpdatedAt())
                    .build();
        }
    }

    @AllArgsConstructor
    @Getter
    @Builder
    public static class PageResponse {
        private int challengeId;
        private int memberId;
        private String title;
        private String name;
        private int point;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        public void setName(String name) {
            this.name = name;
        }
        public void setPoint(int point) {
            this.point = point;
        }

        public static PageResponse from(Challenge challenge) {
            return PageResponse.builder()
                    .challengeId(challenge.getChallengeId())
                    .memberId(challenge.getMemberId())
                    .title(challenge.getTitle())
                    .createdAt(challenge.getCreatedAt())
                    .updatedAt(challenge.getUpdatedAt())
                    .build();
        }

    }
}
