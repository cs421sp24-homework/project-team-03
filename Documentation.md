# Technical Documentation

## Introduction

### 1.1 Purpose

Housing4Hopkins aims to streamline the process of finding off-campus housing and foster open discussions about different housing options. We created this app because we noticed that many JHU students – ourselves included – feel uninformed and unprepared when searching for housing. They often rely on word-of-mouth recommendations, as accessing transparent rental info and vetted student reviews for various housing options is challenging. As a result, students settle for subpar housing with issues like poor utilities or high rent. In addition, there is a gap in communication between students seeking housing and those who already have it but are looking for roommates and subletters. With around 1,500 rising juniors at JHU entering the housing market this year, we created an app that would help students find the best possible housing arrangements, as this greatly impacts their college experience and overall well-being. 

### 1.2 Scope

Housing4Hopkins contains off-campus housing information near the JHU Homewood campus, exclusively serving JHU students. Our app include a catalog of apartments and vetted student reviews, a feed for students to post about roommate openings and available sublets, a customizable user profile indicating housing and lifestyle preferences, and an email feature for user communication. Our app is designed to assist students in finding housing during their time at JHU, focusing on short-term housing needs and not long-term arrangements, which are beyond our app’s scope.

More info here: https://github.com/cs421sp24-homework/project-team-03/blob/main/Specification.md

### 1.3 Audience

Our app serves JHU students either seeking off-campus housing or have it but need to find roommates or subletters.

## System Overview

### 2.1 Architecture

### 2.2 Technologies Used

### 2.3 Dependencies

## Installation Guide

(Only for running locally)

### 3.1 Prerequisites

- Node.js and pnpm: Ensure that Node.js and npm (Node Package Manager) are installed on your system. You can download and install them from the official Node.js website.
- Git: Git version control system should be installed on your machine to clone the project repository.
- IDE or Text Editor: Have an Integrated Development Environment (IDE) or a text editor installed for writing code. Popular choices include Visual Studio Code, WebStorm, or Sublime Text.
- Knowledge of TypeScript: Basic understanding of TypeScript, as the project is written in TypeScript (TSX).
- Database: Docker and PostgreSQL is needed. 

### 3.2 System Requirements

- Operating System: The application should be compatible with major operating systems like Windows, macOS, and Linux.
- Hardware Requirements: This project should be able to run on basic hardware with no extra CPU, RAM, or disk space needed.

### 3.3 Installation Steps

The steps for installing the prerequisites are availables on the softwares' respective sites. 

## Configuration Guide

### 4.1 Configuration Parameters

(Only for Local)

To run locally, paste the following two lines into your environment variables file /app/.env and /api/.env

Supabase URL: https://rmpdscekiuormnkxpubi.supabase.co

Supabase Anonymous Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJtcGRzY2VraXVvcm1ua3hwdWJpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE5MTM3NjUsImV4cCI6MjAyNzQ4OTc2NX0.Fl9exVy8x-y0y8SINCtwHWZR6n_WrsAn1UUlm_oo6zU

There is also an example .env file for users to fill out)

### 4.2 Environment Setup

**Running Deployed App**

- Go to https://cs421sp24-homework.github.io/project-team-03/

**Running App Locally**

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

**If you are trying to run tests locally:**

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

### 4.3 External Services Integration

Important Links:

Deployed Front-end: https://cs421sp24-homework.github.io/project-team-03/

Deployed Back-end: https://project-team-03-1adv.onrender.com

Git repo: https://github.com/cs421sp24-homework/project-team-03

Local Front-end website: http://localhost:5173/project-team-03/

## Usage Guide

### 5.1 User Interface Overview

Upon entering the app, users will land on the Catalog page, which provides information on off-campus apartments near JHU. To the right of the catalog, there are "Register" and "Login" buttons. On the left side of the catalog, there is a sidebar. When a user is not logged in, the sidebar will display three icons (Home, Paper & Pencil, Question Mark). When the user is logged in, the sidebar will contain five icons:
- Home: Clicking on this icon will take the user to the catalog
- Paper & pencil: Directs the user to the Feed
- User: Directs the user to their profile
- Bell: Indicates the number of new email notifications when clicked
- Question mark: When clicked, a dialog box appears for the user to email the app admin with questions or concerns

### 5.2 User Authentication

To access the Feed, view and add apartment reviews, and see new email notifications, the user must have an account and be logged in. To create an account, the user can click on the “Register” button. After registering, the user will receive a verification email containing a token and a link. They need to enter the token to verify their account. Once verified, the user can successfully log in.

### 5.3 Core Functionality

Housing4Hopkins contains three main features or views – catalog, feed, and user profile.

