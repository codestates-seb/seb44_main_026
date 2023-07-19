package greenNare.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_EXIST(409, "이미 등록된 회원입니다. 메롱"),
    MEMBER_NOT_FOUND(404, "회원을 찾을수 없습니다. 메롱");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
