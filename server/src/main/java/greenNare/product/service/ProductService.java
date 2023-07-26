package greenNare.product.service;


import greenNare.exception.BusinessLogicException;
import greenNare.exception.ExceptionCode;
import greenNare.product.dto.GetProductWithImageDto;
import greenNare.product.entity.Image;
import greenNare.product.entity.Product;
import greenNare.product.repository.ImageRepository;
import greenNare.product.repository.ProductRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {
    private ProductRepository productRepository;
    private ImageRepository imageRepository;

    public ProductService (ProductRepository productRepository,
                           ImageRepository imageRepository) {
        this.productRepository = productRepository;
        this.imageRepository = imageRepository;
    }

    public Page<Product> getProducts(int page, int size, String category) {
        //PageRequest pageRequest = PageRequest.of(1, 2);
        PageRequest pageRequest = PageRequest.of(page, size);
        if(category.equals("all")) {
            Page<Product> products = productRepository.findAll(pageRequest);
            return products;
        }
        else {
            Page<Product> products = productRepository.findByCategory(pageRequest, category);
            return products;
        }


    }

    public List<GetProductWithImageDto> getProductsWithImage(Page<Product> products) {
        //List<Product> productList = products.getContent();
        List<GetProductWithImageDto> getProductWithImageDtos = products.getContent().stream()
                .map(product -> {
                    List<Image> images = imageRepository.findImagesUriByProductProductId(product.getProductId());
                    List<String> imageLinks = images.stream()
                            .map(image -> image.getImageUri())
                            .collect(Collectors.toList());
//                    Image image = imageRepository.findImageUriByProductProductId(product.getProductId());
//                    String imageLink = image.getImageUri();

                    GetProductWithImageDto resultDto = new GetProductWithImageDto(
                            product.getProductId(),
                            product.getProductName(),
                            product.getDetail(),
                            product.getPrice(),
                            product.getCategory(),
                            product.getPoint(),
                            product.getStoreLink(),
                            imageLinks
//                            imageLink
                    );

                    return resultDto;
                })
                .collect(Collectors.toList());

        return getProductWithImageDtos;

    }

    public Product getProduct(int productId) {
        Product productDetails = productRepository.findById(productId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.PRODUCT_NOT_FOUND));
        return productDetails;
    }

    public GetProductWithImageDto getProductWithImage(int productId) {
        Product productDetails = getProduct(productId); //productRepository.findById(productId);
        List<Image> images = imageRepository.findImagesUriByProductProductId(productDetails.getProductId());
        List<String> imageLinks = images.stream()
                .map(image -> image.getImageUri())
                .collect(Collectors.toList());
//        String imageLink = imageRepository.findImageUriByProductProductId(productId).getImageUri();
        GetProductWithImageDto resultDto = new GetProductWithImageDto(
                productDetails.getProductId(),
                productDetails.getProductName(),
                productDetails.getDetail(),
                productDetails.getPrice(),
                productDetails.getCategory(),
                productDetails.getPoint(),
                productDetails.getStoreLink(),
                imageLinks

        );
        return resultDto;
    }

    public List<Product> findProducts(String productName) {

        List<Product> findProducts = productRepository.findByProductName(productName);
        System.out.println(productName + findProducts);

        //String일 경우 조회결과없음 -> int타입으로 price와비교해서 조회확인(ok)
        //List<Product> findProducts = productRepository.findByPrice(productName);

        return findProducts;
    }
}
