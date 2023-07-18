package greenNare.product.controller;


import greenNare.Response.MultiResponseDto;
import greenNare.Response.PageInfo;
import greenNare.Response.SingleResponseDto;
import greenNare.product.entity.Product;
import greenNare.product.mapper.ProductMapper;
import greenNare.product.service.ProductService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
public class ProductController {
    private ProductService productService;
    private ProductMapper mapper;

    public ProductController(ProductService productService, ProductMapper mapper) {
        this.productService = productService;
        this.mapper = mapper;
    }

    @GetMapping("/")
    public ResponseEntity response(){
        String response = "hi";
        System.out.println("h");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/green")
    public ResponseEntity GetProducts(@RequestParam("page") int page,
                                      @RequestParam("size") int size,
                                      @RequestParam("category") String category){

        Page<Product> getProducts = productService.getProducts(page-1, size, category);
        List<Product> responseProducts = getProducts.getContent();
        MultiResponseDto response = new MultiResponseDto(responseProducts,
                getProducts);



        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/green/{productId}")
    public ResponseEntity getProductDetails(@PathVariable("productId") int productId) {
        Product productDetails = productService.getProductDetails(productId);
        SingleResponseDto response = new SingleResponseDto(productDetails);

        return new ResponseEntity(response, HttpStatus.OK);
    }

    @GetMapping("/green/search")
    public ResponseEntity findProduct(@RequestParam("productName") String productName) {

        List<Product> Products = productService.findProducts(productName);
        SingleResponseDto response = new SingleResponseDto(Products);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }


}
