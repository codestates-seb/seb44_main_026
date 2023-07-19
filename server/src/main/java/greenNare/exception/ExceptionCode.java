package greenNare.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_EXIST(409, "이미 등록된 회원입니다. 메롱"),
    REVIEW_EXIST(409, "이미 등록된 리뷰가 존재합니다."),

    REVIEW_NOT_FOUND(404, "존재하지 않는 리뷰입니다"),

    PLACE_EXIST(409, "이미 등록된 장소입니다."),
    WRITER_NOT_MATCHED(403, "접근 권한이 없습니다.");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
