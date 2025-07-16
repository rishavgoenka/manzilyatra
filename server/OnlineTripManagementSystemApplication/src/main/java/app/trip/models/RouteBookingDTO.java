package app.trip.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RouteBookingDTO {
    private String routeFrom;
    private String routeTo;
    private Integer userId;
    private LocalDateTime dateOfJourney;
}