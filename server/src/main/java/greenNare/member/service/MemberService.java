package greenNare.member.service;

import greenNare.exception.BusinessLogicException;
import greenNare.exception.ExceptionCode;
import greenNare.member.entity.Member;
import greenNare.member.repository.MemberRepository;
import org.springframework.stereotype.Service;

@Service
public class MemberService {
    private final MemberRepository memberRepository;

    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    public Member findMemberByEmail(String email) {
        return memberRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.INVALID_TOKEN));

    }
    public Member findMemberById(long memberId) {
        return memberRepository.findById(memberId)
                .orElseThrow(()-> new BusinessLogicException(ExceptionCode.CHALLENGE_NOT_FOUND));
    }
}
