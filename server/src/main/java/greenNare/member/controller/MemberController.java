package greenNare.member.controller;



import greenNare.exception.Response.SingleResponseDto;
import greenNare.member.entity.Member;
import greenNare.member.mapper.MemberMapper;
import greenNare.utils.UriCreator;
import greenNare.member.dto.MemberDto;
import greenNare.member.service.MemberService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;

@RestController
@RequestMapping("/user")


    public class MemberController {
    private final MemberMapper mapper;
    private final MemberService memberService;

    public MemberController(MemberMapper mapper, MemberService memberService) {
        this.mapper = mapper;
        this.memberService = memberService;
    }

    @GetMapping("/{member-id}")
        public ResponseEntity getMember(@PathVariable("member-id") int memberId) {
            System.out.println("# memberId: " + memberId);


            return new ResponseEntity<>(HttpStatus.OK);
        }

        @GetMapping
        public ResponseEntity getMembers() {
            System.out.println("# get Members");


            return new ResponseEntity<>(HttpStatus.OK);
        }




  //회원가입
    @PostMapping("/join")
    public ResponseEntity postMember(@Valid @RequestBody MemberDto.Post requestBody) {
        Member member = mapper.memberPostToMember(requestBody);
        Member createdMember = memberService.createMember(member);

        MemberDto.Response responseDto = mapper.memberToMemberResponse(createdMember);
        return new ResponseEntity<>(new SingleResponseDto<>(createdMember), HttpStatus.CREATED);
    }

    //회원정보수정
    @PatchMapping("/info")
    public ResponseEntity patchMember(
            @PathVariable() @Positive int memberId,
            @Valid @RequestBody MemberDto.Patch requestBody,
            @RequestHeader(value = "Authorization", required = false) String token) {



        Member member =
                memberService.updateMember(mapper.memberPatchToMember(requestBody));

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.memberToMemberResponse(member)),
                HttpStatus.OK);
    }

    //회원 등록 정보 조회
    @GetMapping("/info/{member-id}")
    public ResponseEntity getMemberInfo(
            @PathVariable("member-id") @Positive int memberId) {
        Member member = memberService.findMember(memberId);
        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.memberToMemberResponse(member))
                , HttpStatus.OK);
    }
        }

