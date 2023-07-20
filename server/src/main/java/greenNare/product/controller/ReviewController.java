package greenNare.product.controller;


import greenNare.Response.MultiResponseDto;
import greenNare.auth.jwt.JwtTokenizer;
import greenNare.member.service.MemberService;
import greenNare.product.dto.GetReviewWithImageDto;
import greenNare.product.dto.ReviewDto;
import greenNare.product.entity.Review;
import greenNare.product.mapper.ReviewMapper;
import greenNare.product.service.ReviewService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
//@CrossOrigin(origins = "*")
@RequestMapping("/green/review")
public class ReviewController {

    private ReviewService reviewService;

    private ReviewMapper reviewMapper;

    private JwtTokenizer jwtTokenizer;
    private MemberService memberService;

    public ReviewController(ReviewService reviewService,
                            ReviewMapper reviewMapper,
                            JwtTokenizer jwtTokenizer) {

        this.reviewService = reviewService;
        this.reviewMapper = reviewMapper;
        this.jwtTokenizer = jwtTokenizer;

    }

    @GetMapping("/{productId}")
    public ResponseEntity getReviews(@PathVariable("productId") int productId,
                                     @RequestParam int page,
                                     @RequestParam int size) {

        //쿼리 결과가 GetReviewsResultDto로 바뀌지않음 - 확인 후 수정
        //Page<GetReviewsResultDto> reviews = reviewService.getReviews(productId, page, size);

        PageRequest pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        Page<Review> reviewPage = reviewService.getReviews(productId, pageable);
        List<GetReviewWithImageDto> reviews = reviewService.getReviewImage(reviewPage);
        MultiResponseDto response = new MultiResponseDto(reviews, reviewPage);

        return new ResponseEntity(response,  HttpStatus.OK);
    }

    @PostMapping("/{productId}")
    public ResponseEntity postReview(@PathVariable("productId") int productId,
                                     @Valid @RequestBody ReviewDto.Post postDto,
                                     @RequestHeader(value = "Authorization", required = false) String token) {

        reviewService.createReview(reviewMapper.ReviewPostDtoToReview(postDto), jwtTokenizer.getMemberId(token), productId);

        return new ResponseEntity(HttpStatus.CREATED);

    }

    @PatchMapping("/{productId}")
    public ResponseEntity patchReview(@PathVariable("productId") int productId,
                                      @Valid @RequestBody ReviewDto.Patch patchDto,
                                      @RequestHeader(value = "Authorization", required = false) String token) {
        reviewService.updateReview(reviewMapper.ReviewPatchDtoToReview(patchDto), jwtTokenizer.getMemberId(token), productId);

        return new ResponseEntity(HttpStatus.OK);

    }

    @DeleteMapping("/{productId}")
    public ResponseEntity deleteReview(@PathVariable("productId") int productId,
                                       @RequestHeader(value = "Authorization", required = false) String token){
        reviewService.deleteReview(jwtTokenizer.getMemberId(token), productId);

        return new ResponseEntity(HttpStatus.OK);
    }


}