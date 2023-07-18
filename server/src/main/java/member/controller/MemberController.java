package member.controller;



import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;

@RestController
@RequestMapping("/user")

public class MemberController {
    private final static String MEMBER_DEFAULT_URL = "/user";
    private final MemberService memberService;
    /*private final QuestionService questionService;
    private final AnswerService answerService;*/

    private final MemberMapper mapper;

    public MemberController(MemberService memberService,/*PlaceService placeservice, LikeService likeService,
                            ChallengeService challengeService, ReplyService replyService*/, MemberMapper mapper) {
        this.memberService = memberService;
       /* this.placeService = placeservice;
        this.likeService = likeService;
        this.challengeService = challengeService;*/
        this.mapper = mapper;
    }

    //회원가입
    @PostMapping("/join)
    public ResponseEntity postMember(@Valid @RequestBody MemberDto.Post requestBody) {
        Member member = mapper.memberPostToMember(requestBody);

        Member createdMember = memberService.createMember(member);
        URI location = UriCreator.createUri(MEMBER_DEFAULT_URL, createdMember.getMemberId());

        return ResponseEntity.created(location).build();
    }
    //회원정보수정
    @PatchMapping("/{member-id}")
    public ResponseEntity patchMember(
            @PathVariable("member-id") @Positive int memberId,
            @Valid @RequestBody MemberDto.Patch requestBody) {
        requestBody.setMemberId(memberId);


        Member member =
                memberService.updateMember(mapper.memberPatchToMember(requestBody));

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.memberToMemberResponse(member)),
                HttpStatus.OK);
    }

    //회원 등록 정보 조회
    @GetMapping("/{member-id}")
    public ResponseEntity getMember(
            @PathVariable("member-id") @Positive int memberId) {
        Member member = memberService.findMember(memberId);
        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.memberToMemberResponse(member))
                , HttpStatus.OK);
    }

}