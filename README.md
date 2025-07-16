# ManzilYatra - Travel Bookings

### Setup in your local repo
1. **Clone the repository**
   ```bash
   git clone https://github.com/rishavgoenka/manzilyatra.git
   ```
2. **Setup frontend**
    -- move into ui folder
    ```bash
    cd ui
   ```
   -- Install dependencies
    ```bash
   npm install
   ```
   -- Run frontend server
   ``` bash
   npm run dev
   ```
   This will start the frontend at [http://localhost:5173](http://localhost:5173).
   
 3. **Backend Setup**
    -- move into server folder
    ```bash
    cd server
    ```

    -- Set up the Spring Boot project
    - Open the project in your preferred IDE (e.g., IntelliJ, Eclipse).
    - Ensure your environment includes:
        - **JDK 1.8**
         - **Maven** (for managing dependencies)

    -- Configure the backend
    - Update the `application.properties` file with your database configurations and server settings.

    --  Run the backend server
   -- Start the Spring Boot application.
   -- By default, the backend API endpoints will be available at [http://localhost:8888](http://localhost:8888).
   -- You can use postman or swagger UI using http://localhost:8888/swagger-ui/# to manage backend services.
   
## Features

* Customer, Driver and Admin authentication & validation with session UUID.
* Admin Features:
    * Administrator Role of the entire application
    * Only registered admins with valid session token can add/update/delete driver or customer from main database
    * Admin can access the details of different customers, drivers and trip bookings
* Customer Features:
    * Registering themselves with application, and logging in to get the valid session token
    * Viewing list of available cabs and booking a trip
    * Only logged in user can access his trip history, profile updation and other features.

## Contributors
  - **[@Rishav Goenka](https://github.com/rishavgoenka)**
  - **[@Biswajit Bauri](https://github.com/ACE218)**
  - **[@Ankur Kumar Chowdhary](https://github.com/ankur-47)**
  - **[@Vivek Anand](https://github.com/vivek-650)**
  - **[@Nikhil Kumar Nonia](https://github.com/nikhil6712)**

## Tech Stack
* ui - React
* server - Spring Boot
* db - MySQL
* tools - SwaggerUI, Postman

## Additional Notes

- **Frontend Port**: [http://localhost:5173](http://localhost:5173)  
- **Backend Port**: [http://localhost:8888](http://localhost:8888)  
- Ensure both the frontend and backend are running simultaneously for the application to function properly.

## ER Diagram

The following Diagram depicts the flow of our Entity Relation Diagram to simplify the work flow.  

![ER Diagram - DB Schema]()  

## Contributing

Feel free to contribute by creating a pull request. For significant changes, please open an issue first to discuss what you'd like to change.