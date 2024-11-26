interface CourseTypes {
    title: string; // The title or name of the course
    schedule: string; // The schedule details of the course (e.g., days and times the course is held)
    term: string; // The term during which the course is offered (e.g., Fall 2024, Spring 2025)
    description: string; // A brief description or overview of the course
    prerequisite?: { courseTitle: string, grade: string }; // Optional prerequisites for the course, including:
    // - `courseTitle`: The name of the prerequisite course
    // - `grade`: The minimum grade required in the prerequisite course
    image: string; // The file path or URL to an image representing the course
}
