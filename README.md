

---

# OpenFeedback

**OpenFeedback** is a feedback management system built with Spring Boot and React. It allows users to submit feedback through a form and provides an admin panel for managing questions, viewing feedback, and monitoring key metrics through a dashboard.

## Features

- **Feedback Form**: Users can fill out and submit feedback.
- **Admin Panel**:
  - **Manage Questions**: Add, edit, and delete feedback questions.
  - **View Feedback**: Review submitted feedback.
- **Dashboard**:
  - Overview of total questions and feedback submitted.
  - Drill-down to review specific questions and their feedback.

## Tech Stack

- **Frontend**: React
- **Backend**: Spring Boot
- **Database**: MySQL
- **Others**: RESTful APIs, Axios, Bootstrap/Material-UI for UI design

## Screenshots

### Feedback Form
![Feedback Form](path/to/feedback-form-image.png)

### Manage Questions
![Manage Questions](path/to/manage-questions-image.png)

### View Feedback
![View Feedback](path/to/view-feedback-image.png)

### Dashboard
![Dashboard](path/to/dashboard-image.png)

> Replace `path/to/...` with the actual file paths for your screenshots.

## How to Run

1. Clone the repository:
   ```bash
   git clone https://github.com/Aman2809/OpenFeedback.git
   ```
2. Navigate to the project directory:
   ```bash
   cd OpenFeedback
   ```
3. **Backend Setup**:
   - Navigate to the backend folder:
     ```bash
     cd backend
     ```
   - Configure the database connection in `application.properties`.
   - Build and run the Spring Boot application:
     ```bash
     mvn spring-boot:run
     ```
4. **Frontend Setup**:
   - Navigate to the frontend folder:
     ```bash
     cd frontend
     ```
   - Install dependencies and start the development server:
     ```bash
     npm install
     npm start
     ```
5. Open your browser and navigate to `http://localhost:3000` for the frontend.

## Future Improvements

- Add user authentication for admins.
- Export feedback data as CSV or Excel.
- Implement real-time updates for feedback submissions.

## Contributing

Feel free to submit issues or feature requests. Fork the repository to make contributions and open a pull request for review.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

### Instructions for Adding Screenshots

1. Take screenshots of the pages using your browser's screenshot tool or any third-party tool.
2. Save the images in a folder named `screenshots` within the project directory.
3. Use the relative path to these images in the markdown file, e.g., `screenshots/feedback-form.png`.

