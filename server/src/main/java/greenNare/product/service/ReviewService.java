package greenNare.product.service;

import greenNare.exception.BusinessLogicException;
import greenNare.exception.ExceptionCode;
import greenNare.member.repository.MemberRepository;
import greenNare.product.entity.Review;
import greenNare.product.repository.ReviewRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class ReviewService {
    private ReviewRepository reviewRepository;

    private ProductService productService;

    private MemberRepository memberRepository;

    public ReviewService(ReviewRepository reviewRepository, ProductService productService, MemberRepository memberRepository) {
        this.reviewRepository = reviewRepository;
        this.productService = productService;
        this.memberRepository = memberRepository;
    }

    public Page<Review> getReviews(int productId, int page, int size) {
        PageRequest pageable = PageRequest.of(page,size);
        //쿼리 결과가 GetReviewsResultDto로 바뀌지않음 - 확인 후 수정
        //Page<GetReviewsResultDto> reviews = reviewRepository.findByProductId(pageable, productId);

        //필요한 데이터만 반환하도록 수정
        Page<Review> reviews = reviewRepository.findByProductProductId(pageable, productId);

        return reviews;
    }

    //create결과 리턴?
    public void createReview(Review review, int productId/*, String token*/) {
        //
        verifyExistsReview(productId, 1);

        review.setMember(memberRepository.findBymemberId(1));
        review.setProduct(productService.getProduct(productId));
        reviewRepository.save(review);
        System.out.println("createReview " + review);
    }

    public void updateReview(Review review/*String token*/, int productId) {
        //
        Review findReview = findReview(1, productId);

        findReview.setContext(review.getContext());
        findReview.setModifiedAt(LocalDateTime.now());

        reviewRepository.save(findReview);
        System.out.println("updateReview " + review);

    }

    public void verifyExistsReview(int productId, int memberId/*String token*/) {
        boolean exist = reviewRepository.findByMemberMemberIdAndProductProductId(memberId, productId).isPresent();
        if(exist) throw new BusinessLogicException(ExceptionCode.REVIEW_EXIST);

    }

    public Review findReview(int memberId/*String token*/, int productId) {
        Optional<Review> optionalReview = reviewRepository.findByMemberMemberIdAndProductProductId(memberId, productId);
        Review findReview = optionalReview
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.REVIEW_NOT_FOUND));
        return findReview;
    }
}
