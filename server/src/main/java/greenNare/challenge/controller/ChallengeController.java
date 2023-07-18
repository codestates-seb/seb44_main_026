package greenNare.challenge.controller;

import greenNare.Response.MultiResponseDto;
import greenNare.Response.SingleResponseDto;
import greenNare.challenge.dto.ChallengeDto;
import greenNare.challenge.entity.Challenge;
import greenNare.challenge.mapper.ChallengeMapper;
import greenNare.challenge.service.ChallengeService;
import greenNare.place.entity.Place;
import greenNare.utils.UriCreator;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/nare")
@Validated
@Slf4j
@CrossOrigin(origins = "*")
//@EnableWebMvc
public class ChallengeController {
    private final static String CHALLENGE_DEFAULT_URL = "/nare";
    private final ChallengeService challengeService;
    private final ChallengeMapper mapper;

    public ChallengeController(ChallengeService challengeService, ChallengeMapper mapper) {
        this.challengeService = challengeService;
        this.mapper = mapper;
    }

    @GetMapping("/challenge") // 챌린지 전체 조회
    public ResponseEntity getChallenges(final Pageable pageable) {
        //Page<Object[]> response = challengeService.getAllChallengeWithUsername(pageable);
        Page<Challenge> challengePage = challengeService.getChallengesPage(pageable);
        List<ChallengeDto.PageResponse> response = challengeService.getChallenges(pageable);
        log.info("!!!! getChallenges 완료");
        return new ResponseEntity<>(new MultiResponseDto<>(response, challengePage), HttpStatus.OK);
    }

    @GetMapping("/{challengeId}") // 챌린지 상세 조회
    public ResponseEntity getChallenge(@PathVariable("challengeId") long challengeId) {
        ChallengeDto.Response response = challengeService.getChallenge(challengeId);
        return ResponseEntity.ok(new SingleResponseDto<>(response));
    }

    @PostMapping("/challenge") // 챌린지 생성
    public ResponseEntity postChallenge(@Valid @RequestPart(required = false) ChallengeDto.Post requestBody,
                                        @RequestPart(required = false) MultipartFile image,
                                        @RequestHeader(value = "Authorization", required = false) String token) throws Exception, IOException {
        Challenge createdChallenge = challengeService.createChallenge(mapper.challengePostDtoToChallenge(requestBody));
        Challenge saveImg  = challengeService.saveImage(createdChallenge, image);

        ChallengeDto.Response response = mapper.challengeToChallengeResponseDto(saveImg);//, token);
        //response.setName(challengeService.findWriter(response.getChallengeId()));

        //URI location = UriCreator.createUri(CHALLENGE_DEFAULT_URL+"/challenge/", createdChallenge.getChallengeId());
        //HttpHeaders headers = new HttpHeaders();
        //headers.setLocation(location);

        //return ResponseEntity.status(HttpStatus.CREATED).headers(headers).body(new SingleResponseDto<>(response));

        return new ResponseEntity<>(new SingleResponseDto<>(saveImg), HttpStatus.CREATED);
    }

    @PatchMapping("/{challengeId}") // 챌린지 수정
    public ResponseEntity patchChallenge(@PathVariable("challengeId") long challengeId,
                                         @Valid @RequestPart(required = false) ChallengeDto.Patch requestBody,
                                         @RequestPart(required = false) MultipartFile image,
                                         @RequestHeader(value = "Authorization", required = false) String token) throws IOException {
        Challenge patch = mapper.challengePatchDtoToChallenge(requestBody);

        ChallengeDto.Response response = challengeService.updateChallenge(patch, challengeId, image);
        //challengeService.saveImage(updateChallenge, image)

        return ResponseEntity.ok(new SingleResponseDto<>(response));
    }

    @DeleteMapping("/{challengeId}") // 챌린지 삭제
    public ResponseEntity deleteChallenge(@PathVariable("challengeId") long challengeId,
                                          @RequestHeader(value = "Authorization", required = false) String token){
        challengeService.deleteChallenge(challengeId, token);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
