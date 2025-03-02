# PWA Check-in App

A Progressive Web App (PWA) built with Next.js that provides check-in functionality with offline support and API integration.

## Features

- **Progressive Web App**: Works offline and can be installed on mobile devices
- **Check-in Functionality**: Record your location with timestamps
- **Offline Support**: Continue using the app even without an internet connection
- **Data Synchronization**: Automatically syncs data when back online
- **Responsive Design**: Works on desktop and mobile devices

## Technologies Used

- Next.js
- TypeScript
- Tailwind CSS
- next-pwa (for PWA capabilities)
- GitHub Pages (for hosting)

## Getting Started

### Development

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/pwacheckin.git
   cd pwacheckin
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

To create a production build:

```bash
npm run build
```

The static files will be generated in the `out` directory.

## Deployment to GitHub Pages

This project is configured to automatically deploy to GitHub Pages using GitHub Actions. When you push changes to the `main` branch, the GitHub Actions workflow will:

1. Build the Next.js app
2. Deploy the static files to the `gh-pages` branch
3. Make the app available at `https://yourusername.github.io/pwacheckin/`

### Manual Deployment

If you prefer to deploy manually:

1. Build the app:
   ```bash
   npm run build
   ```

2. Push the `out` directory to the `gh-pages` branch:
   ```bash
   git add out/ -f
   git commit -m "Deploy to GitHub Pages"
   git subtree push --prefix out origin gh-pages
   ```

## Project Structure

- `src/app/`: Next.js app directory
- `src/app/page.tsx`: Main page component
- `src/app/layout.tsx`: Root layout component
- `src/services/`: API and service functions
- `src/types/`: TypeScript type definitions
- `src/utils/`: Utility functions
- `public/`: Static assets and PWA files
- `.github/workflows/`: GitHub Actions workflow files

## License

MIT
