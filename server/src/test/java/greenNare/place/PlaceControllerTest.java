package greenNare.place;

import com.google.gson.Gson;
import greenNare.place.controller.PlaceController;
import greenNare.place.dto.PlaceDto;
import greenNare.place.entity.Place;
import greenNare.place.mapper.PlaceMapper;
import greenNare.place.service.PlaceService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureWebMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.hamcrest.Matchers.*;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
//@WebMvcTest(PlaceController.class)
@SpringBootTest
@AutoConfigureWebMvc
public class PlaceControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    PlaceService placeService;

    @MockBean
    PlaceMapper placeMapper;

    @Test
    @DisplayName("create place test")
    void createPlaceTest() throws Exception {
        Place mockPlace = new Place(1,1,"place1",1.1,2.1);
        String mockToken = "token";
        PlaceDto.Post placePostDto = new PlaceDto.Post("place1", 1.1, 2.1);
        given(placeService.createPlace(placeMapper.placePostDtoToPlace(placePostDto), mockToken)).willReturn(mockPlace);

        Gson gson = new Gson();
        String content =  gson.toJson(placePostDto);

        mockMvc.perform(
                post("/nare/map")
                        .content(content)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.data.placeId").value(1))
                .andExpect(jsonPath("$.data.memberId").value(1))
                .andExpect(jsonPath("$.data.placeName").value("place1"))
                .andExpect(jsonPath("$.data.lat").value(1.1))
                .andExpect(jsonPath("$.data.longi").value(2.1))
                .andDo(print());

        verify(placeService).createPlace(placeMapper.placePostDtoToPlace(placePostDto), mockToken);
    }

    @Test
    @DisplayName("get place test")
    void getPlaceTest() throws Exception {
        List<Place> mockPlaces = new ArrayList<>(Arrays.asList(new Place(1, 1, "place1", 1.1, 2.2), new Place(2,2,"place2",2.2,3.3)));
        given(placeService.getPlaces()).willReturn(mockPlaces);

        mockMvc.perform(
                get("/nare/map"))
                .andExpect(jsonPath("$[0].placeId").value(1))
                .andExpect(jsonPath("$[0].memberId").value(1))
                .andExpect(jsonPath("$[0].placeName").value("place1"))
                .andExpect(jsonPath("$[0].lat").value(1.1))
                .andExpect(jsonPath("$[0].longi").value(2.2))
                .andExpect(jsonPath("$[1].placeId").value(2))
                .andExpect(jsonPath("$[1].memberId").value(2))
                .andExpect(jsonPath("$[1].placeName").value("place2"))
                .andExpect(jsonPath("$[1].lat").value(2.2))
                .andExpect(jsonPath("$[1].longi").value(3.3))
                .andDo(print());

        verify(placeService).getPlaces();
    }

    @Test
    @DisplayName("delete place test")
    void deletePlaceTest() throws Exception {
        int placeId = 1;
        String mockToken = "token";
        // String token = "your-token";

        // Mock placeService.deletePlace 호출 시 아무 작업도 하지 않도록 설정
        doNothing().when(placeService).deletePlace(placeId, mockToken);

        mockMvc.perform(
                delete("/nare/map/{placeId}", placeId)
                        //.header("Authorization", token)
                )
                .andExpect(status().isNoContent())
                .andDo(print());

        verify(placeService).deletePlace(placeId, mockToken);
    }
}
