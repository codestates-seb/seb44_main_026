package greenNare.reply.controller;

import greenNare.Response.MultiResponseDto;
import greenNare.Response.SingleResponseDto;
import greenNare.challenge.mapper.ChallengeMapper;
import greenNare.member.entity.Member;
import greenNare.reply.dto.ReplyDto;
import greenNare.reply.entity.Reply;
import greenNare.reply.mapper.ReplyMapper;
import greenNare.reply.service.ReplyService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/nare")
@Validated
@Slf4j
//@CrossOrigin(origins = "*")
public class ReplyController {
    private final ReplyService replyService;
    private final ReplyMapper mapper;

    public ReplyController(ReplyService replyService, ReplyMapper mapper) {
        this.replyService = replyService;
        this.mapper = mapper;
    }

    // 댓글 조회
    @GetMapping("/reply/{challengeId}")
    public ResponseEntity getReply(@PathVariable long challengeId,
                                   @RequestHeader(value = "Authorization", required = false) String token,
                                   Pageable pageable) {
        //Sort sort = Sort.by(Sort.Direction.DESC, "memberId");
        //Pageable pageable = PageRequest.of(page, size, sort);

        List<ReplyDto.Response> replyList = replyService.getReplys(challengeId, token, pageable );
        Page<Reply> replyPage = replyService.getReplyPage(challengeId, token, pageable);

        return new ResponseEntity<>(new MultiResponseDto<>(replyList, replyPage), HttpStatus.OK);
    }

    // 댓글 생성
    @PostMapping("/reply/{challengeId}")
    public ResponseEntity createReply(@PathVariable long challengeId,
                                      @RequestHeader(value = "Authorization", required = false) String token,
                                      @RequestBody ReplyDto.Post replyPostDto) {
        log.info("#####  createReply controller 도착");
        log.info("content = {}", replyPostDto.getContent());
        Reply reply = mapper.replyPostDtoToReply(replyPostDto);
        log.info("#####  createReply mapper");
        long memberId = 1;
        ReplyDto.Response response = replyService.createReply(reply, challengeId, memberId);
        return new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.OK);
    }

    // 댓글 수정
    @PatchMapping("/reply/{replyId}")
    public ResponseEntity updateReply(@PathVariable long replyId,
                                      @RequestHeader(value = "Authorization", required = false) String token,
                                      @RequestBody ReplyDto.Post replyPatchDto) {
        Reply reply =  mapper.replyPostDtoToReply(replyPatchDto);
        long memberId = 1;
        ReplyDto.Response response = replyService.updateReply(reply, replyId, memberId);
        return ResponseEntity.ok(new SingleResponseDto<>(response));
    }

    // 댓글 삭제
    @DeleteMapping("/reply/{replyId}")
    public ResponseEntity deleteReply(@PathVariable long replyId,
                                      @RequestHeader(value = "Authorization", required = false) String token){
        long memberId  = 1;
        replyService.deleteReply(replyId, memberId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