Catalog: 
- This page contains a list of 24 off-campus apartments with basic information on each, including address, distance from campus, price, rating, and number of reviews. The user can search for a specific apartment using the search bar at the top of the page. They can also filter apartments by distance away from campus and price. Clicking on one of the apartments in the list will direct the user to a page containing reviews for that apartment. A user can upvote a review, and users can sort reviews by popularity (based on number of upvotes) or recency.

Feed: 
- On this page, students can post about available sublets, roommate openings, or their housing needs. The user can search for specific listings using the search bar at the top of the page. 

User profile:
- Users can customize their housing and lifestyle preferences on their profile. Additionally, their reviews, favorited housings, and favorited posts will be visible on their profile. Users can view other profiles by clicking on a name in a review or a post, and they can contact other users via email through their profiles.

### 5.4 Advanced Features

Map
- Using the Google Maps API, the app showcases a map on the catalog page with markers indicating the location of each apartment. Hovering over a marker will display information about the corresponding apartment. Users can access "Street View" by dragging the yellow person icon located in the bottom right corner of the map to view the apartment and its surroundings. Clicking on a marker will redirect the user to the apartment's individual page with reviews.
- If you click on the “Subletting” header on the Feed, the user will be redirected to a page containing a map with markers indicating the location of apartments available for sublet.

Aggregate Review
- When a user clicks on an apartment in the catalog, they are directed to a page with reviews for that housing. Using the Chat Completions API by OpenAI, the app generates an aggregate review on this page summarizing all the key ideas from every review of the apartment. The aggregate review will update each time a review is added or deleted.

Nearby Locations
- When a user clicks on an apartment in the catalog, they are directed to a page with reviews on that housing. Using the Maps API and Places API by Google, the app shows the location of the housing on a map, as well as nearby grocery stores. Below the map, the three closest grocery stores to the apartment are listed, along with their address, rating, and distance. Users can also use a dropdown menu to select different tags to display on the app, such as restaurants, parks, cafes, or bakeries.

Email
- When a user clicks on the email icon on another user’s profile, a dialog box will appear, asking them to enter their name, email address, and the title and content of the message. After the user clicks “Submit”, an email will be sent to the other user. This is achieved using the SMPT2GO API.
- When a user clicks on the question mark icon on the sidebar, a dialog box will appear, allowing the user to send questions or concerns to the app administrators.

## API Documentation (if applicable)

### 6.1 Endpoints

### 6.2 Request and Response Formats

### 6.3 Authentication and Authorization

## Database Schema (if applicable)

### 7.1 Entity-Relationship Diagram

### 7.2 Table Definitions
#### 7.2.1 `FAVORITE_HOUSING` Table
<!-- &nbsp; -->
<!-- &ensp; -->
Each row represents an instance of a `user` favoriting/bookmarking a `housing` item.

```SQL
create table if not exists public.favorite_housing
(
    id          uuid default uuid_generate_v4() not null
        constraint "PK_1f6a7eee915d27e7392aaaec8af"
            primary key,
    "housingId" varchar                         not null,
    "userId"    integer                         not null
        constraint "FK_ec47e13fad342a40bdcb914343d"
            references public."user"
            on delete cascade
);
```

#### 7.2.2 `FAVORITE_POST` Table
Each row represents an instance of a `user` favoriting/bookmarking a `post`.
```SQL
create table public.favorite_post
(
    id       uuid default uuid_generate_v4() not null
        constraint "PK_2643df4f83c97f24e261cbee403"
            primary key,
    "postId" varchar                         not null,
    "userId" integer                         not null
        constraint "FK_7b6615d620f9df3df2e8bf19a7e"
            references public."user"
            on delete cascade
);
```

#### 7.2.3 `HOUSING` Table
Each row represents a `housing` item display on the Housing Catalog.
```SQL
create table if not exists public.housing
(
    id                uuid          default uuid_generate_v4()     not null
        constraint "PK_fac21a104febb2697b71464c579"
            primary key,
    name              varchar                                      not null,
    address           varchar                                      not null,
    latitude          numeric(10, 6)                               not null,
    longitude         numeric(10, 6)                               not null,
    "imageURL"        varchar,
    price             varchar       default '$'::character varying not null,
    distance          numeric(6, 1)                                not null,
    "avgRating"       numeric(2, 1) default '0'::numeric           not null,
    "reviewCount"     integer       default 0                      not null,
    "aggregateReview" varchar
);
```

