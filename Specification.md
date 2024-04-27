# Software Requirement Specification

## Problem Statement
Many students find it difficult to find suitable off-campus housing due to limited information and relying on word-of-mouth recommendations. Because of this, students settle for subpar housing and face issues finding roommates or sublets. Additionally, accessing rent information and student reviews on various housing options is challenging, and students find it hard to effectively reach the JHU community with available listings.


## Proposed Solution
Our app aims to centralize the process of searching for off-campus housing. The goal of the app is to facilitate an open dialogue about various housing options through honest and detailed ratings and reviews submitted by students. Additionally, the app will include a feed that gives students the ability to post about available listings, sublets, and openings for roommates. Through the app, students can make more informed housing decisions instead of relying on purely word-of-mouth recommendations.

## Potential Clients
- JHU Students → easily learn about various off-campus housing options through student reviews; post about available listings, sublets, or openings for roommates on the feed


## Functional Requirements

Must-haves

- As a JHU student, I want to view a catalog of off-campus apartments and row homes, so that I can easily explore my housing options near campus.
- As a developer of the app, I want to post new housing item on the Catalog that are verified by us, so that users can view and review them.
- As a JHU student, I want to view posts on the feed about looking for roommates or needing to sublet apartments, so that I can find or offer housing solutions conveniently.
- As a JHU student, I want to post on a feed about looking for roommates or needing to sublet apartments, so that I can find or offer housing solutions conveniently.
- As a JHU student, I want to log in with my @jhu email, so I am able to view the catalogue and listings on the feed. (This will ensure the credibility of reviews and listings)
- As a JHU student, I want to view reviews on apartments on the catalogue, so that I can make informed decisions based on peer experiences.
- As a JHU student, I want to read, write, and delete a review on an off-campus housing option on the catalog, so I can share my first-hand experiences with others.
- As a JHU student, I want to filter housing options by cost or distance on the catalog and type and cost on the feed, so that I can find accommodations that best fit my budget and preferred area.
- As a JHU student, I want to see the locations of apartments on the catalog page on a map, so that I can visually identify where housing is relative to campus.
- As a JHU student, I want to view and access profiles of other students for potential roommate matching, so I can learn more about the person who may have posted on the feed or wrote a review.
- As a JHU student, I want to view a concise summary of reviews on an apartment based on aggregated reviews with ChatGPT’s help, so that I can get quick insights into what to expect from different housing options.
- As a JHU student, I want to sort reviews by popularity, and recency, and upvote helpful ones, so that I can quickly find the most useful information.
- As a JHU student, I want to view a concise summary of reviews on an apartment based on aggregated reviews with ChatGPT’s help, so that I can get quick insights into what to expect from different housing options.
- As a JHU student, I want to be able to edit my posts.

Nice-to-haves

- As a JHU student interested in a listing, I want to be able to click on that person's profile and send them an email in the app through an option on their profile, so that I can communicate with them directly.
- As a JHU student, when I register my email will be verified by an email being sent to me so that only verified JHU students can log in.
- As a JHU student, I want to be able to add photos to my posts so other users can see the space I’m subletting and have it show up on the posts feed.
- As a JHU student, I want to send a request to the app developers (us) to add in another apartment listing by emailing them.
- As a JHU student, I want to see the nearest grocery stores and cafes, so that I can easily find convenient shopping and dining options close to my potential housing.
- As a JHU student, when creating a post I want to see the options of what kind of post I will create and then after choosing I will be able to fill out a tailored form for that option.
- As a JHU Student, I want to view the reviews I’ve written on my profile and include personal information (i.e. grad year) on my profile as well.
- As a JHU Student, I want to favorite posts and housing items and have my liked items shown on my profile.

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
- Server-side: Render
- Database/Storage: Supabase

Additional Technologies:
- Version Control: Git and GitHub for version control and collaborative development.
- Testing Frameworks: Jest for unit testing, Cypress for end-to-end testing


## Similar Existing Apps

- Roomies.com → not specific to JHU students; lack of open dialogue through reviews, ratings, and feed where users can interact with each other and landlords
- JHU Off-campus Housing Portal → lack of open dialogue through reviews, ratings, and feed where users can interact with each other and landlords;
- Apartments.com → not specific to JHU; lack of open dialogue through reviews, ratings, and feed where users can interact with each other and landlords
- Our app differs from the platforms listed above because it provides an exhaustive catalogue of off-campus housing options specifically for JHU students who may otherwise learn of housing through word-of-mouth recommendations. The catalogue includes apartment reviews by JHU students, providing relatable, first-hand experiences to assist in housing decisions. Additionally, our app has a feed that gives JHU students the opportunity to learn about sublets, openings for roommates, and available listings in real-time, ensuring that students have the latest information when making housing decisions.
