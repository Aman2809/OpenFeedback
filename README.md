
---

# OpenFeedback

## Overview

**OpenFeedback** is a feedback management system designed for gathering and analyzing user feedback. The application includes a feedback form for users to submit their responses, an admin panel for managing questions and feedback, and a dashboard for monitoring key metrics. Built using **Spring Boot** for the backend and **React** for the frontend, OpenFeedback helps streamline feedback collection and analysis, making it easier for administrators to track responses and gain insights.

## Features

### Feedback Form
- Users can fill out and submit feedback for various questions.
  
### Admin Panel
- **Manage Questions**: Admins can add, update, or delete feedback questions.
- **View Feedback**: Admins can view and analyze submitted feedback from users.
  
### Dashboard
- Overview of total questions and total feedback submitted.
- Admins can review and manage specific questions and feedback responses.

## Technologies Used

### Frontend
- **React** for building the user interface.
- **Material-UI** for pre-designed components and styling.
- **Axios** for making HTTP requests.

### Backend
- **Spring Boot** for the backend REST API.
- **MySQL** for database management.
- **Spring Data JPA** for interacting with the database.

### Tools & Libraries
- **Formik** for form management.
- **Spring Security** for authentication and authorization (if needed).
- **Swagger** for API documentation.

## Screenshots

### Feedback Form
![Feedback Form](path/to/feedback-form-image.png)

### Admin Panel - Manage Questions
![Manage Questions](path/to/manage-questions-image.png)

### Admin Panel - View Feedback
![View Feedback](path/to/view-feedback-image.png)

### Dashboard
![Dashboard](path/to/dashboard-image.png)

> Replace `path/to/...` with the actual file paths for your screenshots.

## Project Structure

### Backend
- **Controller**: Handles HTTP requests and returns responses.
- **Service**: Contains business logic for feedback and question management.
- **Repository**: Interfaces with the database to fetch and store data.

### Frontend
- **components/FeedbackForm**: Handles the feedback submission form.
- **components/AdminPanel**: Displays and manages feedback and questions.
- **components/Dashboard**: Displays key metrics and overview of feedback data.

## API Endpoints

### Feedback API
- `/api/feedback`: Submit feedback.
- `/api/feedback/{id}`: Fetch feedback by ID.

### Questions API
- `/api/questions`: Add, update, or delete questions.
- `/api/questions/{id}`: Fetch question by ID.

### Dashboard API
- `/api/dashboard`: Get total questions and feedback count.

## Setup & Installation

### Clone the repository
```bash
git clone https://github.com/yourusername/OpenFeedback.git
```

### Backend Setup
1. Navigate to the backend directory.
2. Make sure you have **JDK** and **Maven** installed.
3. Update the `application.properties` file with your MySQL database credentials.
4. Run the Spring Boot application:
   ```bash
   mvn spring-boot:run
   ```

### Frontend Setup
1. Navigate to the frontend directory.
2. Install the necessary dependencies:
   ```bash
   npm install
   ```
3. Start the React application:
   ```bash
   npm start
   ```

### Access the Application
Open your browser and navigate to `http://localhost:5173` for the frontend.

## Future Enhancements
- Add user authentication and authorization.
- Implement real-time feedback tracking.
- Allow export of feedback data in CSV or Excel format.
- Mobile responsiveness and PWA capabilities.

## Contributing
Contributions are welcome! Feel free to fork the repository, submit a pull request, or open an issue to discuss changes.

## License
This project is licensed under the **MIT License**.

## Contact
For any queries or issues, feel free to contact me at [jhaaman1005@gmail.com].

---
