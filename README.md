# Rick and Morty API Test

A GraphQL API built with NestJS and TypeScript that provides access to Rick and Morty universe data including characters, species, and origins.

## Description

This project is built using the [NestJS](https://github.com/nestjs/nest) framework with GraphQL support, featuring a complete API for Rick and Morty data with PostgreSQL, MySQL, and Redis integration.

## Prerequisites

Before running this project, make sure you have the following tools installed on your system:

- **Docker** (v20.0 or higher) - [Install Docker](https://docs.docker.com/get-docker/)
- **Docker Compose** (v2.0 or higher) - Usually comes with Docker Desktop
- **Node.js** (v18.0 or higher) - [Install Node.js](https://nodejs.org/)
- **Yarn** (v1.22 or higher) - [Install Yarn](https://yarnpkg.com/getting-started/install)

### Verify Installation

You can verify that the tools are properly installed by running:

```bash
docker --version
docker-compose --version
node --version
yarn --version
```

## Getting Started

Follow these steps to set up and run the project for the first time:

### 1. Clone the Repository

```bash
git clone https://github.com/camiloborrero92/rick-and-morty-test.git
cd rick-and-morty-test
```

### 2. Environment Configuration

Copy the example environment file and configure your environment variables:

```bash
cp .env.example .env
```

Edit the `.env` file with your preferred settings. The default values should work for local development.

### 3. Start the Database Services

Start the required services (PostgreSQL, MySQL, and Redis) using Docker Compose:

```bash
docker-compose up -d
```

This will start:
- PostgreSQL database on port 5432
- MySQL database on port 3306  
- Redis cache on port 6379

### 4. Install Dependencies

Install the project dependencies using Yarn:

```bash
yarn install
```

### 5. Run the Application

Start the development server:

```bash
# Development mode (with hot reload)
yarn start:dev
```

The application will be available at:
- **API**: http://localhost:3000
- **GraphQL Playground**: http://localhost:3000/graphql

## Available Scripts

### Development Commands

```bash
# Start in development mode (with hot reload)
yarn start:dev

# Start in debug mode
yarn start:debug

# Build the project
yarn build

# Start in production mode (requires build first)
yarn start:prod
```

### Testing Commands

```bash
# Run unit tests
yarn test

# Run tests in watch mode
yarn test:watch

# Run end-to-end tests
yarn test:e2e

# Generate test coverage report
yarn test:cov
```

### Code Quality Commands

```bash
# Lint and fix code issues
yarn lint

# Format code with Prettier
yarn format
```

## Docker Commands

### Start Services

```bash
# Start all services in background
docker-compose up -d

# Start services and view logs
docker-compose up

# Start specific service
docker-compose up -d postgres
```

### Stop Services

```bash
# Stop all services
docker-compose down

# Stop services and remove volumes (⚠️ This will delete all data)
docker-compose down -v
```

### View Logs

```bash
# View logs of all services
docker-compose logs

# View logs of specific service
docker-compose logs postgres

# Follow logs in real-time
docker-compose logs -f
```

## Project Structure

```
src/
├── app.module.ts           # Main application module
├── main.ts                 # Application entry point
├── characters/             # Characters module
│   ├── characters.controller.ts
│   ├── characters.resolver.ts
│   ├── characters.service.ts
│   └── dto/
├── origins/                # Origins module
├── species/                # Species module
├── config/                 # Configuration module
└── interceptors/           # Custom interceptors
```

## GraphQL API

Once the application is running, you can access the GraphQL playground at `http://localhost:3000/graphql` to explore the available queries and mutations.

### Example Queries

```graphql
# Get all characters
query {
  characters {
    id
    name
    status
    species
    origin {
      name
    }
  }
}
```

## Troubleshooting

### Common Issues

1. **Port already in use**: Make sure ports 3000, 3306, 5432, and 6379 are not being used by other applications
2. **Docker services not starting**: Run `docker-compose down` and then `docker-compose up -d` again
3. **Dependencies issues**: Delete `node_modules` and `yarn.lock`, then run `yarn install` again

### Reset Everything

If you encounter persistent issues, you can reset the entire setup:

```bash
# Stop and remove all containers and volumes
docker-compose down -v

# Remove node modules
rm -rf node_modules yarn.lock

# Reinstall dependencies
yarn install

# Start fresh
docker-compose up -d
yarn start:dev
```

## Environment Variables

The following environment variables can be configured in your `.env` file:

```bash
DB_HOST=localhost          # Database host
DB_PORT=3306              # Database port
DB_USER=root              # Database username
DB_PASSWORD=password      # Database password
DB_NAME=mydatabase        # Database name
DB_SYNCHRONIZE=false      # Auto-sync database schema
REDIS_HOST=localhost      # Redis host
REDIS_PORT=6379          # Redis port
```

## Technologies Used

- **NestJS** - Progressive Node.js framework
- **GraphQL** - Query language for APIs
- **TypeScript** - Typed JavaScript
- **PostgreSQL** - Primary database
- **MySQL** - Secondary database
- **Redis** - Caching and session storage
- **Docker** - Containerization
- **Jest** - Testing framework

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
