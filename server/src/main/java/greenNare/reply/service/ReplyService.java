package greenNare.reply.service;

import greenNare.auth.jwt.JwtTokenizer;
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
    private final JwtTokenizer jwtTokenizer;

    public ReplyService(ReplyRepository replyRepository, MemberService memberService, JwtTokenizer jwtTokenizer) {
        this.replyRepository = replyRepository;
        this.memberService = memberService;
        this.jwtTokenizer = jwtTokenizer;
    }

    public List<ReplyDto.Response> getReplys(int challengeId, Pageable pageable) {
        Page<Reply> replyList = replyRepository.findByChallengeId(challengeId, pageable);
        List<ReplyDto.Response> replyResponseList = replyList.stream()
                .map((reply)-> {
                    Member member = memberService.findMemberById(reply.getMemberId());
                    return ReplyDto.Response.from(reply, member);
                }).collect(Collectors.toList());

        return replyResponseList;
    }

    public ReplyDto.Response createReply(Reply reply, int challengeId, String token) {
        //validateChallenge(challengeId);

        int memberId = jwtTokenizer.getMemberId(token);

        reply.setChallengeId(challengeId);
        reply.setMemberId(memberId);

        List<Reply> replyList = replyRepository.findByChallengeId(challengeId);
        int sameUserReplyCnt = (int) replyList.stream()
                .filter(r -> r.getMemberId() == memberId)
                .count();
        if(sameUserReplyCnt < 1) {
            throw new BusinessLogicException(ExceptionCode.ALREADY_JOINED);
        }
        memberService.addPoint(memberId, 100);

        replyRepository.save(reply);

        Member member = memberService.findMemberById(memberId);

        log.info("create Reply 성공");
        return ReplyDto.Response.from(reply, member);
    }

    public ReplyDto.Response updateReply (Reply reply, int replyId, String token) {
        Reply findReply = findVerifyReply(replyId);
        int memberId = jwtTokenizer.getMemberId(token);
        validateWriter(findReply, memberId);

        findReply.setContent(reply.getContent());

        replyRepository.save(findReply);

        Member member = memberService.findMemberById(memberId);

        ReplyDto.Response response = ReplyDto.Response.from(findReply, member);
        return response;
    }
    public void deleteReply(int replyId, String token) {
        Reply reply = findVerifyReply(replyId);
        int memberId = jwtTokenizer.getMemberId(token);
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
    /*
    public void validateChallenge(int challengeId){
        challengeService.findVerifideChallenge(challengeId);
    }*/

    public Page<Reply> getReplyPage(int challengeId, Pageable pageable) {
        Page<Reply> replyPage = replyRepository.findByChallengeId(challengeId, pageable);
        return replyPage;

    }

    public int countChallenge(int challengeId){
        log.info("challenge 댓글 수: {}",(int) replyRepository.findByChallengeId(challengeId).stream().count());
        return (int) replyRepository.findByChallengeId(challengeId).stream().count();
    }

    public List<Reply> findAllReply(int challengeId) {
        return replyRepository.findByChallengeId(challengeId);
    }
}
