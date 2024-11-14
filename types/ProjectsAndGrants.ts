interface ProjectTypes {
    number: string;                // Project number
    title: string;                 // Title of the project
    description: string;           // Description of the project
    link: string;                  // Link to the project (can be an empty string)
    sponsor: string;               // Sponsor of the project
    PI: string;                    // Name of Principal Investigator
    PI_role:  "PI" | "Co-PI" | "Instructional PI" | "Key Researcher";              // Role of the Principal Investigator
    start_date: { year: number, month: string }; // Start year and month of the project
    end_date: { year: number, month: string };   // End year and month of the project
    status: "completed" | "ongoing"; // Status of the project
    image: string;                 // Image file name related to the project
  }
  
  interface GrantTypes {
    title: string;                // Title of the grant
    description: string;          // Description of the grant
    link: string;                 // Link to the grant (can be an empty string)
    PI: string;                   // Principal Investigator's name
    budget: string;               // Budget for the grant
    PI_role: "PI" | "Co-PI";      // Role of the Principal Investigator (PI or Co-PI)
    start_year: number;           // Start year of the grant
    end_year: number;             // End year of the grant
    status: "completed" | "ongoing"; // Status of the grant (completed or ongoing)
    image: string;                // Image file name related to the grant
  }
  
  interface ProjectsAndGrantsTypes {
    projects: ProjectTypes[];     // Array of projects
    grants: GrantTypes[];         // Array of grants
  }
  