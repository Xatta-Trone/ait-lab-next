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
