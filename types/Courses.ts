interface CourseTypes {
    title: string;
    schedule: string;
    term: string;
    description: string;
    prerequisite: {courseTitle: string, grade: string}
}