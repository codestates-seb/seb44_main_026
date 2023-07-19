package greenNare.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_EXIST(409, "이미 등록된 회원입니다. 메롱"),
    REVIEW_EXIST(409, "이미 등록된 리뷰가 존재합니다."),

    REVIEW_NOT_FOUND(404, "존재하지 않는 리뷰입니다"),

    PLACE_EXIST(409, "이미 등록된 장소입니다."),
    WRITER_NOT_MATCHED(403, "접근 권한이 없습니다."),
    CHALLENGE_NOT_FOUND(404,"존재하지 않는 챌린지 입니다."),
    INVALID_TOKEN(404, "유효하지 않은 토큰입니다."),
    PLACE_NOT_FOUND(404, "존재하지 않는 장소 입니다"),
    REPLY_NOT_FOUND(404, "존재하지 않는 댓글입니다"),
    REPLY_WRITER_NOT_MATCHED(403, "댓글 접근 권한이 없습니다."),;

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
