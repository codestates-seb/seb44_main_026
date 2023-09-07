package greenNare.challenge;

import com.google.cloud.storage.Blob;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.protobuf.Empty;
import greenNare.auth.jwt.JwtTokenizer;
import greenNare.challenge.dto.ChallengeDto;
import greenNare.challenge.entity.Challenge;
import greenNare.challenge.repository.ChallengeRepository;
import greenNare.challenge.service.ChallengeService;
import greenNare.config.SecurityConfiguration;
import greenNare.exception.BusinessLogicException;
import greenNare.member.entity.Member;
import greenNare.member.service.MemberService;
import net.bytebuddy.pool.TypePool;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.BDDMockito.given;

import static org.mockito.Mockito.*;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.then;
import static org.mockito.BDDMockito.willReturn;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.is;

public class ServiceTest {
    @Mock
    private JwtTokenizer jwtTokenizer;
    @Mock
    private MemberService memberService;
    @Mock
    private ChallengeRepository challengeRepository;

    @InjectMocks
    private ChallengeService challengeService;

    @Mock
    private Storage storage;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        challengeService = new ChallengeService(challengeRepository, memberService, null, storage);
    }

    @DisplayName("create challenge test")
    @Test
    public void createChallengeTest() throws IOException {
        /*
        String token = "validToken";
        String bucketName = "test-bucket"; // 임의의 테스트용 버킷 이름
        String fileName = "test-image.jpg"; // 임의의 테스트용 파일 이름

        Member member = new Member("email@email.com", "testMember","password",1000);

        //Challenge challenge = new Challenge("test challenge", "test challenge content");
        Challenge challenge = new Challenge(1,member,"test challenge", "test challenge content","image",null);
        MockMultipartFile file = new MockMultipartFile(
                "file", "test-image.jpg","image/jpeg", new byte[10]
        );
        Blob mockBlob = mock(Blob.class);
        BlobInfo blobInfo = BlobInfo.newBuilder(bucketName, fileName)
                .setContentType("image/jpeg")
                .build();

        given(challengeService.findMemberByToken(token)).willReturn(member);
        //given(challengeService.saveFile(Mockito.any(Challenge.class), file)).willReturn(challenge);
        given(storage.create(eq(blobInfo), any(InputStream.class))).willReturn(mockBlob);
        //given(storage.create(any(BlobInfo.class), any(InputStream.class))).willReturn((Blob) blobInfo);
        given(challengeRepository.save(any(Challenge.class))).willReturn(challenge);


        //when(storage.create(any(BlobInfo.class), any(InputStream.class))).thenReturn((Blob) BlobInfo.newBuilder(bucketName, fileName).setContentType("image/jpeg").build());
        //when(storage.create(any(BlobInfo.class), any(InputStream.class)))
        //        .thenReturn(mockBlob);


        // when
        ChallengeDto.Response response = challengeService.createChallenge(challenge, token, file);

        //then(memberService).should().deletePoint(member.getMemberId(), 500);
        //then(challengeRepository).should().save(any(Challenge.class));

        // then
        assertThat(response.getChallengeId(), is(equalTo(challenge.getChallengeId())));
*/
    }
    /*
    @DisplayName("create challenge test")
    @Test
    public void createChallengeTest() throws IOException {
        String token = "validToken";
        Member member = new Member();
        member.setMemberId(1);
        member.setEmail("email@email.com");
        member.setName("testMember");
        member.setPoint(1000);
        member.setPassword("password");

        Challenge challenge = new Challenge();
        challenge.setTitle("Test Challenge");

        MockMultipartFile file = new MockMultipartFile(
                "file", "test-image.jpg","image/jpeg", new byte[10]
        );

        // Mocking behavior
        //when(jwtTokenizer.getMemberId(token)).thenReturn(member.getMemberId());
        when(challengeService.findMemberByToken(token)).thenReturn(member);
        when(challengeRepository.save(any(Challenge.class))).thenReturn(challenge);
        when(jwtTokenizer.getMemberId(token)).thenReturn(1);
        when(memberService.findMemberById(1)).thenReturn(member);
        doNothing().when(challengeService.saveFile(any(Challenge.class), file));
        doNothing().when(memberService).deletePoint(member.getMemberId(), 500);

        // when
        ChallengeDto.Response response = challengeService.createChallenge(challenge, token, file);

        // then
        verify(memberService).deletePoint(member.getMemberId(), 500);
        verify(challengeRepository).save(any(Challenge.class));
     */
        /*
        // given
        Challenge challenge = new Challenge("title", "content");
        challenge.setMemberId(1);
        given(challengeRepository.findById(Mockito.any())).willReturn(Optional.of(challenge));

        // when/then
        assertThrows(BusinessLogicException.class, () -> challengeService.createChallenge(challenge));

         */
    //}
}
