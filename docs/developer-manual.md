International Snack Explorer Developer Manual
Author: Anna Wendt

International Snack Explorer is a full-stack JavaScript application that:
-Serves a frontend of static HTML/CSS/JS files located in /public
-Uses a backend API (Node + Express)
-Connects to Supabase as its database
-Is deployed on Vercel

1. How to Install the Application
-Prior to working locally, you must install:
    1. Github
    2. Node.js (Best installed using nvm, linked here: https://www.freecodecamp.org/news/node-version-manager-nvm-install-guide/)
    2. Supabase: Create a 'customer' table, with RLS disabled
-Then, you can clone the repository using:
    git clone https://github.com/awendt11/International-Snack-Explorer.git

2. Installing Dependencies
-Required dependencies are Express, Body Parser, Supabase, USA State Validator, and Dotenv
-Run these commands in the terminal to install required dependencies as listed in package.json
    1. npm install express
    2. npm install body-parser
    3. npm install @supabase/supabase-js
    4. npm i usa-state-validator
    5. npm i dotenv

3. Environment Variables
-Create a file called .env
-Inside, add:
SUPABASE_URL=your_supabase_url_here
SUPABASE_KEY=your_supabase_anon_key_here 
-You can use Supabase anon or publishable key, but make sure to keep these private!
-Then, create a file titled gitignore
-Inside, add:
.env
-This will keep your personal Supabase URL and Key private

4. Running the Application on a Server
-After installing dependencies, run:
npm start
-This will launch the Express defined in index.js and start the backend
-It should run at:
http://localhost:3000
-It automatically will
-Serve all static frontend files from /public
-Expose your API endpoints (/customers, /customer)
-Connect to your Supabase database using your environment variables

5. Deployment
When deployed to Vercel:
-Vercel will build and host your backend serverless functions.
-Your frontend files in /public are automatically served as static assets.
-The environment variables (SUPABASE_URL, SUPABASE_KEY) must be added in the Vercel project dashboard.
-Once deployed, Vercel will assign a live URL

6. Running Tests
-No automated tests were written for this
-For future developers: place all tests inside a /tests folder and document the required test commands in package.json.

7. API Documentation
GET /customers
-Returns all customer records currently stored in Supabase.
-Purpose is to retrieve customer data to display in a table on the frontend
Response Example
[
  {
    "customer_first_name": "Anna",
    "customer_last_name": "Wendt",
    "customer_state": "MD"
  }
]
Backend Logic Summary
-Calls Supabase → customer table
-select() retrieves all rows
-Sends data back as JSON

POST /customer
-Adds a new customer to the database.
Request Body Format
{
  "firstName": "Anna",
  "lastName": "Wendt",
  "state": "MD"
}
Backend Logic Summary
-Extracts firstName, lastName, and state from the request body
-Uses the usa-state-validator library to validate 2-letter state codes
-If the state is invalid → returns a 400 error
Inserts a new row into Supabase:
supabase.from("customer").insert({
  customer_first_name: firstName,
  customer_last_name: lastName,
  customer_state: state
})
Returns the inserted row as confirmation
Success Example
[
  {
    "customer_first_name": "Anna",
    "customer_last_name": "Wendt",
    "customer_state": "MD"
  }
]

8. Known Bugs & Limitations
State Validation Is Case-Sensitive
-The validator requires uppercase state abbreviations ("MD", not "md").
-Future improvement: convert input to uppercase before validation.

No API Authentication
-Any user could theoretically submit data to /customer
-Future improvement: use Supabase auth, RLS with user context, or API key gating

No Unit or API Tests
-Future developers should add automated tests for reliability.

Limited Country Data
-Future developers should expand the scope of this app

9. Roadmap for Future Development
Stability & Backend Enhancements
-Add PATCH/DELETE endpoints
-Add authentication for protected routes

Frontend Expansion
-Expand scope of data and countries available

Full Deployment Polish
-Add 404 and error pages
-Write integration tests and automate deployments

All in all, this project totally welcomes and encourages customizations and additions. Happy coding, get creative- and thanks for your help!