#### 7.2.4 `REVIEW` Table
Each row represents a `user` created `review` attached to a `housing` item.
```SQL
create table if not exists public.review
(
    id            uuid                     default uuid_generate_v4() not null
        constraint "PK_2e4299a343a81574217255c00ca"
            primary key,
    content       varchar                                             not null,
    timestamp     timestamp with time zone default now()              not null,
    rating        integer,
    "upvoteCount" integer                  default 0                  not null,
    "likedBy"     integer[]                default '{}'::integer[]    not null,
    "userId"      integer                                             not null
        constraint "FK_1337f93918c70837d3cea105d39"
            references public."user"
            on delete cascade,
    "housingId"   uuid                                                not null
        constraint "FK_af3bc9030295aba59581ab279cb"
            references public.housing
            on delete cascade
);
```

#### 7.2.5 `POST` Table
Each row represents a `user` created `post`.
```SQL
create table if not exists public.post
(
    id        uuid                     default uuid_generate_v4() not null
        constraint "PK_be5fda3aac270b134ff9c21cdee"
            primary key,
    title     varchar                                             not null,
    content   varchar                                             not null,
    timestamp timestamp with time zone default now()              not null,
    cost      integer                                             not null,
    address   varchar                                             not null,
    "userId"  integer                                             not null
        constraint "FK_5c1cf55c308037b5aca1038a131"
            references public."user"
            on delete cascade,
    type      varchar                                             not null
);
```

#### 7.2.6 `POST_IMAGE` Table
Each row represents metadata of an image that is either attached to a `post` or marked for soft-delete.
```SQL
create table if not exists public.post_image
(
    id          uuid                     default uuid_generate_v4() not null
        constraint "PK_0c74d0ac8869bc3a3cbaa3ec55d"
            primary key,
    url         varchar                                             not null,
    path        varchar                                             not null,
    "postId"    uuid
        constraint "FK_668c9fb892f2accb872670c7b1e"
            references public.post
            on delete set null,
    "deletedAt" timestamp,
    timestamp   timestamp with time zone default now()              not null
);
```

#### 7.2.7 `USER` Table:
Each row represents a registered `user` of the app.
```SQL
create table if not exists public."user"
(
    id                  serial
        constraint "PK_cace4a159ff9f2512dd42373760"
            primary key,
    password            varchar               not null,
    email               varchar               not null
        constraint "UQ_e12875dfb3b1d92d7d7c5377e22"
            unique,
    avatar              varchar,
    "firstName"         varchar               not null,
    "lastName"          varchar               not null,
    "isEmailVerified"   boolean default false not null,
    "verificationToken" varchar,
    bio                 varchar,
    notifications       integer default 0     not null,
    age                 varchar,
    gender              varchar,
    major               varchar,
    "gradYear"          varchar,
    "stayLength"        varchar,
    budget              varchar,
    "idealDistance"     varchar,
    "petPreference"     varchar,
    cleanliness         varchar,
    smoker              varchar,
    "socialPreference"  varchar,
    "peakProductivity"  varchar
);
```

### 7.3 Relationships and Constraints
**<u>Entity Relationships</u>**
1) `FavoriteHousing` to `User`
    * Many-to-one relationship where every record of 'favorited housing' belongs to one user, but a user can favorite multiple housings.
    * Foreign Key `onDelete` behavior: `CASCADE` (when a user gets deleted, all of their favorited housings also get deleted)

2) `FavoritePost` to `User`
    * Many-to-one relationship where every record of 'favorited post' belongs to one user, but a user can favorite multiple posts.
    * Foreign Key `onDelete` behavior: `CASCADE` (when a user gets deleted, all of their favorited posts also get deleted)

3) `Review` to `User`
    * Many-to-one relationship where each review belongs to one user, but a user can create multiple reviews.
    * Foreign Key `onDelete` behavior: `CASCADE` (when a user gets deleted, all of their reviews also get deleted)

4) `Review` to `Housing`
    * Many-to-one relationship where each review is attached to one housing, but a housing can have multiple reviews attached.
    * Foreign Key `onDelete` behavior: `CASCADE` (when a housing gets deleted, all associated reviews also get deleted)

5) `Post` to `User`
    * Many-to-one relationship where each post is authored by one user, but a user can author multiple posts.
    * Foreign Key `onDelete` behavior: `CASCADE` (when a user gets deleted, all of their posts also get deleted)

6) `PostImage` to `Post`
    * Many-to-one relationship where each post-image belongs to one post, but a post can have multiple images.
    * Foreign Key `onDelete` behavior: `SET NULL` (to support soft-delete/batch-delete of images stored in external storage, associated images get "orphaned" and marked for delete in the next batch-delete cycle when their associated post(s) gets deleted)

**<u>Table Constraints</u>**
1) `FAVORITE_HOUSING` table
    * Primary Key: `id`
    * Foreign Key: `userId` (refers to `id` column of user who favorited a housing)
    * NOT NULL: `id`, `housingId`, `userId`
