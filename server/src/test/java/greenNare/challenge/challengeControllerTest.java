package greenNare.challenge;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import greenNare.challenge.controller.ChallengeController;
import greenNare.challenge.dto.ChallengeDto;
import greenNare.challenge.entity.Challenge;
import greenNare.challenge.mapper.ChallengeMapper;
import greenNare.challenge.service.ChallengeService;
import greenNare.place.entity.Place;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileInputStream;
import java.time.LocalDateTime;
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

@AutoConfigureMockMvc
//@WebMvcTest(ChallengeController.class)
@SpringBootTest
public class challengeControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ChallengeService challengeService;

    @MockBean
    private ChallengeMapper mapper;

    private ChallengeDto.Post mockChallengePostDto;
    private ChallengeDto.Response mockChallengeResponse;

    @BeforeEach
    public void setUp() {
        // 테스트에 사용할 예시 데이터 초기화
        mockChallengePostDto = new ChallengeDto.Post("title", "content example");

        // ... 다른 필요한 초기화 작업 수행 ...
        mockChallengeResponse = new ChallengeDto.Response(1, 1, "title", "content", LocalDateTime.now(), LocalDateTime.now(), "images/image.jpg", "name", 500, 0);

        //mockChallengeResponse = new ChallengeDto.Response();
        //mockChallengeResponse.setChallengeId(1);
        //mockChallengeResponse.setTitle("Mock Challenge");
        //mockChallengeResponse.setContent("Mock Content");
    }

