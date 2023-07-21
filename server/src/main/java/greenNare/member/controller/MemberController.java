package greenNare.member.controller;

import greenNare.auth.jwt.JwtTokenizer;


import greenNare.Response.SingleResponseDto;
import greenNare.member.entity.Member;
import greenNare.member.mapper.MemberMapper;
import greenNare.member.dto.MemberDto;
import greenNare.member.service.MemberService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import java.util.Optional;

@RestController
   @RequestMapping("/user")
    public class MemberController {
    private final MemberMapper mapper;
    private final MemberService memberService;
    private final JwtTokenizer jwtTokenizer;

    public MemberController(MemberMapper mapper, MemberService memberService, JwtTokenizer jwtTokenizer) {
        this.mapper = mapper;
        this.memberService = memberService;
        this.jwtTokenizer = jwtTokenizer;
    }



   //회원가입
    @PostMapping("/join")
    public ResponseEntity postMember(@Valid @RequestBody MemberDto.Post requestBody) {
        Member member = mapper.memberPostToMember(requestBody);

        Member createdMember = memberService.createMember(member);

        return new ResponseEntity<>(new SingleResponseDto<>(createdMember), HttpStatus.CREATED);
    }

    //회원정보수정
    @PatchMapping("/info")
    public ResponseEntity<?> patchMember(
            @RequestHeader("Authorization") String token,
            @Valid @RequestBody MemberDto.Patch requestBody) {

        int memberId = jwtTokenizer.getMemberId(token);
        Member member = memberService.findMember(memberId);

        if (member == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Member not found");
        }

        final Member updatedMember = member;
        Optional.ofNullable(requestBody.getName()).ifPresent(name -> updatedMember.setName(name));
        Optional.ofNullable(requestBody.getPassword()).ifPresent(password -> updatedMember.setPassword(password));

        member = memberService.updateMember(updatedMember);

        return new ResponseEntity<>(new SingleResponseDto<>(mapper.memberToMemberResponse(member)), HttpStatus.OK);
    }

    //회원 등록 정보 조회
    @GetMapping("/info")
    public ResponseEntity<?>getMemberInfoById(@RequestHeader("Authorization") String token) {
        int memberId = jwtTokenizer.getMemberId(token);
        Member member = memberService.findMember(memberId);
        if (member == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Member not found");
        }
        return new ResponseEntity<>(new SingleResponseDto<>(mapper.memberToMemberResponse(member)), HttpStatus.OK);

    }
    @GetMapping("/like")
    public ResponseEntity getLikeProduct(@RequestHeader(value = "Authorization", required = false) String token) {


        return new ResponseEntity<>(HttpStatus.OK);
    }
}

