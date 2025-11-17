# Real Estate Chatbot - Frontend

React-based frontend for the Real Estate Analysis Chatbot.

## Available Scripts

### `npm start`
Runs the app in development mode at [http://localhost:3000](http://localhost:3000)

### `npm run build`
Builds the app for production to the `build` folder.

### `npm test`
Launches the test runner in interactive watch mode.

## Environment Variables

Create a `.env` file in the frontend directory:

```
REACT_APP_API_URL=http://localhost:8000
```

For production, update this to your deployed backend URL.

## Components

- **App.js** - Main application container
- **ChatInterface** - Chat UI and message handling
- **ChatMessage** - Individual message display
- **AnalysisResult** - Results display with tabs
- **PriceChart** - Chart.js visualization
- **FileUpload** - File upload component

## Styling

- Bootstrap 5 for UI components
- Custom CSS for chat interface
- Responsive design for mobile devices

## Deployment

### Vercel

```bash
npm run build
vercel --prod
```

### Netlify

```bash
npm run build
netlify deploy --prod --dir=build
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
