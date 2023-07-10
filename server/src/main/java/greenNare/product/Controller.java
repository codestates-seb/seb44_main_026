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

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
