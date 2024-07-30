# Remosto

## Overview

The web-based user interface using [Next.js](https://nextjs.org/) and [Tailwind CSS](https://tailwindcss.com/) that will run on a robot/stop display with a screen size of 1920x1080.

## Requirement

- NodeJS v20.9.0
- Chrome v119.0.6045.160
- Screen Resolution 1920x1080 (16:9)
- Git

## Project Structure

```
.
├── public/
│   └── assets/
│       ├── images/
│       ├── icons/
│       └── logos/
├── src/
│   ├── app/
│   │   ├── api/
│   │   └── ...
│   ├── components/
│   ├── enum/
│   ├── sections/
│   ├── services/
│   └── utils/
├── Dockerfile
├── package.json
├── next.config.json
└── tailwind.config.js
```

## Public Asset

Contains all the assets needed to create a website display.

## app

Contains all the code and page routes. there is page.js which functions to display the main page or menu selection place.

### api

Folder to provide routes or endpoints that ai models can use to send user-type data useful for improving user experience and corresponding recommendation menus.

### animals

Folder for animal menu pages including detail pages, feedback, videos, and other animal views.

### public-facilities

Folder for public facility menu pages including detail pages, feedback, and other facility views.

### food-store

Folder for food store menu pages including detail pages, feedback, and other store views.

### maps

Folder for map page routes, where all information is displayed on the map. Users can search for facilities, animals, shops, view locations, and customized recommendations. Users can also customize the map size for clarity of search locations.

## Components

Contains code for creating components that can be reused on multiple pages.

| Component          | Description                                                                                          |
| ------------------ | ---------------------------------------------------------------------------------------------------- |
| Button             | Custom button component that can be clicked by the user.                                             |
| Card               | A card-shaped component that displays brief information about an item.                               |
| Error-fetch        | The component that handles the display when there is an unsuccessful data retrieval from the server. |
| Footer             | Footer component that is used on every page except the main one as an aid to user navigation.        |
| Navigation-tracker | Component applied to the layout to keep track of each route that the current user visits.            |
| Session-modal      | Component that handles the display when the user does not respond within 20 seconds.                 |
| Video-player       | Component that handles the display of pages that need to show videos.                                |

## Run the Project Locally

Follow these steps to run the project on your local machine:

1. Clone the repository

   ```sh
   git clone https://github.com/Veda50/remosto-fe.git
   ```

2. Install the dependencies

   ```sh
   npm install
   ```

3. Start the development server

   ```sh
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) to see the result

## Deployment

Follow these steps to deploy the application on Vercel:

1. Ensure you have the [Vercel CLI](https://vercel.com/docs/cli) installed.

2. Log in to your Vercel account

   ```sh
   vercel login
   ```

3. Deploy the application by running
   ```sh
   vercel              # for development deployment
   # or
   vercel --prod       # for production deployment
   ```
4. Add the environment variable to your deployment, you can do this in the project settings on Vercel. See this [guide](https://vercel.com/docs/projects/environment-variables) for more details
