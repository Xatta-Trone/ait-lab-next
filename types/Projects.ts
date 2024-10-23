interface ProjectTypes {
    title: string;                // Title of the project
    description: string;          // Description of the project
    link: string;                 // Link to the project (can be an empty string)
    PI: string;                   // Principal Investigator's name
    budget: string;               // Budget for the project
    PI_role: "PI" | "Co-PI";      // Role of the Principal Investigator (can be either PI or Co-PI)
    start_year: number;           // Start year of the project
    end_year: number;             // End year of the project
    status: "completed" | "ongoing"; // Status of the project (can be either completed or ongoing)
    image: string;                // Image file name related to the project
  }