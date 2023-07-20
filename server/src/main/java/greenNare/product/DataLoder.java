package greenNare.product;

import greenNare.member.entity.Member;
import greenNare.member.repository.MemberRepository;

import greenNare.product.entity.Image;
import greenNare.product.entity.Product;
import greenNare.product.entity.Review;
import greenNare.product.repository.ImageRepository;
import greenNare.product.repository.ProductRepository;
import greenNare.product.repository.ReviewRepository;
import greenNare.product.service.ProductService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class DataLoder implements CommandLineRunner {
    private final ProductService productService;
    private final ProductRepository productRepository;
    private final ReviewRepository reviewRepository;
    private final MemberRepository memberRepository;

    private final ImageRepository imageRepository;

    public DataLoder(ProductService productService,
                     ProductRepository productRepository,
                     ReviewRepository reviewRepository,
                     MemberRepository memberRepository,
                     ImageRepository imageRepository) {
        this.productService = productService;
        this.productRepository = productRepository;
        this.reviewRepository = reviewRepository;
        this.memberRepository = memberRepository;
        this.imageRepository = imageRepository;
    }


    @Override
    public void run(String... args) {
//        Product product1 = new Product("칫솔1", "칫솔입니다", 100,10, "a.com", "bathroom1");
//        Product product2 = new Product("칫솔2", "칫솔입니다", 200,20, "b.com", "kitchen");
//        Product product3 = new Product("칫솔3", "칫솔입니다", 300,30, "c.com", "bathroom2");
//
//        productRepository.save(product1);
//        productRepository.save(product2);
//        productRepository.save(product3);
//
        makeTestProduct();
    }

    public void makeTestProduct() {

        for (int i=1; i<=30; i++) {
            productRepository.save(new Product("칫솔"+i, "칫솔입니다", i*100, i, "link", "bathroom"));
            productRepository.save(new Product("오이"+i, "오이입니다", i*100, i, "link", "kitchen"));
            productRepository.save(new Product("집"+i, "집입니다", i*100, i, "link", "living"));
            productRepository.save(new Product("연필"+i, "연필입니다", i*100, i, "link", "stationery"));
            productRepository.save(new Product("손수건"+i, "손수건입니다", i*100, i, "link", "hygiene"));
        }
        for(int i=1; i<=30; i++) {
            memberRepository.save(new Member("email"+i, "name"+i,"password"+i,"image"+i,i));
        }
        for (int i=1; i<=30; i++) {
            Member member = memberRepository.findBymemberId(i);
//            reviewRepository.save(Review.builder()
//                    .context("리뷰 * "+i)
//                    .product(productRepository.findByProductId(i))
//                    .member(member)
//                    .build());
            reviewRepository.save(new Review(member, productService.getProduct(i),"리뷰 * "+i ));

        }
        for (int i=1; i<=30; i++) {
            for(int j=0; j<3; j++){
                imageRepository.save(new Image("link"+ i + "-" + j, productService.getProduct(i)));
            }
        }

        for (int i=1; i<=30; i++) {
            for(int j=0; j<3; j++){
                imageRepository.save(new Image("link"+ i + "-" + j, reviewRepository.findById(i)));
            }
        }

    }

}
