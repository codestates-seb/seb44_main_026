package greenNare.product.service;

import greenNare.exception.BusinessLogicException;
import greenNare.exception.ExceptionCode;
import greenNare.member.repository.MemberRepository;
import greenNare.product.dto.GetReviewWithImageDto;
import greenNare.product.entity.Image;
import greenNare.product.entity.Review;
import greenNare.product.repository.ImageRepository;
import greenNare.product.repository.ReviewRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ReviewService {
    private ReviewRepository reviewRepository;

    private ImageRepository imageRepository;    //imageService를 만들어야할지

    private ProductService productService;

    private MemberRepository memberRepository;

    public ReviewService(ReviewRepository reviewRepository,
                         ProductService productService,
                         MemberRepository memberRepository,
                         ImageRepository imageRepository) {
        this.reviewRepository = reviewRepository;
        this.productService = productService;
        this.memberRepository = memberRepository;
        this.imageRepository = imageRepository;
    }

    public Page<Review> getReviews(int productId, int page, int size) {
        PageRequest pageable = PageRequest.of(page,size);

        //필요한 데이터만 반환하도록 수정
        Page<Review> reviews = reviewRepository.findByProductProductId(pageable, productId);

        return reviews;
    }

    public List<GetReviewWithImageDto> getReviewImage(Page<Review> reviews) {
        List<GetReviewWithImageDto> getReviewWithImageDtos = reviews.getContent().stream()
                .map(review -> {
                    List<Image> images = imageRepository.findImagesUriByReviewReviewId(review.getReviewId());
                    List<String> imageLinks = images.stream()
                            .map(image -> image.getImageUri())
                            .collect(Collectors.toList());

                    GetReviewWithImageDto resultDto = new GetReviewWithImageDto(
                            review.getReviewId(),
                            review.getContext(),
                            review.getCreatedAt(),
                            review.getUpdatedAt(),
                            review.getProduct().getProductId(),
                            imageLinks,
                            review.getMember().getName(),
                            review.getMember().getPoint()
                    );
//                    resultDto.setReviewId(review.getReviewId());
//                    resultDto.setContext(review.getContext());
//                    resultDto.setCreatedAt(review.getCreatedAt());
//                    resultDto.setUpdateId(review.getUpdatedAt());
//                    resultDto.setProductId(review.getProduct().getProductId());
//                    resultDto.setImageLinks(images);
//                    resultDto.setName(review.getMember().getName());
//                    resultDto.setPoint(review.getMember().getPoint());
                    return resultDto;
                })
                .collect(Collectors.toList());

        return getReviewWithImageDtos;
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
        findReview.setUpdatedAt(LocalDateTime.now());

        reviewRepository.save(findReview);
        System.out.println("updateReview " + review);

    }

    public void deleteReview(/*String token, */int productId) {
        Review findReview = findReview(1, productId);

        reviewRepository.delete(findReview);
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
