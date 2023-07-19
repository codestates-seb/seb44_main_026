package greenNare.member.service;

import greenNare.auth.utils.CustomAuthorityUtils;
import greenNare.member.entity.Member;
import greenNare.member.repository.MemberRepository;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
@Service
public class MemberService {

    private final MemberRepository
    private final PasswordEncoder passwordEncoder;
    private final ApplicationEventPublisher publisher;
    private final CustomAuthorityUtils authorityUtils;

    public MemberService(MemberRepository memberRepository,
                         PasswordEncoder passwordEncoder,
                         CustomAuthorityUtils authorityUtils) {
        this.memberRepository = memberRepository;
        this.publisher = publisher;
        this.passwordEncoder = passwordEncoder;
        this.authorityUtils = authorityUtils;
    }

    //회원가입
    public Member createMember(Member member) {
        verifyExistsEmail(member.getMemberId());

        String encryptedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encryptedPassword);

        List<String> roles = authorityUtils.createRoles(member.getEmail());
        member.setRoles(roles);



        Member savedMember = memberRepository.save(member);

        return savedMember;
    }
    //회원정보수정







}
