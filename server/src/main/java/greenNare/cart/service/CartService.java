package greenNare.cart.service;

import greenNare.cart.entity.Cart;
import greenNare.cart.repository.CartRepository;
import greenNare.exception.BusinessLogicException;
import greenNare.exception.ExceptionCode;
import greenNare.member.service.MemberService;
import greenNare.product.entity.Product;
import greenNare.product.service.ProductService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
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
    public void createLike(int memberId, int productId) {
        if(findExistLike(memberId, productId) == true) throw new BusinessLogicException(ExceptionCode.PRODUCT_EXIST);
        cartRepository.save(new Cart(memberService.findMember(memberId),productService.getProduct(productId)));
//        cartRepository.save(new Cart(cartRepository.findMemberByMemberMemberId(memberId), productService.getProduct(productId)));
    }

    public void deleteLike(int memberId, int productId) {
        if(findExistLike(memberId, productId) != true) throw new BusinessLogicException(ExceptionCode.PRODUCT_NOT_FOUND);
        cartRepository.delete(findExistLikeProduct(memberId, productId));
    }

    public boolean findExistLike(int memberId, int productId) {
        Optional<Cart> optionalLike = cartRepository.findByMemberMemberIdAndProductProductId(memberId, productId);
        boolean like = optionalLike.isPresent();

        return like;
    }

    public Cart findExistLikeProduct(int memberId, int productId) {
        Optional<Cart> optionalCart = cartRepository.findByMemberMemberIdAndProductProductId(
                cartRepository.findMemberByMemberMemberId(memberId).getMemberId(),
                productService.getProduct(productId).getProductId());
        Cart findCart = optionalCart.orElseThrow(() -> new BusinessLogicException(ExceptionCode.PRODUCT_NOT_FOUND));

        return findCart;
    }

    public Page<Product> findMyLikeProducts(int memberId, PageRequest pageable) {
        Page<Product> myCartProducts = cartRepository.findProductByMemberMemberId(memberId, pageable);

        return myCartProducts;
    }

}
