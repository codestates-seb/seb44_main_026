package greenNare.member.controller;



import greenNare.Response.MultiResponseDto;
import greenNare.Response.SingleResponseDto;
import greenNare.member.entity.Member;
import greenNare.member.mapper.MemberMapper;
import greenNare.member.dto.MemberDto;
import greenNare.member.service.MemberService;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@RequestMapping("/user")


    public class MemberController {
    private final MemberMapper mapper;
    private final MemberService memberService;

    public MemberController(MemberMapper mapper, MemberService memberService) {
        this.mapper = mapper;
        this.memberService = memberService;
    }

    @GetMapping
    public ResponseEntity getMember() {
        System.out.println("# get Member");

        return new ResponseEntity<>(HttpStatus.OK);
    }


   //회원가입
    @PostMapping("/join")
    public ResponseEntity postMember(@Valid @RequestBody MemberDto.Post requestBody) {
        Member member = mapper.memberPostToMember(requestBody);

        Member createdMember = memberService.createMember(member);
       /* URI location = UriCreator.createUri(MEMBER_DEFAULT_URL, createdMember.getMemberId());

        return ResponseEntity.created(location).build();*/
        return new ResponseEntity<>(new SingleResponseDto<>(createdMember), HttpStatus.CREATED);
    }

    //회원정보수정
    @PatchMapping("/info")
    public ResponseEntity patchMember(
            @PathVariable() @Positive long memberId,
            @Valid @RequestBody MemberDto.Patch requestBody,
            @RequestHeader(value = "Authorization", required = false) String token) {

        Member member =
                memberService.updateMember(mapper.memberPatchToMember(requestBody));

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.memberToMemberResponse(member)),
                HttpStatus.OK);
    }

    //회원 등록 정보 조회
    @GetMapping("/info")
    public ResponseEntity getMember(@PathVariable @Positive int memberId) {
        Member member = memberService.findMember(memberId);
        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.memberToMemberResponse(member))
                , HttpStatus.OK);
    }

    @GetMapping("/like")
    public ResponseEntity getLikeProduct(@RequestHeader(value = "Authorization", required = false) String token) {


        return new ResponseEntity<>(HttpStatus.OK);
    }
}

