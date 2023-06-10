- [Calorie Counter App](#calorie-counter-app)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation and Setup](#installation-and-setup)
- [Usage](#usage)

# Calorie Counter App

The Calorie Counter App is a web application built using React, Vite, Node.js, MySQL, Python, Flask, SQLAlchemy, and JWT authentication. It helps users track their daily calorie intake and nutritional information by logging their meals and retrieving data from external APIs. The app also includes a weight logging feature for users to track their weight over time. The logged data is saved to the database and can be retrieved and displayed on the user's dashboard.

# Features

- Meal Logging: Users can log their meals, including food ingredients and quantities, to track their calorie intake.
- External API Integration: The app integrates with external APIs, such as Spoontacular, to fetch detailed nutritional information for food ingredients.
- Weight Logging: Users can enter their weight for a particular day and track their weight over time.
- Database Storage: Logged meals and weight data are stored in a MySQL database using SQLAlchemy for efficient retrieval and analysis.
- User Authentication: The app employs JWT authentication with access and refresh tokens to secure user accounts and protect sensitive data.
- Personalized Dashboard: Users have access to a personalized dashboard where they can view their logged meals, weight history, nutritional statistics, and progress towards their dietary goals.

# Tech Stack

The Calorie Counter App is built using the following technologies:

- React
- Vite
- Node.js
- MySQL
- Python
- Flask
- SQLAlchemy
- JWT Authentication
- ApexCharts
- Spoontacular API

# Installation and Setup

To run the applocally, follow these steps:

1. Clone the repository: git clone <https://github.com/byeonkho/calorie-counter>
2. Navigate to the project directory: cd calorie-counter-app
3. Make sure you have MySQL installed on your machine before proceeding with the installation.
4. Install dependencies for the front-end: npm install
5. Install dependencies for the back-end: pip install -r requirements.txt
6. Set up the MySQL database and configure the database connection in your .env file. You may choose to use the dbexport.sql file to seed your database.
7. Generate JWT secret keys and update the configuration in your .env file.
8. Start the front-end development server: npm run dev
9. Start the back-end server: python main.py
10. Open your web browser and access the app at your localhost.

# Usage

1. Sign up for a new account or log in if you already have one.
2. Explore the app's features, such as searching for food ingredients, logging meals, and entering weight data.
3. Use the personalized dashboard to track your calorie intake, monitor nutritional statistics, and view your weight history.
4. Log out when you're done using the app to secure your account.
