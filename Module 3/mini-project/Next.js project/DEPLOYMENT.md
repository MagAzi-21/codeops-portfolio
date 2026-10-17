# Server-only secrets (Never committed to GitHub and never prefixed with NEXT_PUBLIC)
DATABASE_URL=postgres://user:password@localhost:5432/addiseats
SESSION_SECRET=strong_32_character_random_secret_key
TELEBIRR_SECRET_KEY=telebirr_live_secret_key

# Client-accessible environment variables
NEXT_PUBLIC_SITE_URL=https://addiseats.vercel.app