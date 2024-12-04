# Update Content Documentation

This guide explains how to manage the content for the AIT Lab website, including adding, updating, or deleting data stored in the `data/` directory. The content is primarily managed using JSON files, and this guide ensures consistency and avoids breaking changes.

---

## **Directory Overview**

The `data/` directory contains structured JSON files that store the content for various sections of the website. Below are the key files and their purposes:

- **`courses.json`**: Data for the courses offered by AIT Lab.
- **`stock_projs_grants.json`**: Combined data for projects and grants.
- **`team.json`**: Data for current team members.
- **`alumni.json`**: Details of lab alumni.
- **`fellow.json`**: Data for fellows associated with AIT Lab.
- **`news.json`**: Recent news articles related to AIT Lab.
- **`navLinks.json`**: Navigation links for the website.
- **`lab_tools.json`**: Data for lab tools related to AIT Lab.

---

## **Adding New Data**

### 1. **Add a New Course**

- **File**: `courses.json`
- **Steps**:
  1. Open `data/courses.json`.
  2. Add a new course object with the following format:
     ```json
     {
       "title": "CE 4361. Highway Engineering",
       "schedule": "MW 5:00-6:20 pm CST",
       "term": "Fall 2022",
       "description": "This course covers alignment, interchange, construction, and maintenance issues related to highways. Topics include cross-sections, horizontal and vertical alignment, sight distance, pavement design, drainage analysis, traffic engineering, highway capacity, and construction materials. The analysis of data obtained from sensing devices during construction or use of a highway is also discussed.",
       "prerequisite": {
         "courseTitle": "CE 3360",
         "grade": "C"
       },
       "image": "DALL·E 2024-11-25 15.24.27 - A book cover mockup featuring a modern and sleek design for a textbook titled 'Highway Engineering - CE 4361'. The cover includes a visually appealing.webp"
     }
     ```
  3. Save the file.
  4. Add images to `public/img/courses/`.

### 2. **Add a New Project**

- **File**: `stock_projs_grants.json`
- **Steps**:
  1. Open `data/stock_projs_grants.json`.
  2. Add a new project object:
     ```json
     {
       "number": "Syn 56-05",
       "title": "Traffic Analysis Practices for Non-Motorized Modes (Vulnerable Road Users)",
       "description": "The objective of this synthesis is to document the current state of the traffic analysis practice (not limited to the deterministic methods such as HCM) for non-motorized modes (or multimodal analysis).",
       "link": "https://apps.trb.org/cmsfeed/TRBNetProjectDisplay.asp?ProjectID=5716",
       "sponsor": "NCHRP",
       "PI": "Subasish Das",
       "PI_role": "PI",
       "start_date": {
         "year": 2024,
         "month": "October"
       },
       "end_date": {
         "year": 2025,
         "month": "October"
       },
       "status": "ongoing",
       "image": "traffic-lights-6908699_640.jpg"
     }
     ```
  3. Save the file.
  4. Add the images to `/public/img/stock_projs/`.

### 3. **Add a New News**

- **File**: `news.json`
- **Steps**:
  1. Open `data/news.json`.
  2. Add a new news object:
     ```json
     {
       "title": "New Paper Published",
       "description": "A Survey on Kolmogorov-Arnold Network - Shriyank Somvanshi, Syed Aaqib Javed, Md Monzurul Islam, Diwas Pandit, Subasish Das",
       "date": "November 12, 2024",
       "link": "https://arxiv.org/abs/2411.06078"
     }
     ```
  3. Save the file.

---

## **Updating Existing Data**

### General Steps

1. Open the relevant JSON file in the `data/` directory.
2. Locate the item you want to update.
3. Modify the required fields. For example:
   - Update the `status` of a project:
     ```json
     "status": "completed"
     ```
   - Change a team member's role:
     ```json
     "label": "Ph.D. Student"
     ```
4. Save the file.

---

## **Deleting Existing Data**

### General Steps

1. Open the relevant JSON file in the `data/` directory.
2. Locate the object you want to delete.
3. Remove the object, ensuring you don't leave trailing commas in the JSON array.
   - Example:
     ```json
     [
       {
         "title": "Course 1"
       },
       {
         "title": "Course 2"
       }
     ]
     ```
     If you delete "Course 1", the result should look like:
     ```json
     [
       {
         "title": "Course 2"
       }
     ]
     ```
4. Save the file.

---

## **Best Practices**

1. **Validation**:
   - Use a JSON linter or IDE extensions to validate the JSON format after editing.
   - Ensure there are no duplicate entries.
2. **Image Uploads**:
   - Add any new images referenced in the data to the `public/img/` directory.
3. **Testing**:
   - Test the changes locally by running the development server (`yarn dev` or `npm run dev`) to ensure the updates reflect correctly.
4. **Version Control**:
   - Commit the changes to the version control system (e.g., Git) with a meaningful message like:
     ```
     git add data/projects.json
     git commit -m "Added AI in Traffic Systems project"
     git push
     ```

---

## **Adding New Data Types**

If you need to manage a new type of data:

1. **Create a New JSON File**:
   - Example: `data/awards.json`.
2. **Define the Structure**:
   - Create a sample structure:
     ```json
     [
       {
         "title": "Best AI Lab 2024",
         "organization": "Tech Awards",
         "year": 2024,
         "description": "Awarded for excellence in AI research."
       }
     ]
     ```
3. **Integrate the New Data**:
   - Update the relevant components in `components/` or create new ones to display this data.
4. **Test the Integration**:
   - Test the feature locally to ensure it works as expected.
