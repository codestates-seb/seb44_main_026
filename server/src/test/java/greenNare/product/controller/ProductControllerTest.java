package greenNare.product.controller;

import com.google.gson.Gson;
import greenNare.Response.SingleResponseDto;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc   //MockMvc 자동구성
public class ProductControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private Gson gson;
    @DisplayName("getProducts 요청 및 응답코드 확인")
    @Test
    public void getProductsTest() throws Exception {
        //given
        String url = "/green";
        SingleResponseDto response = Mockito.any(SingleResponseDto.class);
        String content = gson.toJson(response);

        //when
        ResultActions actions = mockMvc.perform(
                MockMvcRequestBuilders.get(url)
                        .accept(MediaType.APPLICATION_JSON)
                        .content(content)
        );

        //then
        actions.andExpect(status().isOk());

    }

    @DisplayName("getProducts 응답 확인")
    @Test
    public void getProductsTest2() {
        //given


    }

}
