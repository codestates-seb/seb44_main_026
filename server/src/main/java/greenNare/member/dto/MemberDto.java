package greenNare.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

public class MemberDto {
@Getter
@AllArgsConstructor

public static class Post {
    @NotBlank
    @Email
    private String email;

    @NotBlank
    private String password;

    @NotBlank(message = "빈칸을 채워주세요.")
    private String name;
}
    @Getter
    @AllArgsConstructor
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

        private int pont;
    }





}
