# Technical Documentation

## Introduction

### 1.1 Purpose

Housing4Hopkins aims to streamline the process of finding off-campus housing and foster open discussions about different housing options. We created this app because we noticed that many JHU students – ourselves included – feel uninformed and unprepared when searching for housing. They often rely on word-of-mouth recommendations, as accessing transparent rental info and vetted student reviews for various housing options is challenging. As a result, students settle for subpar housing with issues like poor utilities or high rent. In addition, there is a gap in communication between students seeking housing and those who already have it but are looking for roommates and subletters. With around 1,500 rising juniors at JHU entering the housing market this year, we created an app that would help students find the best possible housing arrangements, as this greatly impacts their college experience and overall well-being. 

### 1.2 Scope

Housing4Hopkins contains off-campus housing information near the JHU Homewood campus, exclusively serving JHU students. Our app include a catalog of apartments and vetted student reviews, a feed for students to post about roommate openings and available sublets, a customizable user profile indicating housing and lifestyle preferences, and an email feature for user communication. Our app is designed to assist students in finding housing during their time at JHU, focusing on short-term housing needs and not long-term arrangements, which are beyond our app’s scope.

### 1.3 Audience

Our app serves JHU students either seeking off-campus housing or have it but need to find roommates or subletters.

## System Overview

### 2.1 Architecture

### 2.2 Technologies Used

### 2.3 Dependencies

## Installation Guide

### 3.1 Prerequisites

### 3.2 System Requirements

### 3.3 Installation Steps

## Configuration Guide

### 4.1 Configuration Parameters

### 4.2 Environment Setup

### 4.3 External Services Integration

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

### 7.3 Relationships and Constraints

## Testing

### 8.1 Test Plan

### 8.2 Test Results

### 8.3 Known Issues and Limitations

## Deployment

### 9.1 Deployment Process

## Glossary

### 10.1 Terms and Definitions

### 11.2 Change Summary

## Glossary

### 12.1 Terms and Definitions
