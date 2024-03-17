# APARTMENT

## Important Links

- Deployed Front-end: https://cs421sp24-homework.github.io/project-team-03/

- Deployed Back-end: https://project-team-03-1adv.onrender.com

- Git repo: https://github.com/cs421sp24-homework/project-team-03

- Local Front-end website: http://localhost:5173/project-team-03/


## Testing User Stories

As a developer of the app, I want to post new housing item on the Catalog that are verified by us, so that users can view and review them.
- Run the app locally based on the instructions in the README
- Open Postman and send a POST API request (http://localhost:3000/housings) with the following raw JSON body:

ex:
{
  "name": "The Telephone Building",
  "address": "220 E 31st St, Baltimore, MD 21218",
  "latitude": 39.326039,
  "longitude": -76.613711,
  "imageURL": "https://images1.apartments.com/i2/CAPTa-6eDPAAcVm7GqFyGvD6tv1beHZoJ-7_L7mbrtQ/111/the-telephone-building-baltimore-md-primary-photo.jpg",
  "price": "$$$",
  "distance": 0.6
}

- You should see a new housing item appear on the front-end

## Running Deployed App

- Go to https://cs421sp24-homework.github.io/project-team-03/

## Running App Locally

Pre-requisites:
- Set up DataGrip by installing it and launching the application on your laptop.

Run App (Frontend, Backend, Database):
1. Clone this repository.
2. Open the terminal at the root of the repository.
3. Install dependencies with `pnpm install`.
4. Run `pnpm docker:up` to start database container.
5. Run `pnpm start:api` to start API.
6. Run `pnpm start:app` to start frontend/client application.
7. Alternatively, use `pnpm start:all` to run `pnpm start:api` and `pnpm start:app` concurrently. 
If this command causes an error indicating "concurrently" not found, try running `pnpm install -g concurrently` or 
`npm install -g concurrently` and try again.
### If you are trying to run tests locally:
Unit Testing (The backend - jest):
1. `cd api` into the api folder
2. Run `pnpm run test` to run all the unit tests
3. Run `pnpm run test:cov` to check the coverage of the files

E2E Testing (The frontend - cypress):
- Note: You must be locally running the app (docker up, start:all, and you must run the sql script in Datagrip) in order for the cypress tests to work
1. `cd app` into the api folder
2. Run `pnpm run cy:open` to open the cypress testing app
3. Click the e2e testing configured and choose your preferred browser to run the test
4. You should be able to see all the spec files. Scroll down and Navigate to the `housing-app-e2e` folder.
5. Click each of the spec.cy.ts files in the folder, and the tests will run automatically.

Populate Housing Catalog (follow instruction only when running app locally!)
1. Open DataGrip and navigate to File > New > Data Source > PostgreSQL > PostgreSQL (avoid selecting "PostgreSQL via CloudSQL Proxy" option). This action should trigger a window titled "Data Sources and Drivers" to appear.
2. Open your .env file located in the api folder using VSCode or your preferred source-code editor.
3. Review the contents of the .env file and accordingly update the corresponding properties in the "Data Sources and Drivers" window as follows:
- Host: [Value of DB_Host in .env]
- Port: [Value of DB_PORT in .env]
- User: [Value of DB_USER in .env]
- Password: [Value of DB_PASSWORD in .env]
- Database: [Value of DB_NAME in .env]
4. Confirm the changes by clicking "OK"
5. A tab labeled with the prefix "console" (e.g., console postgres-db@localhost) will appear. Paste the housing data into this console.
- Housing Data: https://docs.google.com/document/d/13HGQMnyzpOj_O-C2aN4iwqeuD3EgJPusuBpESF52PdE/edit 
6. Execute the command by clicking the green "play" arrow.
7. Refresh the browser displaying the application.

Please refer to this video if you're having trouble with DataGrip:

https://drive.google.com/file/d/1OOWeng-A5xdPBd20GfNWG1vAfQJu-Ouf/view?usp=sharing


## Notes
- Please wait around a minute to get the backend up when viewing deployed app. 
Render slows down with inactivity and needs time to boot back up. 
- Markers will not show up on LOCAL unless page is refreshed after the inital page load. 
However, they work completely fine on the deployed app. 

