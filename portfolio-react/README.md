# Mena Emad Portfolio - React Version

This is a React port of the original HTML/CSS/JavaScript portfolio website for Mena Emad. The project maintains the same design and functionality as the original, but implements it using React components and modern front-end practices.

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
   or if you use yarn:
   ```
   yarn install
   ```
3. Run the copy-assets script to copy assets from the original project:
   ```
   powershell -ExecutionPolicy Bypass -File copy-assets.ps1
   ```

### Running the Development Server

```
npm start
```
or with yarn:
```
yarn start
```

The app will be available at http://localhost:3000

### Building for Production

```
npm run build
```
or with yarn:
```
yarn build
```

This will create an optimized production build in the `build` folder.

## Project Structure

- `src/components/` - React components
  - `sections/` - Components for each section of the portfolio
- `public/assets/` - Static assets (images, CSS, vendor JS files)

## Features

- Responsive design
- Interactive navigation
- Project showcase
- Contact form
- Smooth animations and transitions

## Technologies Used

- React
- TypeScript
- jQuery (for compatibility with original functionality)
- HammerJS (for touch gestures)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Original portfolio design by Mena Emad 