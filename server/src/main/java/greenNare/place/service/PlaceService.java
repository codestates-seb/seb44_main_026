package greenNare.place.service;

import greenNare.config.SecurityConfiguration;
import greenNare.exception.BusinessLogicException;
import greenNare.exception.ExceptionCode;
import greenNare.place.dto.PlaceDto;
import greenNare.place.entity.Place;
import greenNare.place.repository.PlaceRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service

public class PlaceService {
    private final PlaceRepository placeRepository;

    public PlaceService(PlaceRepository placeRepository) {
        this.placeRepository = placeRepository;
    }

    public Place createPlace(Place place) {//, String token) {
        verifyExistsPlace(place.getLat(), place.getLongi());

        /*
        String memberEmail = jwtTokenizer.getUsername(token)
        Member member = findByEmail(memberEmail)
        Long id = member.getId()
        Long point = member.getPoint()
        challenge.setMemberId(id);
         */
        /*
        Place place1 = Place.builder()
                .placeName(place.getPlaceName())
                .lat(place.getLat())
                .longi(place.getLongi())
                //.memberId(1L)
                .build();
         */
        place.setMemberId(1L);
        return placeRepository.save(place);
    }

    public List<Place> getPlaces() {
        return placeRepository.findAll();
    }
    public void deletePlace(long placeId){//, String token) {
        /*
        String memberEmail = jwtTokenizer.getUsername(token)
        Member member = findByEmail(memberEmail)
        Long id = member.getId()
         */
        long memberId = 1L;
        validateWriter(memberId, placeId);
    }

    public void verifyExistsPlace(double lat, double longi) {
        boolean exist = placeRepository.findByLatAndLongi(lat, longi).isPresent();
        if (exist) throw new BusinessLogicException(ExceptionCode.PLACE_EXIST);
    }
    public void validateWriter(long memberId, long placeId) {
        Optional<Place> place = placeRepository.findById(placeId);
        if(memberId != place.get().getMemberId()){
            throw new BusinessLogicException(ExceptionCode.WRITER_NOT_MATCHED);
        }
    }
}
