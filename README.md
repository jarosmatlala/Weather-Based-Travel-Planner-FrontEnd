# Weather Application Frontend
This is the frontend of a weather application that provides users with the current weather and forecast for cities around the world. It allows users to register, log in, and save their favorite locations.
## Features
- **User Authentication**: Register and log in to save favorite locations.
- **Weather Data**: View current weather and 5-day forecast for any city.
- **Weekly and Hourly Forecast**: Get detailed weekly and hourly weather data with suggestions for activities.
- **Favorites**: Save locations to your favorites list.
## Technologies Used
- **React**: JavaScript library for building the user interface.
- **React Router**: To handle routing and navigation between components.
- **Redux**: For global state management (e.g., storing user data).
- **Axios**: To make HTTP requests to the weather API.
- **CSS**: For styling the application.
## Setup
1. Clone the repository:
    ```
        git clone https://github.com/jarosmatlala/Weather-Based-Travel-Planner-FrontEnd.git
    ```
2. Navigate into the project directory:
    ```
    cd "Weather Traveller"
    ```
3. Install dependencies:
    ```
    npm install
    ```
4. Create a .env file in the root directory and add your OpenWeatherMap API key:
    ```
    REACT_APP_API_KEY=your-openweathermap-api-key
    ```
5. Run the application:
    ```
        npm start
    ```
The application should now be running at http://localhost:3000.
## Application Structure
- **src/**: Contains all the source code files for the application.
- **components/**: Contains reusable components such as LogIn, WeatherScr, Registration, etc.
- **assets/**: Contains image assets like weather icons and background images.
- **redux/**: Contains Redux-related files for state management (if applicable).
- **App.js**: The main React component that holds all routes and logic.
- **index.js**: The entry point of the React application.
## Routes
The following routes are available in the application:
- `/login`: Log in to your account.
- `/registration`: Register for a new account.
- `/WeatherScr`: View the current weather for a city.
- `/Weekly`: View the weekly forecast of the city.
- `/hourly/:day`: View hourly forecast for a specific day of the week.
- `/favourites`: View a list of your favorite cities.
## Components
1. **LogIn**:
- Allows the user to log into their account using email and password.
- On successful login, the user is redirected to the main weather page.
2. **WeatherScr**:
- Allows the user to search for a city and view current weather data.
- Displays temperature, humidity, wind speed, and suggestions for activities based on the weather.
- Allows users to switch between Celsius and Kelvin temperature units.
3. **Registration**:
- A form for new users to register with their name, email, and password.
- On successful registration, the user is redirected to the login page.
4. **Weekly**:
- Displays the 5-day weather forecast for the searched city.
- Allows users to click on each day to see hourly forecasts with activity suggestions based on the weather conditions.
5. **Hourly**:
- Displays detailed hourly weather data for a specific day, including the time, temperature, and weather description.
- Offers activity suggestions based on the weather conditions at each hour.
6. **Favourites**:
- Displays a list of cities the user has saved as favorites.
- Allows users to view weather data for their saved locations.
## API Endpoints
The frontend interacts with the following backend endpoints:
- **POST** `/api/users/register`: Registers a new user.
- **POST** `/api/users/login`: Logs in a user.
- **POST** `/api/favourites/save`: Saves a location to the user's list of favorites.