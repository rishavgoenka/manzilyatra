package app.trip.models;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDTO {

	private Integer userId;  // Added field for user ID
	private String email;
	private String password;
	private String name;
	private String mobile;
	private String address;
	private String userType;

	// Constructor
	public UserDTO(Integer userId, String email, String name, String mobile, String address, String userType) {
		this.userId = userId;
		this.email = email;
		this.name = name;
		this.mobile = mobile;
		this.address = address;
		this.userType = userType;
	}
}