2) `FAVORITE_POST` table
    * Primary Key: `id`
    * Foreign Key: `userId` (refers to `id` column of user who favorited a post)
    * NOT NULL: `id`, `postId`, `userId`
3) `HOUSING` table
    * Primary Key: `id`
    * NOT NULL: `id`, `name`, `address`, `latitude`, `longitude`, `price`, `distance`, `avgRating`, `reviewCount`, `aggregateReview`
4) `REVIEW` table
    * Primary Key: `id`
    * Foreign Keys:
        * `userId` (refers to `id` column of user that created this review)
        * `housingId` (refers to `id` column of housing item this review belongs to)
    * NOT NULL: `id`, `content`, `timestamp`, `upvoteCount`, `likedBy`, `userId`, `housingId`
5) `POST` table
    * Primary Key: `id`
    * Foreign Key: `userId` (refers to `id` column of user that created this post)
6) `POST_IMAGE` table
    * Primary Key: `id`
    * Foreign Key: `postId` (refers to `id` column of post this image belongs to)
7) `USER` 
    * Primary Key: `id`
    * NOT NULL: `id`, `email`, `firstName`, `lastName`, `isEmailVerified`, `notifications`
    * UNIQUE: `email`

## Testing

### 8.1 Test Plan

### 8.2 Test Results

### 8.3 Known Issues and Limitations

## Deployment

### 9.1 Deployment Process

## Glossary

### 10.1 Terms and Definitions
Off-campus Housing: Housing accommodations located outside the university campus premises, often rented or leased by students attending the university.

Catalog: A comprehensive list or database containing information about available off-campus apartments, including details such as address, price, distance from campus, and reviews.

Feed: A feature within the application allowing users to post and view information about roommate openings, sublets, and housing needs.

User Profile: A personalized section within the application where users can customize their preferences, view their activity history, and manage their account settings.

User Authentication: The process of verifying the identity of users accessing the application through email verification and a unique username/password.

Prerequisites: Necessary conditions or requirements that must be met before installing and running the application, including software dependencies and knowledge prerequisites.

Environment Variables: Configurable parameters used to customize the behavior of the application in different environments, such as development, testing, and production.

Unit Testing: Testing method focusing on individual units or components of the software to ensure their correctness and functionality.

End-to-End (E2E) Testing: Testing method examining the entire application workflow from start to finish to validate its behavior and performance.

Database Schema: A blueprint or structural design that outlines the organization of data in a database system, including tables, fields, relationships, and constraints.

Entity-Relationship Diagram (ERD): A visual representation of the entities (objects or concepts) within a database system and the relationships between them, typically depicted using symbols and connecting lines.

Relationships and Constraints: Rules and associations that govern the interactions and dependencies between entities in a database, ensuring data integrity and consistency. Examples include foreign key constraints and one-to-many relationships

### 11.2 Change Summary

Iteration 1:
Date: 2/19/2024 - 3/2/2024

Description:
- Added functionality for JHU students to view a catalog of off-campus housing options.
- Implemented posting and verification process for new housing items on the catalog.
- Introduced feed feature for viewing and posting about roommate openings or sublets.
- Enabled JHU email authentication for accessing catalog and feed listings.
  
Future Plans: Further enhancements and refinements based on user feedback.

Iteration 2:
Date: 3/4/2024 - 3/16/2024

Description:
- Implemented review system for cataloged apartments.
- Enabled users to read, write, and delete reviews.
- Added filtering options for housing options on the catalog and feed.
- Integrated map feature for visualizing apartment locations on the catalog.
- Introduced profile viewing for potential roommate matching.
- Utilized ChatGPT for generating concise summaries of apartment reviews.
  
Future Plans: Addressing any identified issues and exploring additional improvements.

Iteration 3:
Date: 3/25/24 - 4/6/2024

Description:
- Implemented sorting options for reviews by popularity and recency.
- Integrated aggregation of apartment reviews with ChatGPT.
- Introduced functionality for sending emails to users from their profiles.
- Implemented email verification for user registration.
- Enabled users to edit their posts.
- Added photo upload feature for posts.
  
Future Plans: Continuing to iterate based on user feedback and considering additional enhancements.

Iteration 4:
Date: 4/8/2024 - 4/28/2024

Description:
- Introduced functionality for users to request addition of apartment listings via email.
- Integrated display of nearest grocery stores and cafes for user convenience.
- Refactored post creation process for flexibility and improved user experience.
- Enhanced user profiles to include review history and personal information.
- Implemented favoriting feature for posts and housing items.
  
Future Plans: Evaluating user reception and feedback for further iterations and enhancements.

## Glossary

### 12.1 Terms and Definitions
