interface ProjectTypes {
  number: string;         // Project number
    title: string;                // Title of the project
    description: string;          // Description of the project
    link: string;                 // Link to the project (can be an empty string)
    sponsor: string;              // Sponsor of the project
    PI: string;                        // Name of Principal Investigator
    PI_role: PI_role; // Role of the Principal Investigator
    start_date: {year: number, month: string};           // Start year of the project
    end_date: {year: number, month: string};             // End year of the project
    status: "completed" | "ongoing"; // Status of the project
    image: string;                // Image file name related to the project
  }
  
type PI_role = `PI` | `Co-PI` | `Instructional PI` | `Key Researcher`; 