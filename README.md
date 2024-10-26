# Real-Time Weather Monitoring System

## Project Overview
A full-stack weather monitoring system built with Django and React.js that provides real-time weather updates for major Indian metros. The system features interactive charts, live updates, and weather alerts.

## Tech Stack
### Frontend
- React.js 18.3.1
- Chart.js 4.4.5 with react-chartjs-2
- React Router DOM 6.27.0
- Modern JavaScript (ES6+)

### Backend
- Django 4.2
- Django REST Framework
- Django Q
- PostgreSQL/SQLite3

## Project Structure
```
weather-monitoring/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── utils/
│   │   └── App.js
│   ├── public/
│   └── package.json
├── backend/
│   ├── app/
│   ├── weather_dashboard/
│   ├── manage.py
│   └── requirements.txt
└── README.md
```

## Prerequisites
- Node.js 16+
- Python 3.8+
- PostgreSQL (optional)
- Redis (for Django Q)
- OpenWeatherMap API key

## Installation and Setup

### Frontend Setup
1. Navigate to frontend directory
```bash
cd frontend
```

2. Install dependencies
```bash
npm install
```

3. Create `.env` file in frontend root
```env
REACT_APP_API_URL=http://localhost:8000
```

4. Start development server
```bash
npm start
```

The frontend will be available at `http://localhost:3000`

### Backend Setup
1. Navigate to backend directory
```bash
cd backend
```

2. Create and activate virtual environment
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies
```bash
pip install -r requirements.txt
```

4. Create `.env` file in backend root
```env
SECRET_KEY=your-secret-key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
DATABASE_URL=sqlite:///db.sqlite3
API_KEY=your-openweathermap-api-key
CITIES=Delhi,Mumbai,Chennai,Bangalore,Kolkata,Hyderabad
INTERVAL=5
SSE_DELAY=1
```

5. Run database migrations and create superuser
```bash
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
```

6. Start required services
```bash
# Terminal 1: Django Q cluster
python manage.py qcluster

# Terminal 2: Schedule weather tasks
python manage.py schedule_weather_tasks

# Terminal 3: Django server
python manage.py runserver
```

## Frontend Dependencies
```json
{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "chart.js": "^4.4.5",
    "react-chartjs-2": "^5.2.0",
    "react-router-dom": "^6.27.0",
    "react-scripts": "5.0.1"
  }
}
```

## Features and Implementation

### 1. Real-time Weather Dashboard
- Live weather updates using Server-Sent Events
- Interactive charts using Chart.js
- City-wise weather comparison
- Temperature trends visualization

### 2. Charts and Visualizations
```javascript
// Example Chart.js implementation
import { Line } from 'react-chartjs-2';

const WeatherChart = ({ data }) => {
  const options = {
    responsive: true,
    // ... chart configuration
  };

  return <Line data={data} options={options} />;
};
```

### 3. Routing Structure
```javascript
import { BrowserRouter, Routes, Route } from 'react-router-dom';

<BrowserRouter>
  <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="/city/:cityName" element={<CityDetail />} />
    <Route path="/alerts" element={<Alerts />} />
  </Routes>
</BrowserRouter>
```

## Development

### Running Frontend Tests
```bash
npm test
```

### Building for Production
```bash
npm run build
```

### Environment Configuration
Frontend environment variables must be prefixed with `REACT_APP_`

## API Integration
The frontend communicates with the Django backend through:
1. REST endpoints for data retrieval
2. Server-Sent Events for real-time updates

Example API service:
```javascript
const fetchWeatherData = async (city) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/api/weather/${city}`);
  return response.json();
};
```

## Deployment
1. Build frontend
```bash
cd frontend
npm run build
```

2. Configure backend for production
- Update `ALLOWED_HOSTS`
- Set `DEBUG=False`
- Configure static files serving

## Browser Support
```json
{
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ]
  }
}
```

## Development Guidelines
- Use functional components and hooks
- Implement proper error handling
- Follow React best practices
- Write unit tests for components
- Use ESLint for code quality

## Troubleshooting
Common issues and solutions:
1. CORS issues: Check Django CORS configuration
2. Chart.js rendering: Ensure proper data format
3. Real-time updates: Verify SSE connection
