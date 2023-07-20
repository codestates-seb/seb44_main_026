package greenNare.place.mapper;

import greenNare.place.dto.PlaceDto;
import greenNare.place.entity.Place;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface PlaceMapper {
    Place placePostDtoToPlace(PlaceDto.Post placePostDto);
    //List<Place> placesToPlacesResponseDto();
    PlaceDto.Response placeToPlaceResponseDto(Place place);
}
