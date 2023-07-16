package greenNare.challenge;

import com.google.gson.Gson;
import greenNare.challenge.controller.ChallengeController;
import greenNare.challenge.dto.ChallengeDto;
import greenNare.challenge.entity.Challenge;
import greenNare.challenge.mapper.ChallengeMapper;
import greenNare.challenge.service.ChallengeService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.io.FileInputStream;

import static org.hamcrest.Matchers.*;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;

@AutoConfigureMockMvc
@WebMvcTest(ChallengeController.class)
public class challengeControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    ChallengeService challengeService;

    @MockBean
    ChallengeMapper mapper;

    @Test
    @DisplayName("create challenge test")
    void createChallengeTest() throws Exception {
        ChallengeDto.Post challengePostDto = new ChallengeDto.Post("title","content example");
        Challenge mockChallenge1 = new Challenge(1L,1L,"title","content example", "");
        Challenge mockChallenge2 = new Challenge(1L,1L,"title","content example", "/user/images/image.jpeg");
        MockMultipartFile image = new MockMultipartFile("image", "image.jpeg", "image/jpeg", "your-image-bytes".getBytes());

        given(challengeService.createChallenge(mapper.challengePostDtoToChallenge(challengePostDto))).willReturn(mockChallenge1);
        given(challengeService.saveImage(mockChallenge1, image)).willReturn(mockChallenge2);

        Gson gson = new Gson();
        String content = gson.toJson(challengePostDto);
        System.out.println(content);
        String content2 = "{\"title\":\"title\",\"content\":\"content example\"}";

        //MultiValueMap<String, Object> requestBody = new LinkedMultiValueMap<>();
        //requestBody.add("image", image);
        //requestBody.add("requestBody", content);

        //FileInputStream fileInputStream = new FileInputStream(path);
        //MockMultipartFile image1 =  new MockMultipartFile("image","image.png", "png",fileInputStream);
        mockMvc.perform(
                multipart("/nare/challenge")
                        .file(image)
                        .param("requestBody", content2))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.data.challengeId").value(1))
                .andExpect(jsonPath("$.data.memberId").value(1))
                .andExpect(jsonPath("$.data.title").value("title"))
                .andExpect(jsonPath("$.data.content").value("content example"))
                .andExpect(jsonPath("$.data.image").value("/user/images/image.jpeg"))
                .andDo(print());
        verify(challengeService).createChallenge(mapper.challengePostDtoToChallenge(challengePostDto));
        verify(challengeService).saveImage(mockChallenge1, image);
    }
}
