package greenNare.place.repository;

import greenNare.place.entity.Place;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PlaceRepository extends JpaRepository<Place, Integer> {

    Optional<Place> findByLatAndLongi(double lat, double longi);
}
