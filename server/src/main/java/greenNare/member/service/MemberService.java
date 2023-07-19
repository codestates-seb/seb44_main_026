package greenNare.member.service;

import greenNare.auth.utils.CustomAuthorityUtils;
import greenNare.exception.BusinessLogicException;
import greenNare.member.entity.Member;
import greenNare.member.repository.MemberRepository;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Transactional
@Service
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final ApplicationEventPublisher publisher;
    private final CustomAuthorityUtils authorityUtils;

    @Service
    public class MemberService {
        private final MemberRepository memberRepository;

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

        public Member findMember(long memberId) {
            return findVerifiedMember(memberId);
        }

        public Page<Member> findMembers(int page, int size) {
            return memberRepository.findAll(PageRequest.of(page, size,
                    Sort.by("memberId").descending()));
        }

        public void deleteMember(long memberId) {
            Member findMember = findVerifiedMember(memberId);

            memberRepository.delete(findMember);
        }

        public Member findVerifiedMember(long memberId) {
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
                throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
        }
    }






}
