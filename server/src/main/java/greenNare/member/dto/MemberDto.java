package greenNare.member.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

public class MemberDto {
    @Getter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Post {
        @NotBlank
        @Email
        @Pattern(regexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$", message = "올바른 이메일 형식이 아닙니다.")
        private String email;

        @NotBlank
        private String password;

        @NotBlank(message = "빈칸을 채워주세요.")
        private String name;
    }
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Patch {
        private int memberId;

        @NotBlank(message = "이름을 넣으세요")
        private String name;

        @NotBlank(message = "비밀번호를 넣으세요")
        private String password;

    }

    @AllArgsConstructor
    @Getter
    public static class Response {
        private int memberId;
        private String email;
        private String name;

        private int point;
    }
}
