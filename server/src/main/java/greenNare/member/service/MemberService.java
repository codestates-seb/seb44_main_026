package greenNare.member.service;

import greenNare.member.entity.Member;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Transactional
@Service
public class MemberService {

    private final MemberRepository
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils authorityUtils;

    public MemberService(MemberRepository memberRepository,
                         PasswordEncoder passwordEncoder,
                         CustomAuthorityUtils authorityUtils) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
        this.authorityUtils = authorityUtils;
    }

    //회원가입
    public Member createMember(Member member) {
        verifyExistsEmail(member.getMemberId());

        String encryptedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encryptedPassword);



        Member savedMember = memberRepository.save(member);

        return savedMember;
    }
    //회원정보수정







}
