package greenNare.cart.controller;

import greenNare.Response.MultiResponseDto;
import greenNare.auth.jwt.JwtTokenizer;
import greenNare.cart.entity.Cart;
import greenNare.cart.service.CartService;
import greenNare.place.dto.PlaceDto;
import greenNare.product.dto.GetProductWithImageDto;
import greenNare.product.entity.Product;
import greenNare.product.service.ProductService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/like")
public class CartController {
    private CartService cartService;

    private ProductService productService;

    private JwtTokenizer jwtTokenizer;

    public CartController(CartService cartService,
                          ProductService productService,
                          JwtTokenizer jwtTokenizer) {

        this.cartService = cartService;
        this.productService = productService;
        this.jwtTokenizer = jwtTokenizer;
    }

    @PostMapping("/{productId}")
    public ResponseEntity postLike(@PathVariable("productId") int productId,
                                   @RequestHeader(value = "Authorization", required = false) String token) {
        cartService.createLike(jwtTokenizer.getMemberId(token), productId);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity deleteLike(@PathVariable("productId") int productId,
                                   @RequestHeader(value = "Authorization", required = false) String token) {
        cartService.deleteLike(jwtTokenizer.getMemberId(token), productId);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping()
    public ResponseEntity getLikeProduct(@RequestHeader(value = "Authorization", required = false) String token,
                                         int page, int size) {
        PageRequest pageable = PageRequest.of(page, size);
        Page<Cart> getLikeProducts = cartService.getLikeProducts(jwtTokenizer.getMemberId(token), pageable);

        List<GetProductWithImageDto> getLikeProductsWithImage = cartService.getCartProuctsWithImage(getLikeProducts);
        MultiResponseDto response = new MultiResponseDto(getLikeProductsWithImage, getLikeProducts);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
