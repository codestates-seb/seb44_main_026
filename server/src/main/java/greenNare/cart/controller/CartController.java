package greenNare.cart.controller;

import greenNare.cart.service.CartService;
import greenNare.place.dto.PlaceDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/like")
public class CartController {
    private CartService cartService;
    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @PostMapping("/{productId}")
    public ResponseEntity postLike(@PathVariable("productId") int productId,
                                   @RequestHeader(value = "Authorization", required = false) String token) {
        cartService.createLike(productId/*, token*/);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity deleteLike(@PathVariable("productId") int productId,
                                   @RequestHeader(value = "Authorization", required = false) String token) {
        cartService.deleteLike(productId/*, token*/);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
