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
    private final ChallengeService challengeService;
    private final JwtTokenizer jwtTokenizer;

    public ReplyService(ReplyRepository replyRepository, MemberService memberService, ChallengeService challengeService, JwtTokenizer jwtTokenizer) {
        this.replyRepository = replyRepository;
        this.memberService = memberService;
        this.challengeService = challengeService;
        this.jwtTokenizer = jwtTokenizer;
    }

    public List<ReplyDto.Response> getReplys(int challengeId, Pageable pageable) {
        Page<Reply> replyList = replyRepository.findByChallengeChallengeId(challengeId, pageable);
        List<ReplyDto.Response> replyResponseList = replyList.stream()
                .map((reply)-> {
                    //Member member = memberService.findMemberById(reply.getMemberId());
                    return ReplyDto.Response.from(reply, reply.getMember());
                }).collect(Collectors.toList());

        return replyResponseList;
    }

    public ReplyDto.Response createReply(Reply reply, int challengeId, String token) {
        //validateChallenge(challengeId);

        int memberId = jwtTokenizer.getMemberId(token);
        Member member = findMemberByToken(token);
        Challenge challenge = challengeService.findVerifideChallenge(challengeId);

        //reply.setChallengeId(challengeId);
        //reply.setMemberId(memberId);
        reply.setChallenge(challenge);
        reply.setMember(member);

        List<Reply> replyList = replyRepository.findByChallengeChallengeId(challengeId);
        int sameUserReplyCnt = (int) replyList.stream()
                .filter(r -> r.getMember().getMemberId() == memberId)
                .count();
        if(sameUserReplyCnt > 0) {
            throw new BusinessLogicException(ExceptionCode.ALREADY_JOINED);
        }
        memberService.addPoint(memberId, 100);

        replyRepository.save(reply);

        log.info("create Reply 성공");
        return ReplyDto.Response.from(reply, member);
    }

    public ReplyDto.Response updateReply (Reply reply, int replyId, String token) {
        Reply findReply = findVerifyReply(replyId);
        int memberId = jwtTokenizer.getMemberId(token);
        validateWriter(findReply, memberId);

        findReply.setContent(reply.getContent());

        replyRepository.save(findReply);

        Member member = memberService.findVerifiedMember(memberId);

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
        if (reply.getMember().getMemberId() != memberId) {
            throw new BusinessLogicException(ExceptionCode.REPLY_WRITER_NOT_MATCHED);
        }
    }
    /*
    public void validateChallenge(int challengeId){
        challengeService.findVerifideChallenge(challengeId);
    }*/

    public Page<Reply> getReplyPage(int challengeId, Pageable pageable) {
        Page<Reply> replyPage = replyRepository.findByChallengeChallengeId(challengeId, pageable);
        return replyPage;

    }

    public int countChallenge(int challengeId){
        log.info("challenge 댓글 수: {}",(int) replyRepository.findByChallengeChallengeId(challengeId).stream().count());
        return (int) replyRepository.findByChallengeChallengeId(challengeId).stream().count();
    }

    public List<Reply> findAllReply(int challengeId) {
        return replyRepository.findByChallengeChallengeId(challengeId);
    }

    public Member findMemberByToken(String token) {
        if(token.isBlank()) {
            throw new BusinessLogicException(ExceptionCode.INVALID_TOKEN);
        }
        int memberId = jwtTokenizer.getMemberId(token);
        log.info("token에서 추출한 memberId : {}", memberId);
        return memberService.findMemberById(memberId);
    }
}
