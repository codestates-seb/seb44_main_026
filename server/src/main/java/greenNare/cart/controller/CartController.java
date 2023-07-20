package greenNare.cart.controller;

import greenNare.auth.jwt.JwtTokenizer;
import greenNare.cart.service.CartService;
import greenNare.place.dto.PlaceDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/like")
public class CartController {
    private CartService cartService;

    private JwtTokenizer jwtTokenizer;

    public CartController(CartService cartService,
                          JwtTokenizer jwtTokenizer) {

        this.cartService = cartService;
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
}
