package greenNare.member.service;

import greenNare.exception.BusinessLogicException;
import greenNare.exception.ExceptionCode;
import greenNare.member.entity.Member;
import greenNare.member.repository.MemberRepository;
import org.springframework.stereotype.Service;
import java.util.Optional;

import java.util.List;

@Service
public class MemberService {
    private MemberRepository memberRepository;

    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    public Member createMember(Member member) {

        verifyExistsEmail(member.getEmail());


        return memberRepository.save(member);
    }

    public Member updateMember(Member member) {

        Member findMember = findVerifiedMember(member.getMemberId());


        Optional.ofNullable(member.getName())
                .ifPresent(name -> findMember.setName(name));

        return memberRepository.save(findMember);
    }


    public Member findMember(int memberId) {
        return findVerifiedMember(memberId);
    }

    public List<Member> findMember() {

        return (List<Member>) memberRepository.findAll();
    }


    public void deleteMember(int memberId) {
        Member findMember = findVerifiedMember(memberId);

        memberRepository.delete(findMember);
    }


    public Member findVerifiedMember(int memberId) {
        Optional<Member> optionalMember =
                memberRepository.findById(memberId);
        Member findMember =
                optionalMember.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        return findMember;
    }


    private void verifyExistsEmail(String email) {
        Optional<Member> member = memberRepository.findByEmail(email);
        if (member.isPresent())
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
    }

    public Member findMemberByEmail(String email) {
        return memberRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_EXIST));

    }
    public Member findMemberById(int memberId) {
        return memberRepository.findById(memberId)
                .orElseThrow(()-> new BusinessLogicException(ExceptionCode.MEMBER_EXIST));
    }

}
