package greenNare.member.service;

import greenNare.config.SecurityConfiguration;
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
    private SecurityConfiguration securityConfiguration;

    public MemberService(MemberRepository memberRepository, SecurityConfiguration securityConfiguration) {
        this.memberRepository = memberRepository;
        this.securityConfiguration = securityConfiguration;
    }

    public Member createMember(Member member) {
        member.setPassword(securityConfiguration.passwordEncoder().encode(member.getPassword()));

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
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);   //ExceptionCode.MEMBER_NOT_FOUND -> ExceptionCode.MEMBER_EXIST
    }

    public Member findMemberByEmail(String email) {
        return memberRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_EXIST));

    }
    public Member findMemberById(int memberId) {
        return memberRepository.findById(memberId)
                .orElseThrow(()-> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }

    public void addPoint(int memberId) {
        Member member = findMemberById(memberId);
        int point = member.getPoint() + 1;
        member.setPoint(point);
        memberRepository.save(member);
    }
    public void deletePoint(int memberId) {
        Member member = findMemberById(memberId);
        int point = member.getPoint() - 5;
        if (point < 0) {
            throw new BusinessLogicException(ExceptionCode.POINT_LAKE);
        }
        member.setPoint(point);
        memberRepository.save(member);
    }

}
