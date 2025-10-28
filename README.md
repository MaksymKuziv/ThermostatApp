# ThermostatApp

A full-stack web app for recording and viewing temperature readings. Built with ASP.NET Core backend and React + TypeScript + Tailwind frontend.

Dependencies: .NET SDK 8.0+, Node.js 24, npm 10+, React 19, TypeScript 5, TailwindCSS 4, Axios, Vite, Entity Framework Core.

Running the project:
1. Install Node.js and npm
2. Run `npm install` inside `ThermostatApp.Client`
3. Set `ThermostatApp.Server` as the startup project in Visual Studio
4. Press **Start** in Visual Studio - this will automatically launch both the backend and the frontend via SpaProxy

Database migrations:
`dotnet ef migrations add InitialCreate`
`dotnet ef database update`

API overview:
- GET /api/readings — fetches recent readings
- POST /api/readings — creates a new reading

Example payload:
{ "temperatureC": 22.5, "location": "Montreal", "notes": "Test reading" }

Features:
- Form with validation, loading state, success message, and reset
- Readings list with empty state and error handling
- TypeScript interfaces and API client (axios)
- Responsive UI with TailwindCSS

## Development Notes

**Time spent:** ~6–8 hours total (including backend, frontend, testing, and documentation)

**Areas for future improvement:**
- Implement authentication (e.g., JWT or ASP.NET Identity)
- Add pagination and filtering to the readings list
- Introduce unit and integration tests (xUnit, React Testing Library)
- Enhance frontend validation and error handling
- Polish UX and accessibility
- Containerize the app with Docker for easier deployment
- Optimize API structure and response formatting
