# Rick and Morty GraphQL API

A robust GraphQL API built with NestJS and TypeScript that provides comprehensive access to Rick and Morty universe data, including characters, species, and origins with full relationship mapping.

## 🚀 Features

- **GraphQL API** with Apollo Server integration
- **Complete Rick and Morty data model** (Characters, Species, Origins)
- **Database relationships** with Sequelize ORM
- **PostgreSQL** as primary database
- **Docker containerization** for easy deployment
- **Hot reload** development environment
- **Comprehensive logging** and error handling
- **Type-safe** development with TypeScript

## 📋 Prerequisites

Ensure you have the following installed:

- **Docker** (v20.0+) - [Install Docker](https://docs.docker.com/get-docker/)
- **Docker Compose** (v2.0+) - Usually included with Docker Desktop
- **Node.js** (v18.0+) - [Install Node.js](https://nodejs.org/)
- **npm** or **yarn** - Package manager

### Verify Installation

```bash
docker --version
docker-compose --version
node --version
npm --version
```

## 🛠️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/camiloborrero92/rick-and-morty-test.git
cd rick-and-morty-test
```

### 2. Environment Setup

The project uses Docker for database services. The default configuration should work out of the box.

### 3. Start Database Services

Launch PostgreSQL using Docker Compose:

```bash
docker-compose up -d
```

This starts:
- **PostgreSQL** database on port 5432

### 4. Install Dependencies

```bash
npm install
# or
yarn install
```

### 5. Run the Application

```bash
# Development mode with hot reload
npm run start:dev
# or
yarn start:dev
```

The application will be available at:
- **API**: http://localhost:3000
- **GraphQL Playground**: http://localhost:3000/graphql

## 📚 GraphQL API Documentation

### Available Queries

#### Get Characters with Filters
```graphql
query GetCharacters {
  findCharacters(
    name: "Rick"
    gender: "Male"
    status: "Alive"
  ) {
    id
    name
    status
    gender
    image_url
    species {
      id
      name
    }
    origin {
      id
      name
      url
    }
  }
}
```

#### Get All Characters (without filters)
```graphql
query GetAllCharacters {
  findCharacters {
    id
    name
    status
    gender
    image_url
    species {
      id
      name
    }
    origin {
      id
      name
      url
    }
  }
}
```

#### Available Query Parameters
- `name`: Filter by character name (partial match)
- `gender`: Filter by gender (Male, Female, Genderless, Unknown)
- `status`: Filter by status (Alive, Dead, Unknown)
- `origin`: Filter by origin name (partial match)
- `species`: Filter by species name (partial match)

### Data Models

#### Character
- `id`: Unique identifier
- `name`: Character name
- `status`: Alive, Dead, or Unknown
- `gender`: Male, Female, Genderless, or Unknown
- `image_url`: Character image URL
- `species`: Related species information
- `origin`: Related origin information

#### Species
- `id`: Unique identifier
- `name`: Species name

#### Origin
- `id`: Unique identifier
- `name`: Origin name
- `url`: Origin URL from Rick and Morty API

## 📜 Available Scripts

### Development Commands

```bash
# Start in development mode (with hot reload)
npm run start:dev

# Start in debug mode
npm run start:debug

# Build the project
npm run build

# Start in production mode (requires build first)
npm run start:prod
```

### Testing Commands

```bash
# Run unit tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run end-to-end tests
npm run test:e2e

# Generate test coverage report
npm run test:cov
```

### Code Quality Commands

```bash
# Lint and fix code issues
npm run lint

# Format code with Prettier
npm run format
```

## 🐳 Docker Commands

### Managing Services

```bash
# Start all services in background
docker-compose up -d

# Start services and view logs
docker-compose up

# Stop all services
docker-compose down

# Stop services and remove volumes (⚠️ Deletes all data)
docker-compose down -v
```

### Viewing Logs

```bash
# View logs of all services
docker-compose logs

# View PostgreSQL logs
docker-compose logs postgres

# Follow logs in real-time
docker-compose logs -f
```

## 🏗️ Project Structure

```
src/
├── app.module.ts                    # Main application module
├── main.ts                         # Application entry point
├── characters/                     # Characters domain
│   ├── characters.controller.ts    # REST controller
│   ├── characters.resolver.ts      # GraphQL resolver
│   ├── characters.service.ts       # Business logic
│   ├── characters.module.ts        # Module configuration
│   ├── dto/
│   │   └── character.type.ts       # GraphQL type definitions
│   ├── entities/
│   │   └── character.model.ts      # Sequelize model
│   └── interfaces/
│       └── response-api.interface.ts
├── origins/                        # Origins domain
│   ├── origins.service.ts
│   ├── origins.module.ts
│   ├── dto/
│   │   └── origin.type.ts
│   └── entities/
│       └── origin.model.ts
├── species/                        # Species domain
│   ├── species.service.ts
│   ├── species.module.ts
│   ├── dto/
│   │   └── species.type.ts
│   └── entities/
│       └── species.model.ts
├── config/                         # Configuration management
│   ├── config.interface.ts
│   ├── config.module.ts
│   ├── config.service.ts
│   └── validation.schema.ts
├── interceptors/                   # Custom interceptors
│   └── logger.interceptor.ts
└── test-grap/                     # Test GraphQL module
    ├── test-grap.resolver.ts
    ├── test-grap.service.ts
    ├── test-grap.module.ts
    ├── dto/
    └── entities/
```

## 🔧 Architecture

The project follows **Domain-Driven Design (DDD)** principles with clear separation of concerns:

- **Controllers**: Handle HTTP requests (REST endpoints)
- **Resolvers**: Handle GraphQL queries and mutations
- **Services**: Contain business logic and data processing
- **Models**: Define database schema and relationships
- **DTOs**: Define GraphQL types and API contracts
- **Modules**: Organize related functionality

### Database Relationships

```sql
Characters
├── belongs_to Species (via id_species)
└── belongs_to Origin (via id_origin)
```

## 🔍 Example Usage

### Using GraphQL Playground

1. Navigate to http://localhost:3000/graphql
2. Use the built-in documentation explorer
3. Try the example queries provided above

### Sample Character Response

```json
{
  "data": {
    "allCharacters": [
      {
        "id": "1",
        "name": "Rick Sanchez",
        "status": "Alive",
        "gender": "Male",
        "image_url": "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
        "species": {
          "id": "1",
          "name": "Human"
        },
        "origin": {
          "id": "1",
          "name": "Earth (C-137)",
          "url": "https://rickandmortyapi.com/api/location/1"
        }
      }
    ]
  }
}
```

## 🚨 Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Check what's using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>
```

#### Database Connection Issues
```bash
# Reset database containers
docker-compose down
docker-compose up -d

# Check database logs
docker-compose logs postgres
```

#### GraphQL Schema Issues
```bash
# The schema.gql file is auto-generated
# If you see schema errors, restart the development server
npm run start:dev
```

#### Dependencies Issues
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

### Complete Reset

If you encounter persistent issues:

```bash
# 1. Stop all services and remove volumes
docker-compose down -v

# 2. Clean dependencies
rm -rf node_modules package-lock.json

# 3. Reinstall
npm install

# 4. Start fresh
docker-compose up -d
npm run start:dev
```

### Debugging Tips

1. **Check application logs** for detailed error messages
2. **Use GraphQL Playground** to test queries interactively
3. **Test basic queries** with the `findCharacters` query
4. **Check Docker container status** with `docker-compose ps`

## ⚙️ Configuration

### Environment Variables

The application automatically configures itself for development. For production or custom setups, you can create a `.env` file:

```bash
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_NAME=rickandmorty
DB_SYNCHRONIZE=true

# Application Configuration
PORT=3000
NODE_ENV=development
```

### Database Schema

The application uses Sequelize with auto-sync enabled in development mode. The schema includes:

- **Characters** table with foreign keys to Species and Origins
- **Species** table with unique species names
- **Origins** table with origin names and URLs
- Automatic timestamps (createdAt, updatedAt)

## 🛠️ Technologies Used

| Technology | Purpose | Version |
|------------|---------|---------|
| **NestJS** | Backend framework | ^10.0.0 |
| **GraphQL** | API query language | ^16.8.0 |
| **Apollo Server** | GraphQL server | ^4.9.0 |
| **TypeScript** | Type safety | ^5.1.3 |
| **Sequelize** | ORM for database | ^6.32.1 |
| **PostgreSQL** | Primary database | 15 |
| **Docker** | Containerization | - |
| **Jest** | Testing framework | ^29.5.0 |

## 📈 Performance Considerations

- **Database indexing** on frequently queried fields
- **Lazy loading** of relationships to avoid N+1 problems
- **Connection pooling** with Sequelize
- **GraphQL query depth limiting** (built-in with Apollo)
- **Logging interceptor** for monitoring API usage

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines

- Follow **TypeScript** best practices
- Write **unit tests** for new features
- Use **meaningful commit messages**
- Update **documentation** for API changes
- Follow **NestJS** conventions and patterns

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Troubleshooting](#-troubleshooting) section
2. Review the [Issues](https://github.com/camiloborrero92/rick-and-morty-test/issues) on GitHub
3. Create a new issue with detailed information about your problem

---

**Built with ❤️ using NestJS and GraphQL**
