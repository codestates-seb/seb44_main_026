package greenNare.place.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

public class PlaceDto {
    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Post {
        private String placeName;
        private double lat;
        private double longi;
    }

    public static class Response {
        private String placeName;
        private double lat;
        private double longi;
    }

}
