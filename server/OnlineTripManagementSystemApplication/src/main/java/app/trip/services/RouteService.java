package app.trip.services;

import java.util.List;

import app.trip.exceptions.AccessDeniedException;
import app.trip.exceptions.InvalidRouteException;
import app.trip.models.Route;
import app.trip.models.RouteBookingDTO;

public interface RouteService {
	
	/* ADMIN ONLY ACCESS */
	public Route addRoute(Route route, String authKey) throws AccessDeniedException, InvalidRouteException;
	
	/* ADMIN ONLY ACCESS */
	public Route updateRoute(Route route, String authKey) throws InvalidRouteException, AccessDeniedException;
	
	/* ADMIN ONLY ACCESS */
	public Route removeRoute(Integer routeId, String authKey) throws InvalidRouteException, AccessDeniedException;
	
	public Route searchRoute(Integer routeId) throws InvalidRouteException;
	
	public List<Route> viewRouteList() throws InvalidRouteException;

	Route bookRoute(RouteBookingDTO routeBookingDTO) throws InvalidRouteException;
	
}
