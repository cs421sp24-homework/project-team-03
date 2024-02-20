# Software Requirement Specification

## Problem Statement
Many students find it difficult to find suitable off-campus housing due to limited information and relying on word-of-mouth recommendations. Because of this, students settle for subpar housing and face issues finding roommates or sublets. Additionally, accessing rent information and student reviews on various housing options is challenging, and landlords find it hard to effectively reach the student community with available listings.


## Proposed Solution
Our app aims to centralize the process of searching for off-campus housing. The goal of the app is to facilitate an open dialogue about various housing options through honest and detailed ratings and reviews submitted by students. Additionally, the app will include a feed that gives students and landlords the ability to post about available listings, sublets, and openings for roommates. Through the app, students can make more informed housing decisions instead of relying on purely word-of-mouth recommendations.

## Potential Clients
- JHU Students → easily learn about various off-campus housing options through student reviews; post about available listings, sublets, or openings for roommates on the feed
- Landlords and owners → can advertise available listings on the feed


## Functional Requirements

Must-haves

- As a JHU student, I want to log in with my @jhu email, so I am able to post apartment reviews and listings on the feed. (This will ensure the credibility of reviews and listings)
- As a JHU student, I want to view a visually-appealing catalog of off-campus apartments and row homes, so that I can easily explore my housing options near campus.
- As a JHU student, I want to filter housing options by cost and location, so that I can find accommodations that best fit my budget and preferred area.
- As a JHU student, I want to read apartment reviews written by other students, so that I can make informed decisions based on peer experiences.
- As a JHU student, I want to sort reviews by relevance, popularity, and recency, and upvote helpful ones, so that I can quickly find the most useful information.
- As a JHU student, I want to view a concise summary of an apartment based on aggregated reviews with ChatGPT’s help, so that I can get quick insights into what to expect from different housing options.
- As a JHU student, I want to see the locations of apartments on a map and view an overlay of safety ratings across different areas, so that I can identify housing options in safe areas relative to campus.
- As a JHU student, I want to post on a feed and view posts about looking for roommates or needing to sublet apartments, so that I can find or offer housing solutions conveniently.

Nice-to-haves

- As a JHU student, I want to be able to click on the profile of a landlord or student who posted a listing on the feed and send them an email through a form on the app, so that I can communicate with them directly.
- As a JHU student, I want to email a request to the app creators to add in another apartment listing by filling out a form in the app, so that catalog of apartments is exhaustive of all options.
- As a parent or prospective JHU student, I want to log in as a guest to explore off-campus housing options and the feed, to assist in planning for future accommodation needs.
- As a JHU student, I want to view and access profiles of other students for potential roommate matching, so that I can find compatible living partners.

## Software Architecture & Technology Stack

Type of Application: Web Application

Frontend:
- Framework: Framework: Vite + React to create the user-interface
- Styling: Tailwind CSS for utility-first styling, ensuring a responsive and visually appealing design.
- State management: Zustand

Backend:
- API: Nest.js to provide a modular structure, and easy database support.
- Authentication: JWT strategy which uses JSON Web Tokens, neatly contains a lot of features of authentications

Database:
- Primary: PostgreSQL database with Docker, Postman for testing authentication data and general data (Testing)
- ORM: TypeORM for database interactions and tests
  
Deployment:
- Front-end: deployment using Vite and hosting on GitHub pages
- Back-end & database: Render but backup option is Heroku
- Database: Render but backup option is Supabase

Additional Technologies:
- Version Control: Git and GitHub for version control and collaborative development.
- Testing Frameworks: Jest for unit and end-to-end testing for the front-end and back-end. Additionally, React Testing Library for front-end.


## Similar Existing Apps

- Roomies.com → not specific to JHU students; lack of open dialogue through reviews, ratings, and feed where users can interact with each other and landlords
- JHU Off-campus Housing Portal → lack of open dialogue through reviews, ratings, and feed where users can interact with each other and landlords;
- Apartments.com → not specific to JHU; lack of open dialogue through reviews, ratings, and feed where users can interact with each other and landlords
- Our app differs from the platforms listed above because it provides an exhaustive catalogue of off-campus housing options specifically for JHU students who may otherwise learn of housing through word-of-mouth recommendations. The catalogue includes apartment reviews by JHU students, providing relatable, first-hand experiences to assist in housing decisions. Additionally, our app has a feed that gives JHU students the opportunity to learn about sublets, openings for roommates, and available listings in real-time, ensuring that students have the latest information when making housing decisions.
