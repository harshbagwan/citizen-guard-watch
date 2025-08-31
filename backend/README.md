# Citizen Reporting Portal - Spring Boot Backend

This is the backend API for the Citizen Reporting Portal, designed to help citizens report fake banking APKs and enable cyber police to investigate and manage these reports.

## Features

- **Role-based Authentication**: Separate access for Citizens and Police Officers
- **Report Management**: Submit, view, and manage suspicious APK reports
- **File Upload**: Evidence file upload support
- **RESTful API**: Clean REST endpoints for frontend integration
- **Database Integration**: JPA/Hibernate with H2 (development) and MySQL (production)

## Tech Stack

- **Java 17**
- **Spring Boot 3.2.1**
- **Spring Security** (Authentication & Authorization)
- **Spring Data JPA** (Database operations)
- **H2 Database** (Development)
- **MySQL** (Production)
- **Maven** (Dependency management)

## Project Structure

```
src/main/java/com/portal/
├── CitizenReportingPortalApplication.java  # Main application class
├── config/
│   ├── SecurityConfig.java                 # Security configuration
│   └── DataInitializer.java               # Initial data setup
├── controller/
│   ├── AuthController.java                # Authentication endpoints
│   └── ReportController.java              # Report management endpoints
├── model/
│   ├── User.java                          # User entity
│   └── Report.java                        # Report entity
├── repository/
│   ├── UserRepository.java                # User data access
│   └── ReportRepository.java              # Report data access
└── service/
    ├── UserService.java                   # User business logic
    ├── ReportService.java                 # Report business logic
    └── CustomUserDetailsService.java      # Security user details
```

## Getting Started

### Prerequisites

- Java 17 or higher
- Maven 3.6+
- IntelliJ IDEA (recommended) or any Java IDE

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Import in IntelliJ IDEA**
   - Open IntelliJ IDEA
   - File → Open → Select the `backend` folder
   - IntelliJ will automatically detect it as a Maven project

3. **Run the application**
   ```bash
   mvn spring-boot:run
   ```
   
   Or run `CitizenReportingPortalApplication.java` directly from IntelliJ

4. **Access the application**
   - API Base URL: `http://localhost:8080`
   - H2 Console: `http://localhost:8080/h2-console`

## Default Users

The application creates default users on startup:

- **Citizen**: username: `citizen1`, password: `demo`
- **Police**: username: `officer1`, password: `demo`

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/user` - Get current user info

### Citizen Reports
- `POST /api/citizen/reports` - Submit new report
- `GET /api/citizen/reports` - Get user's reports
- `POST /api/citizen/upload` - Upload evidence file

### Police Dashboard
- `GET /api/police/reports` - Get all reports
- `GET /api/police/reports/{id}` - Get specific report
- `PUT /api/police/reports/{id}/status` - Update report status
- `GET /api/police/stats` - Get report statistics
- `GET /api/police/reports/status/{status}` - Filter by status
- `GET /api/police/reports/threat/{level}` - Filter by threat level

## Database Configuration

### Development (H2)
The application uses H2 in-memory database for development:
- URL: `jdbc:h2:mem:testdb`
- Console: `http://localhost:8080/h2-console`
- Username: `sa`
- Password: `password`

### Production (MySQL)
For production, uncomment MySQL configuration in `application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/citizen_portal
spring.datasource.username=root
spring.datasource.password=your_password
spring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect
```

## Security Features

- **BCrypt Password Encoding**
- **Role-based Access Control** (CITIZEN, POLICE)
- **CSRF Protection** (disabled for API)
- **CORS Configuration** for frontend integration
- **JWT-ready architecture** (can be extended)

## File Upload

Evidence files are stored in the `uploads/` directory:
- Maximum file size: 10MB
- Supported formats: APK, images, PDF
- Files are renamed with timestamp for uniqueness

## Testing

Run tests with:
```bash
mvn test
```

## Building for Production

1. **Create JAR file**
   ```bash
   mvn clean package
   ```

2. **Run the JAR**
   ```bash
   java -jar target/citizen-reporting-portal-0.0.1-SNAPSHOT.jar
   ```

## Environment Variables

For production deployment, set these environment variables:
```bash
SPRING_DATASOURCE_URL=jdbc:mysql://localhost:3306/citizen_portal
SPRING_DATASOURCE_USERNAME=your_username
SPRING_DATASOURCE_PASSWORD=your_password
SPRING_PROFILES_ACTIVE=production
```

## Deployment

### Local Development
```bash
mvn spring-boot:run
```

### Production Deployment
```bash
# Build the application
mvn clean package

# Run with production profile
java -jar -Dspring.profiles.active=production target/citizen-reporting-portal-0.0.1-SNAPSHOT.jar
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For questions or issues, please contact the development team or create an issue in the project repository.