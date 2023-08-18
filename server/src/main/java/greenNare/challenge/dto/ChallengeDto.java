package greenNare.challenge.dto;

import greenNare.challenge.entity.Challenge;
import lombok.*;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class ChallengeDto {
    @NoArgsConstructor
    @AllArgsConstructor
    @Getter
    @Setter
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
    @Setter
    public static class Response {
        private int challengeId;
        private int memberId;
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
        private int countReply;

        public void setName(String name) {
            this.name = name;
        }
        public void setPoint(int point) {
            this.point = point;
        }
        public void setCountReply(int countReply) {this.countReply = countReply;}

        public static Response from(Challenge challenge) {
            return Response.builder()
                    .challengeId(challenge.getChallengeId())
                    .memberId(challenge.getMember().getMemberId())
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
        private int countReply;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        public void setName(String name) {
            this.name = name;
        }
        public void setPoint(int point) {
            this.point = point;
        }
        public void setCountReply(int countReply) {this.countReply = countReply;}

        public static PageResponse from(Challenge challenge) {
            return PageResponse.builder()
                    .challengeId(challenge.getChallengeId())
                    .memberId(challenge.getMember().getMemberId())
                    .title(challenge.getTitle())
                    .createdAt(challenge.getCreatedAt())
                    .updatedAt(challenge.getUpdatedAt())
                    .build();
        }

    }
}
