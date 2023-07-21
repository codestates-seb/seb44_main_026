package greenNare.product.controller;


import greenNare.Response.MultiResponseDto;
import greenNare.Response.SingleResponseDto;
import greenNare.auth.jwt.JwtTokenizer;
import greenNare.product.dto.GetProductWithImageDto;
import greenNare.product.entity.Product;
import greenNare.product.mapper.ProductMapper;
import greenNare.product.service.ProductService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
//@CrossOrigin(origins = "*")
@RequestMapping("/green")
public class ProductController {
    private ProductService productService;

    public ProductController(ProductService productService, JwtTokenizer jwtTokenizer) {
        this.productService = productService;
    }

    @GetMapping("/")
    public void response(){
        System.out.println("h");
    }

    @GetMapping
    public ResponseEntity getProducts(@RequestParam("page") int page,
                                      @RequestParam("size") int size,
                                      @RequestParam("category") String category){

        Page<Product> getProducts = productService.getProducts(page, size, category);
        List<GetProductWithImageDto> responseProducts = productService.getProductsWithImage(getProducts);
        MultiResponseDto response = new MultiResponseDto(responseProducts, getProducts);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/{productId}")
    public ResponseEntity getProduct(@PathVariable("productId") int productId) {
        GetProductWithImageDto productDetails = productService.getProductWithImage(productId);

        SingleResponseDto response = new SingleResponseDto(productDetails);

        return new ResponseEntity(response, HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity findProduct(@RequestParam("productName") String productName,
                                      @RequestParam("page") int page,
                                      @RequestParam("size") int size) {

        List<Product> Products = productService.findProducts(productName);
        SingleResponseDto response = new SingleResponseDto(Products);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }


}
