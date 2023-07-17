package greenNare.product;


import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Controller {
    @GetMapping("/")
    public ResponseEntity response(){
        String response = "hi";
        System.out.println("h");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
