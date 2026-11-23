# Evolve LifeOS

AI Life System - Phase 1

This is NOT a productivity app.

This is NOT a habit tracker.

This is an AI-powered Life Operating System inspired by RPG progression, but it must have its own original identity and design.

IMPORTANT

Do NOT copy Solo Leveling's branding, names, artwork, UI, or intellectual property.

Instead, create an original futuristic operating system that gives the feeling of an intelligent AI companion helping users grow in real life.

The design language should feel premium, minimal, futuristic, and immersive.

Use dark mode by default.

Accent colors:

Electric Blue

Cyan

Violet

Smooth animations.
Glassmorphism.
Rounded cards.
Modern typography.

Build ONLY the following screens.

1. Splash Screen

Display an animated logo.

Show the app name:

LifeOS

Tagline:

"Become who you're meant to become."

After a few seconds navigate to onboarding.

2. Onboarding

Create four beautiful onboarding pages explaining:

Page 1
Your life becomes measurable.

Page 2
Complete real-world quests.

Page 3
Grow your real skills.

Page 4
An AI mentor evolves with you.

Buttons:

Skip

Next

Get Started

3. Authentication

Allow:

Email Sign In

Google Sign In

Create Account

Forgot Password

Modern authentication UI.

4. First-Time Setup

After login ask:

What do you want to become?

Examples:

AI Engineer

Software Developer

Entrepreneur

Designer

Doctor

Student

Athlete

Creator

Allow custom goals.

Then ask:

Which skills would you like to improve?

Examples:

Programming

Communication

Fitness

Reading

Leadership

Discipline

Money

Languages

Allow multiple selections.

Then ask:

How many hours can you invest daily?

30 minutes

1 hour

2 hours

3+ hours

Finally show:

"Generating your Life System..."

with an elegant loading animation.

5. Home Screen

Create a beautiful futuristic dashboard.

Display:

Welcome message

Current Level

XP Progress Bar

Current Rank

Today's Main Quest

Daily Streak

Skill Overview

Recent Achievements

Quick Action button

The screen should feel alive through subtle animations without becoming distracting.

IMPORTANT

Do NOT implement:

Quest logic

AI

Database

Notifications

XP calculations

Skill Trees

Inventory

Shops

Boss Battles

Any backend functionality

Only create the UI and navigation flow for these screens using reusable components and clean project structure.

The goal of Phase 1 is to establish the visual identity and user experience of the application.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Service configuration

Copy `.env.example` to `.env` and fill in your own service settings. The app uses Supabase directly for authentication and data. Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` for the browser build, and `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY` on the server. Use a Supabase project you control and apply the SQL migrations in `supabase/migrations` when provisioning a new database. Existing data must be migrated separately.

Enable the Google provider in Supabase with your Google OAuth credentials. Register Supabase's callback URL with Google and allow your site's `/auth` URL in Supabase's redirect settings.

For AI, set server-only `AI_API_KEY`, `AI_BASE_URL` (an OpenAI-compatible API endpoint), and `AI_MODEL`. Without these settings, AI features return an unavailable status. Never prefix the API key with `VITE_`.

Run `npm run build` to produce the Nitro server output. Deploy it to your own hosting environment and configure the variables there. External editor synchronization and GitHub App access must be disconnected in the account settings separately; removing repository code does not revoke installed applications.
