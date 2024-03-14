# Take Home - AuxHealth
Take home asssessment for AuxHealth

The application is built using React with TypeScript for the frontend and Python with FastAPI for the backend.

## Features

- Display a list of posts with patient descriptions and assessments
- Infinite scroll functionality to load more posts as the user scrolls
- Interaction with posts through "Hug" and "Comment" buttons
- Updating backend data when a post receives a "Hug", or when a new comment is added
- Displaying a thread of comments for each post

## Prerequisites

Before running the application, ensure you have the following installed:

- Node.js (version 14 or above)
- npm (version 6 or above)
- Python (version 3.7 or above)
- FastAPI (version 0.68.0 or above)

## Backend Setup

1. Navigate to the backend directory:
```
cd server/
```

2. Create a virtual environment (recommended):
```
python -m venv venv
#or
python3 -m venv venv
```
3. Activate the virtual environment:

  For Windows:
  ```
  venv\Scripts\activate
  ```
  For macOS and Linux:
 
  ```
  source venv/bin/activate
  ```
4. Install the required Python packages:
```
pip install fastapi uvicorn
#or 
pip3 install fastapi uvicorn
```
6. Start the FastAPI server
```
uvicorn src.main:app --reload 
```

7. In a separate terminal, navigate to the frontend directory:
```
cd client/
```
8. Install dependencies
```
npm install
```
9. Start development server
```
npm run dev
```
The frontend application will run on `http://localhost:5173`.

## Project Structure

The project is organized into two main directories:

`server`: Contains the FastAPI backend code and mock data
- `main.py`: The main FastAPI application file
- `data/data.json`: Mock data file containing post and comment information

`client`: Contains the React frontend code
- `src/components`: Contains the main React components
  - `PostList.tsx`: Displays the list of posts
  - `Post.tsx`: Displays an individual post with its details and comments
- `src/hooks`: Contains custom hooks used in the application
  - `useInfiniteScroll.ts`: Implements the infinite scroll functionality
    - *Note: A 1 second timeout was implemented to mimic any potential network latency and to highlght that posts are fetched dynamically as the user     scrolls, rather then rendering all at once. 
  - `useHugs.ts`: Handles the "Hug" functionality for a post
  - `useComments.ts`: Handles the "Comment" functionality for a post
- `src/utils`: Contains utility functions
  - `api.ts`: Defines the API endpoints and functions for making requests to the backend
- `src/types.ts`: Defines the TypeScript types and interfaces used in the application

## API Endpoints

The backend API exposes the following endpoints:

- `GET /api/posts`: Retrieves a list of posts starting from the specified **startIndex** and limited by the **limit** parameter.
- `PUT /api/posts/{postUrl}/hugs`: Updates the number of "Hugs" for a specific post identified by **postUrl**.
- `POST /api/posts/{postUrl}/comments`: Adds a new comment to a specific post identified by **postUrl**.

## Additional Notes

- The application uses Material-UI for styling and UI components.
- The frontend and backend communicate using HTTP requests.
- The mock data is stored in the `data/data.json` file in the backend directory. Modifications made to the posts and comments will be persisted in this file.

