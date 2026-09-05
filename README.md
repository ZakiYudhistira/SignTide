# SignTide

SignTide is an interactive Indonesian Sign Language (SIBI) learning application developed for the OPSI (Olimpiade Penelitian Siswa Indonesia) competition in Indonesia.

The application combines visual learning, gamification, and guided progression to help users learn SIBI vocabulary and sentence structure.

## Functionality

- Account registration, login, protected routes, and logout.
- Guided onboarding and first-time user tutorials.
- Act- and level-based learning progression.
- Data-driven level configuration stored in TypeScript catalogs.
- Multiple problem formats, including:
  - Image-based multiple choice.
  - Image prompt with text answers.
  - Sign-to-word ordering.
  - Image-to-word line matching.
- Immediate problem feedback and level completion summaries.
- Progression tracking and XP rewards.
- Collectible ingredient rewards from completed levels.
- Act-specific cooking and reward experiences.
- Dictionary entries with visual SIBI references.
- Responsive, mobile-first layouts inspired by the target mobile experience.

## Technology Stack

- React for the component-based user interface.
- React Router Framework Mode for routing, loaders, actions, server rendering, and protected route flows.
- TypeScript for type-safe level, problem, progression, and reward configuration.
- Tailwind CSS v4 for responsive styling and reusable design utilities.
- Supabase Auth for user authentication and session management.
- Supabase Database for profiles, progression, XP, rewards, and cooking state.
- Supabase Storage for learning and game assets.
- Vite for development and production bundling.
- Netlify support for deployment.

## Project Guides

- [Configuring acts, levels, problems, rewards, and cooking](app/data/learning/ACT-README.md)

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

## Production Build

Create a production build with:

```bash
npm run build
```

Run the production server with:

```bash
npm start
```

## Configuration Notes

Learning content is configured in the `app/data` directory. New acts, levels, problems, rewards, and act-specific features should follow the conventions documented in [ACT-README.md](app/data/learning/ACT-README.md).

Supabase environment variables are required for authentication, database access, and storage asset URLs. See `.env.example` for the expected configuration.
