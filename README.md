Daily Learning Streak Tracker

Project Description

The Daily Learning Streak Tracker is a web application that helps students maintain consistent study habits by tracking their daily learning streak.

Students can mark when they studied each day and the system automatically updates their streak, total study days, and study history.

Features

- Mark "I Studied Today"
- View current study streak
- View total study days
- View last study date
- View study history

Technology Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- API Routes
- JSON file storage

Streak Logic

If a student studies on consecutive days, the streak increases.

Example:

10 March → Studied
11 March → Studied
12 March → Studied

Streak = 3

If a day is missed, the streak resets to 1.

Running the Project Locally

Install dependencies:

npm install

Run the development server:

npm run dev

Open the application in your browser:

http://localhost:3000

Deployment

The application is deployed on Vercel.

Links

GitHub Repository:
https://github.com/siricilladeepak-cmd/learning-streak-tracker

Live Application:
deepak-learning-streak-tracker.vercel.app