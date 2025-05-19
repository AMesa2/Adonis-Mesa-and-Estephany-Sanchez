# Adonis-Mesa-and-Estephany-Sanchez

🍿 What’s This Project About?
Movie Explorer is a website that helps people find movies and TV shows they’ll enjoy. With so many streaming platforms and options out there, it can be hard to decide what to watch. Our site makes it easier by showing trending content, letting users search by name or genre, and saving shows to a personal watchlist. We use the IMDb-API to get all our movie and TV show info.

📁 What Each File Does
homepage.html – The main page. Shows popular movies and TV shows and lets users search or go to other pages.

about.html – Explains what the site does and why it was made. Includes charts showing movie and TV show genres.

watchlist.html – Shows the user’s saved list of movies and TV shows.

styles.css – Makes the website look good. Handles layout, colors, fonts, and how things look on phones, tablets, or computers.

about.js – JavaScript file that creates the genre charts on the About page using Chart.js.

script.js (optional) – Can be used for features like searching or updating the watchlist.

🛠️ Tools We Used
Tool	What It’s For
HTML	Builds the structure of each webpage
CSS	Styles and lays out the pages
JavaScript	Adds interactive features and gets API data
Chart.js	Creates pie and bar charts for the About page
IMDb-API	Gives info about movies and TV shows

✨ Features
🔍 Search for movies and TV shows

🎥 See what’s trending

📊 View charts showing popular genres

✅ Save titles to a watchlist

📱 Works on phones, tablets, and computers

🔗 Developer Manual
Prerequisites:
Node.js (v14 or above)
npm (Node Package Manager)
Supabase account (for database storage)
Git (for version control)

🔄 Installation Steps:
Clone the Repository:
git clone https://github.com/your-username/movie-explorer.git
cd movie-explorer
Install Dependencies:
npm install
Configure Environment Variables: Create a .env file in the root of your project with the following:
VITE_SUPABASE_URL=https://your-supabase-url.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_SIMKL_CLIENT_ID=your-simkl-client-id
Set Up Supabase:
Log in to Supabase.
Create a new project.
Set up a table named watchlist with columns:
id (UUID, Primary Key)
title (Text)
type (Text)
poster (Text)
simkl_id (Text)
date_added (Timestamp)
Run the Application:
npm run dev
Navigate to http://localhost:5173 in your browser.
Build for Production:
npm run build
npm run preview

🚀 Deployment
To deploy this application, you can use Vercel or Netlify:
Push your code to a GitHub repository.
Link your repository to Vercel or Netlify.
Set environment variables in the dashboard for:
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
VITE_SIMKL_CLIENT_ID
Deploy the site and access it from the generated URL.

📂 File Structure
├── index.html
├── styles.css
├── supabaseClient.js
├── api.js
├── home.js
├── watchlist.js
├── about.js
├── watchlist.html
├── about.html
└── README.md

🛠️ Technologies Used
HTML5 & CSS3 for the user interface.
JavaScript (ES6) for logic and API handling.
Supabase for real-time database storage.
Simkl API for fetching movie and TV show data.
Vite for fast development build.

