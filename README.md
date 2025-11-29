# RESTful Countries API

A lightweight Node.js REST API that provides country information with filtering and sorting capabilities. This API fetches data from the REST Countries API and provides a simple interface for querying country data.

## Features

- 🌍 Fetch all countries with essential information (name, region, population)
- 🔍 Filter by region
- 📊 Filter by minimum population
- 🔄 Sort by name or population (ascending/descending)
- ⚡ Built-in caching for improved performance
- 🪵 Request logging middleware
- ✅ Health check endpoint

## Tech Stack

- **Runtime**: Node.js
- **Architecture**: Pure Node.js HTTP server (no Express)
- **API Source**: [REST Countries API](https://restcountries.com)

## Project Structure
```
restful-countries-api/
├── src/
│   ├── server.js                 # Main server entry point
│   ├── routes/
│   │   └── router.js             # Route handler
│   ├── controllers/
│   │   └── countryController.js  # Business logic for countries
│   ├── services/
│   │   └── apiService.js         # External API calls with caching
│   ├── middleware/
│   │   └── logger.js             # Request logging
│   └── utils/
│       └── response.js           # Response helper functions
└── package.json
```

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd restful-countries-api
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The server will start on `http://localhost:8000` by default.

## Environment Variables

- `PORT` - Server port (default: 8000)

## API Endpoints

### Health Check

Check if the API is running and get server uptime.
```
GET /health
```

**Response:**
```json
{
  "status": "OK",
  "uptime": 123.456
}
```

### Get Countries

Retrieve country data with optional filtering and sorting.
```
GET /api/countries
```

#### Query Parameters

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `region` | string | Filter by region (case-insensitive) | `?region=europe` |
| `min_pop` | number | Filter countries with population >= value | `?min_pop=10000000` |
| `sort` | string | Sort by field (`name` or `population`) | `?sort=population` |
| `order` | string | Sort order (`asc` or `desc`) | `?order=desc` |

#### Response Format
```json
{
  "count": 2,
  "data": [
    {
      "name": "Germany",
      "region": "Europe",
      "population": 83240525
    },
    {
      "name": "France",
      "region": "Europe",
      "population": 67391582
    }
  ]
}
```

#### Example Requests

**Get all countries:**
```bash
curl http://localhost:8000/api/countries
```

**Filter by region:**
```bash
curl http://localhost:8000/api/countries?region=asia
```

**Filter by minimum population:**
```bash
curl http://localhost:8000/api/countries?min_pop=50000000
```

**Sort by population (descending):**
```bash
curl http://localhost:8000/api/countries?sort=population&order=desc
```

**Combine filters:**
```bash
curl http://localhost:8000/api/countries?region=africa&min_pop=20000000&sort=name&order=asc
```

## Features in Detail

### Caching

The API implements an in-memory cache for the countries data. The first request fetches data from the REST Countries API, and subsequent requests use the cached data, significantly improving response times.

### Request Logging

All incoming requests are logged with timestamps in ISO format:
```
[2024-01-15T10:30:45.123Z] GET request to /api/countries?region=europe
```

### Error Handling

The API includes comprehensive error handling:
- Invalid API responses are caught and logged
- HTTP errors return appropriate status codes
- Failed requests return a 500 status with error message

## Development

**Run in development mode with auto-reload:**
```bash
npm run dev
```

## API Response Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 404 | Endpoint not found |
| 500 | Server error |

## Performance Considerations

- Data is cached after the first request
- Only essential fields (name, region, population) are fetched from the external API
- Filtering and sorting happen in-memory for fast response times

## Author

Raja Nayak
