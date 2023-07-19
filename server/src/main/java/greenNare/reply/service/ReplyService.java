package greenNare.reply.service;

import greenNare.challenge.entity.Challenge;
import greenNare.challenge.service.ChallengeService;
import greenNare.exception.BusinessLogicException;
import greenNare.exception.ExceptionCode;
import greenNare.member.entity.Member;
import greenNare.member.service.MemberService;
import greenNare.reply.dto.ReplyDto;
import greenNare.reply.entity.Reply;
import greenNare.reply.repository.ReplyRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Transactional
@Service
public class ReplyService {
    private final ReplyRepository replyRepository;
    private final MemberService memberService;
    private final ChallengeService challengeService;

    public ReplyService(ReplyRepository replyRepository, MemberService memberService, ChallengeService challengeService) {
        this.replyRepository = replyRepository;
        this.memberService = memberService;
        this.challengeService = challengeService;
    }

    public List<ReplyDto.Response> getReplys(int challengeId, String token, Pageable pageable) {
        Page<Reply> replyList = replyRepository.findByChallengeId(challengeId, pageable);
        List<ReplyDto.Response> replyResponseList = replyList.stream()
                .map((reply)-> new ReplyDto.Response(
                        reply.getReplyId(),
                        reply.getMemberId(),
                        reply.getChallengeId(),
                        reply.getContent(),
                        reply.getCreatedAt(),
                        reply.getUpdatedAt()
                        //findUsername(reply.getMemberId()),
                        //findPoint(reply.getMemberId())
                )).collect(Collectors.toList());
        return replyResponseList;
    }

    public ReplyDto.Response createReply(Reply reply, int challengeId, int memberId) {

        reply.setChallengeId(challengeId);
        reply.setMemberId(memberId);
        Reply saveReply = replyRepository.save(reply);
        log.info("saveReply : {}", saveReply);

        ReplyDto.Response response = new ReplyDto.Response(
                saveReply.getReplyId(),
                reply.getMemberId(),
                reply.getChallengeId(),
                reply.getContent(),
                reply.getCreatedAt(),
                reply.getUpdatedAt()
                //findUsername(reply.getMemberId()),
                //findPoint(reply.getMemberId())
        );
        log.info("reply response : {}", response);
        return response;
    }

    public ReplyDto.Response updateReply (Reply reply, int replyId, int memberId) {
        Reply findReply = findVerifyReply(replyId);
        validateWriter(findReply, memberId);

        findReply.setContent(reply.getContent());

        replyRepository.save(findReply);

        ReplyDto.Response response = ReplyDto.Response.from(findReply);
        return response;
    }
    public void deleteReply(int replyId, int memberId) {
        Reply reply = findVerifyReply(replyId);
        validateWriter(reply, memberId);
        replyRepository.delete(reply);
    }
    public Reply findVerifyReply(int replyId) {
        Optional<Reply> optionalReply = replyRepository.findById(replyId);
        Reply findReply = optionalReply.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.REPLY_NOT_FOUND));
        return findReply;
    }
    public void validateWriter(Reply reply, int memberId) {
        if (reply.getMemberId() != memberId) {
            throw new BusinessLogicException(ExceptionCode.REPLY_WRITER_NOT_MATCHED);
        }
    }
    public void validateChallenge(int challengeId){
        challengeService.findVerifideChallenge(challengeId);
    }
    public Page<Reply> getReplyPage(int challengeId, String token, Pageable pageable) {
        Page<Reply> replyPage = replyRepository.findByChallengeId(challengeId, pageable);
        return replyPage;

    }
    public String findUsername(int memberId) {
        Member member = memberService.findMemberById(memberId);
        return member.getName();
    }
    public int findPoint(int memberId) {
        Member member = memberService.findMemberById(memberId);
        return member.getPoint();
    }
}
