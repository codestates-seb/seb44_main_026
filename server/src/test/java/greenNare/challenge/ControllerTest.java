package greenNare.challenge;

import com.google.gson.Gson;

import greenNare.challenge.controller.ChallengeController;
import greenNare.challenge.dto.ChallengeDto;
import greenNare.challenge.entity.Challenge;
import greenNare.challenge.mapper.ChallengeMapper;
import greenNare.challenge.service.ChallengeService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

import static org.hamcrest.Matchers.*;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
//@WebMvcTest(ChallengeController.class)
public class ControllerTest {

    /*
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private Gson gson;

    @MockBean
    private ChallengeService challengeService;

    @MockBean
    private ChallengeMapper mapper;

    @DisplayName("create challenge test")
    @Test
    void postChallengeTest() throws Exception {
        // given : 테스트용 request body 생성
        ChallengeDto.Post post =  new ChallengeDto.Post("title", "ex");

        //Challenge challenge = mapper.challengePostDtoToChallenge(post);
        //challenge.setChallengeId(1L);
        //challenge.setMemberId(1L);

        given(challengeService.createChallenge(Mockito.any(Challenge.class)))
                .willReturn(new Challenge());//challenge);//.willCallRealMethod();

        //String postContent = gson.toJson(post);
        Challenge mockResultChallenge = new Challenge();
        mockResultChallenge.setChallengeId(1L);
        mockResultChallenge.setMemberId(1L);

        given(challengeService.createChallenge(Mockito.any(Challenge.class))).willReturn(mockResultChallenge);

        String postContent = gson.toJson(post);
        URI uri = UriComponentsBuilder.newInstance().path("/nare/challenge").build().toUri();

        // when : MockMvc 객체로 테스트 대상 Controller 호출
        ResultActions actions = mockMvc.perform(
                MockMvcRequestBuilders
                        .post(uri)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(postContent)
        );

        // then : Controller 핸들러 메서드에서 응답으로 수신한 HTTP Status 및 response body 검증
        actions
                .andExpect(status().isCreated())
                .andExpect(header().string("Location", is(startsWith("/nare/challenge/"))));
    }

    @Test // challenge detail page test
    public void getChallengeTest() throws Exception {
        // given
        ChallengeDto.Post post = new ChallengeDto.Post("title","content");
        String postContent = gson.toJson(post);

        ResultActions postActions =
                mockMvc.perform(
                        post("/nare/challenge")
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(postContent)
                );
        String location = postActions.andReturn().getResponse().getHeader("Location"); // "/nare/challenge/1"

        // when/then
        mockMvc.perform(
                get(location)
                        .accept(MediaType.APPLICATION_JSON)
        )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.title").value(post.getTitle()))
                .andExpect(jsonPath("$.data.content").value(post.getContent()));
                //.andExpect(jsonPath("$.data.createdAt"))
                //.andExpect(jsonPath("$.data.challengeId"))
                //.andExpect(jsonPath("$.data.name"))
                //.andExpect(jsonPath("$.data.point"))
    }

     */
}
