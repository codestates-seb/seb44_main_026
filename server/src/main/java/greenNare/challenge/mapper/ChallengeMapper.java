package greenNare.challenge.mapper;

import greenNare.challenge.dto.ChallengeDto;
import greenNare.challenge.entity.Challenge;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ChallengeMapper {
    ChallengeDto.Response challengeToChallengeResponseDto(Challenge challenge);
    List<ChallengeDto.Response> challengesToChallengeResponseDtos(List<Challenge> challenges);

    Challenge challengePostDtoToChallenge(ChallengeDto.Post challengePostDto);

}
