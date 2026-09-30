# Shruti Tiwari — Portfolio

A responsive React + Vite portfolio with a curated featured-project section and a live GitHub repository section.

## Run locally
1. Install Node.js (LTS) from https://nodejs.org/
2. Extract this ZIP and open the folder in VS Code.
3. Open the terminal in the project folder and run:

   ```bash
   npm install
   npm run dev
   ```

4. Open the local URL shown by Vite (usually http://localhost:5173).

## Personalize before publishing
- `src/App.jsx`: update `GITHUB_USERNAME` if your username changes.
- Replace `your.email@example.com` with your professional email.
- Replace the generic LinkedIn URL with your profile.
- Review featured project repository names and descriptions. A missing repository still shows a link built from the configured repository name; update it if your repo slug differs.
- Update internship and education details if needed.

## GitHub API
The portfolio calls the public endpoint:
`https://api.github.com/users/ShrutiTiwari2005/repos?per_page=100&sort=updated`

No password or personal access token is used. Only public, non-fork repositories are shown in “More repositories”. GitHub may apply unauthenticated API rate limits; the page displays a message if the request is rate-limited.

## Deploy
You can deploy the `dist` folder after running `npm run build`, or connect the repository to Vercel / Netlify and use:
- Build command: `npm run build`
- Output directory: `dist`
