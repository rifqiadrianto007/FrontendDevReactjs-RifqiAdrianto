# FrontendDevReactjs - Restaurant Finder

Technical Test - Front End Developer

A restaurant listing web application built using React (Vite) and
Tailwind CSS. The application consumes data from MockAPI and implements
both client-side and server-side filtering.

------------------------------------------------------------------------

## 🚀 Tech Stack

-   React (Vite)
-   React Router v6
-   Tailwind CSS
-   Axios
-   MockAPI (REST API)
-   Netlify (Deployment)

------------------------------------------------------------------------

## 📦 Environment & Versions

-   Node.js: v18+ recommended
-   React: \^18.x
-   Vite: \^5.x
-   Tailwind CSS: \^4.x

------------------------------------------------------------------------

## ⚙️ Installation & Setup

Clone repository:

    git clone https://github.com/rifqiadrianto007/FrontendDevReactjs-RifqiAdrianto.git

Navigate into the project folder:

    cd FrontendDevReactjs-RifqiAdrianto

Install dependencies:

    npm install

Run development server:

    npm run dev

Open in browser:

    http://localhost:5173

------------------------------------------------------------------------

## 🌐 Features

### Main Page

-   Restaurant listing grid
-   Load More functionality
-   Client-side filters:
    -   Open Now
    -   Price range
-   Server-side filter:
    -   Categories / Cuisine
-   Clear All filter option
-   Responsive layout

### Detail Page

-   Restaurant information
-   Review listing
-   Back navigation

------------------------------------------------------------------------

## 🗂️ Project Structure

    src/
     ├── api/
     │    └── axios.js
     ├── components/
     │    ├── RestaurantCard.jsx
     ├── pages/
     │    ├── Home.jsx
     │    └── Detail.jsx
     ├── routes/
     │    └── index.jsx
     ├── App.jsx
     └── main.jsx

------------------------------------------------------------------------

## 🔗 API Source

MockAPI (REST API)

Resources: - restaurants - reviews

Filtering logic: - Categories → server-side query - Open Now →
client-side filter - Price range → client-side filter

------------------------------------------------------------------------

## 🌍 Live Demo

Netlify URL:

https://unrivaled-gingersnap-9e1c05.netlify.app/

------------------------------------------------------------------------

## 📁 Repository

GitHub URL:

https://github.com/rifqiadrianto007/FrontendDevReactjs-RifqiAdrianto

------------------------------------------------------------------------
