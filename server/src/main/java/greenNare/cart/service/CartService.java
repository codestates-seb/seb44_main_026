package greenNare.cart.service;

import greenNare.cart.entity.Cart;
import greenNare.cart.repository.CartRepository;
import greenNare.exception.BusinessLogicException;
import greenNare.exception.ExceptionCode;
import greenNare.member.service.MemberService;
import greenNare.product.service.ProductService;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CartService {
    private CartRepository cartRepository;
    private ProductService productService;
    private MemberService memberService;

    public CartService(CartRepository cartRepository,
                       ProductService productService,
                       MemberService memberService) {
        this.cartRepository = cartRepository;
        this.productService = productService;
        this.memberService = memberService;
    }


//    public void changeLike(/*String token*, */int productId) {
//        if(findExistLike(productId) == false) createLike(productId);
//        else deleteLike(productId);
//    }
    public void createLike(/*String token*, */int productId) {
        cartRepository.save(new Cart(memberService.findMember(1),productService.getProduct(productId)));
    }

    public void deleteLike(/*String token*, */int productId) {
        cartRepository.delete(findCartProduct(productId));
    }

    public boolean findExistLike(/*String token*, */int productId) {
        Optional<Cart> optionalLike = cartRepository.findByMemberMemberIdAndProductProductId(1, productId);
        boolean like = optionalLike.isPresent();

        return like;
    }

    public Cart findCartProduct(/*String token*, */int productId) {
        Optional<Cart> optionalCart = cartRepository.findByMemberMemberIdAndProductProductId(
                memberService.findMember(1).getMemberId(),
                productService.getProduct(productId).getProductId());
        Cart findCart = optionalCart.orElseThrow(() -> new BusinessLogicException(ExceptionCode.PRODUCT_NOT_FOUND));

        return findCart;
    }
}
