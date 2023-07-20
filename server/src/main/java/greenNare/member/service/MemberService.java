package greenNare.member.service;

import greenNare.config.SecurityConfiguration;
import greenNare.exception.BusinessLogicException;
import greenNare.exception.ExceptionCode;
import greenNare.member.entity.Member;
import greenNare.member.repository.MemberRepository;
import greenNare.product.dto.GetProductWithImageDto;
import greenNare.product.entity.Image;
import greenNare.product.entity.Product;
import greenNare.product.repository.ImageRepository;
import greenNare.product.service.ProductService;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import javax.imageio.ImageReader;
import java.util.Optional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MemberService {
    private MemberRepository memberRepository;
    private SecurityConfiguration securityConfiguration;

    private ImageRepository imageRepository;

    private ProductService productService;

    public MemberService(MemberRepository memberRepository,
                         SecurityConfiguration securityConfiguration,
                         ImageRepository imageRepository,
                         ProductService productService) {
        this.memberRepository = memberRepository;
        this.securityConfiguration = securityConfiguration;
        this.imageRepository = imageRepository;
        this.productService = productService;
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
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
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
//    public List<GetProductWithImageDto> getLikeProducts(Page<Product> products) {
//        return productService.getProductWithImage(products);
//
//    }
}