package app.trip.services;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import app.trip.models.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import app.trip.exceptions.AccessDeniedException;
import app.trip.exceptions.InvalidRouteException;
import app.trip.repository.PackageRepository;
import app.trip.repository.RouteRepository;
import app.trip.repository.SessionRepository;
import app.trip.repository.TicketRepository;
import app.trip.repository.TravelRepository;
import app.trip.repository.UserRepository;



@Service
public class RouteServiceImpl implements RouteService {

	@Autowired
	RouteRepository routeRepo;

	@Autowired
	TicketRepository ticketRepo;

	@Autowired
	PackageRepository pkgRepo;

	@Autowired
	SessionRepository sessionRepo;
	
	@Autowired
	UserRepository userRepo;
	
	@Autowired
	TravelRepository travelRepo;

	/* ADMIN ONLY ACCESS */
	@Override
	public Route addRoute(Route route, String authKey) throws AccessDeniedException, InvalidRouteException {
		Route createdRoute = null;
		
		Optional<CurrentUserLoginSession> culs = sessionRepo.findByAuthkey(authKey);
		
		String userType = userRepo.findById(culs.get().getUserId()).get().getUserType();
		
		Optional<Route> optRoute = routeRepo.findById(route.getRouteId());
		
		if(optRoute.isPresent()) {
			throw new InvalidRouteException("Route No "+route.getRouteId()+" aleady exists.");
		}
		
		if(userType.equalsIgnoreCase("admin")) {
			
//			Optional<Travel> travelOpt = travelRepo.findById(travelId);
//			
//			if(travelOpt.isPresent()) {
//				Travel travel = travelOpt.get();
//				route.setTravelId(travel);				
//			}
			

			
			Set<Bus> buses=route.getTravelId().getBuses();
			for(Bus b:buses) {
				b.setTDetails(route.getTravelId());
			}
			createdRoute = routeRepo.save(route);
		} else {
			throw new AccessDeniedException("User is unauthorized for performing this function.");
		}
		
		return createdRoute;
	}

	/* ADMIN ONLY ACCESS */
	@Override
	public Route updateRoute(Route route, String authKey) throws InvalidRouteException, AccessDeniedException {
		Route updatedRoute = null;
		
		Optional<CurrentUserLoginSession> culs = sessionRepo.findByAuthkey(authKey);
		
		String userType = userRepo.findById(culs.get().getUserId()).get().getUserType();
		
		Optional<Route> optRoute = routeRepo.findById(route.getRouteId());
		
		// check if user is ADMIN
		if(userType.equalsIgnoreCase("admin")) {
			// check if route is present
			if(optRoute.isPresent()) {
				updatedRoute = routeRepo.save(route);				
			} else {
				throw new InvalidRouteException("Route No "+route.getRouteId()+" does not exists.");
				
			}
		} else {
			throw new AccessDeniedException("User is unauthorized for performing this function.");
		}
		
		return updatedRoute;
	}

	/* ADMIN ONLY ACCESS */
	@Override
	public Route removeRoute(Integer routeId, String authKey) throws InvalidRouteException, AccessDeniedException {
		Route deletedRoute = null;
		
		Optional<CurrentUserLoginSession> culs = sessionRepo.findByAuthkey(authKey);
		
		String userType = userRepo.findById(culs.get().getUserId()).get().getUserType();
		
		Optional<Route> optRoute = routeRepo.findById(routeId);
		
		// check if user is ADMIN
		if(userType.equalsIgnoreCase("admin")) {
			// check if route is present
			if(optRoute.isPresent()) {
				deletedRoute = optRoute.get();
				routeRepo.delete(optRoute.get());				
			} else {
				throw new InvalidRouteException("Route No "+routeId+" does not exists.");
				
			}
		} else {
			throw new AccessDeniedException("User is unauthorized for performing this function.");
		}
		
		return deletedRoute;
	}

	@Override
	public Route searchRoute(Integer routeId) throws InvalidRouteException {
		Route searchedRoute = null;
		
		Optional<Route> optRoute = routeRepo.findById(routeId);
		
		// check if route is present
		if(optRoute.isPresent()) {
			searchedRoute = optRoute.get();
		} else {
			throw new InvalidRouteException("Route No "+routeId+" does not exists.");	
		}
		
		return searchedRoute;
	}

	@Override
	public List<Route> viewRouteList() throws InvalidRouteException {
		List<Route> searchedRoutes = routeRepo.findAll();
		
		// check if route is present
		if(searchedRoutes.isEmpty() || searchedRoutes == null) {
			throw new InvalidRouteException("Routes do not exist.");	
		}
		
		return searchedRoutes;
	}

	@Override
	public Route bookRoute(RouteBookingDTO routeBookingDTO) throws InvalidRouteException {
		// Validate fields
		if (routeBookingDTO.getRouteFrom() == null ||
				routeBookingDTO.getRouteTo() == null ||
				routeBookingDTO.getUserId() == null ||
				routeBookingDTO.getDateOfJourney() == null) {
			throw new InvalidRouteException("All fields, including dateOfJourney, are required.");
		}

		// Map DTO to Entity
		Route route = new Route();
		route.setRoutefrom(routeBookingDTO.getRouteFrom());
		route.setRouteTo(routeBookingDTO.getRouteTo());
		route.setDateOfJourney(routeBookingDTO.getDateOfJourney().toLocalDate());
		route.setDepartureTime(routeBookingDTO.getDateOfJourney()); // Use the same or derive departure time
		route.setArrivalTime(routeBookingDTO.getDateOfJourney().plusHours(2)); // Derive arrival time
		route.setPickUpPoint("Default Pickup Point"); // Set a default or dynamic pick-up point
		route.setFare(1000); // Set fare dynamically if needed

		// Save the route
		return routeRepo.save(route);
	}
}
