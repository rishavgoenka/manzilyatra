
# ManzilYatra

Welcome to **ManzilYatra**! Follow the steps below to set up the **frontend** and **backend** on your local machine.



## Frontend Setup (React)

1. **Clone the repository**
   ```bash
   git clone https://github.com/rishavgoenka/ManzilYatra-FE.git
   cd ManzilYatra-FE
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```
   This will start the frontend at [http://localhost:5173](http://localhost:5173).



## Backend Setup (Spring Boot)

1. **Clone the repository**
   ```bash
   git clone https://github.com/rishavgoenka/ManzilYatra-BE.git
   cd ManzilYatra-BE
   ```

2. **Set up the Spring Boot project**
   - Open the project in your preferred IDE (e.g., IntelliJ, Eclipse).
   - Ensure your environment includes:
     - **JDK 1.8**
     - **Maven** (for managing dependencies)

3. **Configure the backend**
   - Update the `application.properties` file with your database configurations and server settings.

4. **Run the backend server**
   - Start the Spring Boot application.
   - By default, the backend API endpoints will be available at [http://localhost:8888](http://localhost:8888).
   - You can use postman or swagger UI using http://localhost:8888/swagger-ui/# to manage backend services.

---

## Additional Notes

- **Frontend Port**: [http://localhost:5173](http://localhost:5173)  
- **Backend Port**: [http://localhost:8888](http://localhost:8888)  
- Ensure both the frontend and backend are running simultaneously for the application to function properly.

---

### Contributing

Feel free to contribute by creating a pull request. For significant changes, please open an issue first to discuss what you'd like to change.