/*
    @Test
    @DisplayName("create challenge test")
    void createChallengeTest() throws Exception {
        // 요청
        ChallengeDto.Post challengePostDto = new ChallengeDto.Post("title","content example");
        //Challenge mockChallenge1 = new Challenge(1,1,"title","content example", "");
        //Challenge mockChallenge2 = new Challenge(1,1,"title","content example", "/user/images/image.jpeg");
        // mock 응답
        LocalDateTime localDateTime = LocalDateTime.now();
        ChallengeDto.Response mockChallengeResponse= new ChallengeDto.Response(1,1, "title", "content",localDateTime,localDateTime,"image.jpg","name",0,0);
        MockMultipartFile image = new MockMultipartFile("image", "image.jpeg", "image/jpeg", "your-image-bytes".getBytes());

        given(challengeService.createChallenge(mapper.challengePostDtoToChallenge(challengePostDto), "token", image)).willReturn(mockChallengeResponse);
        //given(challengeService.saveImage(mockChallenge1, image)).willReturn(mockChallenge2);

        Gson gson = new Gson();
        String content = gson.toJson(challengePostDto);
        //System.out.println(content);
        //String content2 = "{\"title\":\"title\",\"content\":\"content example\"}";

        //MultiValueMap<String, Object> requestBody = new LinkedMultiValueMap<>();
        //requestBody.add("image", image);
        //requestBody.add("requestBody", content);

        //FileInputStream fileInputStream = new FileInputStream(path);
        //MockMultipartFile image1 = new MockMultipartFile("image","image.png", "png",fileInputStream);
        mockMvc.perform(
                multipart("/nare/challenge")
                        .file(image)
                        .param("requestBody", content))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.data.challengeId").value(1))
                .andExpect(jsonPath("$.data.memberId").value(1))
                .andExpect(jsonPath("$.data.title").value("title"))
                .andExpect(jsonPath("$.data.content").value("content example"))
                .andExpect(jsonPath("$.data.image").value("/user/images/image.jpeg"))
                .andDo(print());
        verify(challengeService).createChallenge(mapper.challengePostDtoToChallenge(challengePostDto),"token",image);
        //verify(challengeService).saveImage(mockChallenge1, image);
    }*/
    /*
@Test
public void testPostChallenge() throws Exception {
    ChallengeDto.Post requestBody = new ChallengeDto.Post();
    requestBody.setTitle("Test Challenge");
    requestBody.setContent("Test Content");

    ChallengeDto.Response createdChallengeResponse = new ChallengeDto.Response();
    createdChallengeResponse.setChallengeId(1);
    createdChallengeResponse.setTitle("Test Challenge");
    createdChallengeResponse.setContent("Test Content");

    given(mapper.challengePostDtoToChallenge(requestBody))
            .willReturn(new Challenge());
    given(challengeService.createChallenge(Mockito.any(Challenge.class), Mockito.any(String.class), Mockito.any(MultipartFile.class)))
            .willReturn(createdChallengeResponse);

   // when(mapper.challengePostDtoToChallenge(requestBody)).thenReturn(new Challenge());
   // when(challengeService.createChallenge(any(Challenge.class), anyString(), any(MultipartFile.class)))
   //         .thenReturn(createdChallengeResponse);

    MockMultipartFile multipartFile = new MockMultipartFile("image", "test.jpg", "image/jpeg", "test image".getBytes());

    mockMvc.perform(MockMvcRequestBuilders.multipart("/nare/challenge")
                    .file("image", multipartFile.getBytes())
                    .param("title", "Test Challenge")
                    .param("content", "Test Content")
                    .header("Authorization", "Bearer token"))
            .andExpect(MockMvcResultMatchers.status().isCreated())
            .andExpect(MockMvcResultMatchers.jsonPath("$.data.challengeId").value(1))
            .andExpect(MockMvcResultMatchers.jsonPath("$.data.title").value("Test Challenge"))
            .andExpect(MockMvcResultMatchers.jsonPath("$.data.content").value("Test Content"));

    verify(mapper).challengePostDtoToChallenge(requestBody);
    verify(challengeService).createChallenge(any(Challenge.class), eq("token"), any(MultipartFile.class));
}
@Test
@DisplayName("챌린지 생성 API 호출 테스트")
public void testPostChallenge() throws Exception {
    ChallengeDto.Response mockChallengeResponse2 = new ChallengeDto.Response(1, 1, "title", "content", LocalDateTime.now(), LocalDateTime.now(), "images/image.jpg", "name", 500, 0);

    // Given
    MockMultipartFile image = new MockMultipartFile("image", "image.jpeg", "image/jpeg", "your-image-bytes".getBytes());
    String token = "your-token";

    // 가짜 서비스 메서드 호출을 위한 Mock 설정
    given(challengeService.createChallenge(Mockito.any(Challenge.class), Mockito.any(String.class), Mockito.any(MultipartFile.class)))
            .willReturn(mockChallengeResponse2);
   // given(mapper.challengePostDtoToChallenge(Mockito.any(ChallengeDto.Post.class)))
    //        .willReturn(new Challenge());

    Gson gson = new Gson();
    String content = gson.toJson(mockChallengePostDto);
    // When & Then
    mockMvc.perform(MockMvcRequestBuilders.multipart("/nare/challenge")
                    .file("image", image.getBytes())
                    .param("requestBody", new ObjectMapper().writeValueAsString(content))
                    .header("Authorization", token)
                    .contentType(MediaType.MULTIPART_FORM_DATA))
            .andExpect(MockMvcResultMatchers.status().isCreated())
            .andExpect(MockMvcResultMatchers.jsonPath("$.data.challengeId").exists())
            .andExpect(MockMvcResultMatchers.jsonPath("$.data.memberId").value(1))
            .andExpect(MockMvcResultMatchers.jsonPath("$.data.title").value("title"))
            .andExpect(MockMvcResultMatchers.jsonPath("$.data.content").value("content example"))
            .andExpect(MockMvcResultMatchers.jsonPath("$.data.image").value("images/image.jpg"));
}
*/
    @Test
    @DisplayName("get challenge test")
    void getChallengeTest() throws Exception {
        Pageable pageable = PageRequest.ofSize(10).withPage(1);
        List<Place> mockPlaces = new ArrayList<>(Arrays.asList(new Place(1, 1, "place1", 1.1, 2.2), new Place(2,2,"place2",2.2,3.3)));

        //Page<ChallengeDto.Response> mockChallenges = Arrays.asList(new Challenge(1,1,"title","content","image"));

        //given(challengeService.getAllChallengeWithUsername(pageable)).willReturn(mockChallenges);
    }
}
