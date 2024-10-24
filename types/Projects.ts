interface ProjectTypes {
    title: string;                // Title of the project
    number: string;         // Project number
    description: string;          // Description of the project
    link: string;                 // Link to the project (can be an empty string)
    sponsor: string;              // Sponsor of the project
    budget: string;               // Budget for the project
    PI: string;                        // Name of Principal Investigator
    PI_role: PI_role; // Role of the Principal Investigator
    start_year: number;           // Start year of the project
    end_year: number;             // End year of the project
    status: "completed" | "ongoing"; // Status of the project
    image: string;                // Image file name related to the project
  }
  
type PI_role = `PI` | `Co-PI` | `Instructional PI`;