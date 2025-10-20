# Rick and Morty GraphQL API

A robust GraphQL API built with NestJS and TypeScript that provides comprehensive access to Rick and Morty universe data, including characters, species, and origins with full relationship mapping.

## 🚀 Features

- **GraphQL API** with Apollo Server integration
- **Complete Rick and Morty data model** (Characters, Species, Origins)
- **Database relationships** with Sequelize ORM
- **MySQL** as primary database (with PostgreSQL and Redis support)
- **Docker containerization** for easy deployment
- **Hot reload** development environment
- **Comprehensive logging** and error handling
- **Type-safe** development with TypeScript
- **Automatic data synchronization** with Rick and Morty API

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

Launch MySQL (primary), PostgreSQL, and Redis using Docker Compose:

```bash
docker-compose up -d
```

This starts:
- **MySQL** database on port 3306 (primary database)
- **PostgreSQL** database on port 5432 (optional)
- **Redis** cache on port 6379

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

### 6. ⚠️ **IMPORTANT: Initial Data Population**

**Before using the GraphQL API, you MUST populate the database with initial data.**

Execute this POST request to load Rick and Morty characters data:

```bash
curl -X POST http://localhost:3000/characters
```

**Or using any HTTP client (Postman, Insomnia, etc.):**
- **Method**: POST
- **URL**: http://localhost:3000/characters
- **Headers**: None required
- **Body**: Empty

This endpoint will:
- Fetch 15 characters from the Rick and Morty API
- Create associated species and origins
- Populate your local database with relationships

**⚠️ Without this step, your GraphQL queries will return empty results.**

## 📚 GraphQL API Documentation

### GraphQL Schema Overview

The API exposes the following GraphQL types and operations:

#### Core Types

```graphql
type CharacterType {
  id: ID!
  name: String
  status: String!      # "Alive", "Dead", "unknown"
  gender: String!      # "Male", "Female", "Genderless", "unknown"
  image_url: String    # Character avatar URL
  species: SpeciesType # Related species information
  origin: OriginType   # Related origin information
}

type SpeciesType {
  id: ID!
  name: String!        # Species name (e.g., "Human", "Alien")
}

type OriginType {
  id: ID!
  name: String!        # Origin name (e.g., "Earth (C-137)")
  url: String          # Original Rick and Morty API URL
}
```

#### Available Queries

```graphql
type Query {
  # Main query to find characters with optional filters
  findCharacters(
    name: String      # Filter by character name (partial match)
    status: String    # Filter by status: "Alive", "Dead", "unknown"
    gender: String    # Filter by gender: "Male", "Female", "Genderless", "unknown"
    species: String   # Filter by species name (partial match)
    origin: String    # Filter by origin name (partial match)
  ): [CharacterType!]!
}
```

### Query Examples

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
- `name`: Filter by character name (partial match, case-insensitive)
- `gender`: Filter by gender ("Male", "Female", "Genderless", "unknown")
- `status`: Filter by status ("Alive", "Dead", "unknown")
- `origin`: Filter by origin name (partial match, case-insensitive)
- `species`: Filter by species name (partial match, case-insensitive)

**Note**: All filters are optional and can be combined for more specific results.

### REST API Endpoints

#### Character Data Population

```http
POST /characters
```

**Purpose**: Populates the database with Rick and Morty character data.

**Parameters**: None required

**Response**: Synchronizes 15 characters with their associated species and origins.

**Example Response**:
```json
{
  "message": "Characters synchronized successfully",
  "count": 15,
  "status": "success"
}
```

### Data Structure Details

### Data Structure Details

#### Database Schema

The application uses the following database tables with Sequelize ORM:

**Characters Table**:
- `id`: Primary key (auto-increment)
- `name`: Character name (string, nullable)
- `status`: Character status (string, required)
- `gender`: Character gender (string, required)
- `image_url`: Character avatar URL (string, nullable)
- `id_species`: Foreign key to Species table
- `id_origin`: Foreign key to Origins table
- `createdAt`: Timestamp (auto-generated)
- `updatedAt`: Timestamp (auto-generated)

**Species Table**:
- `id`: Primary key (auto-increment)
- `name`: Species name (string, required, unique)
- `createdAt`: Timestamp (auto-generated)
- `updatedAt`: Timestamp (auto-generated)

**Origins Table**:
- `id`: Primary key (auto-increment)
- `name`: Origin name (string, required)
- `url`: Original API URL (string, nullable)
- `createdAt`: Timestamp (auto-generated)
- `updatedAt`: Timestamp (auto-generated)

#### Relationships

```sql
Characters.id_species -> Species.id (Many-to-One)
Characters.id_origin -> Origins.id (Many-to-One)
```

#### GraphQL Type Definitions

The GraphQL schema is automatically generated from TypeScript decorators:

```typescript
// Character GraphQL Type
@ObjectType()
export class CharacterType {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  name?: string;

  @Field()
  status: string;

  @Field()
  gender: string;

  @Field({ nullable: true })
  image_url?: string;

  @Field(() => SpeciesType, { nullable: true })
  species?: SpeciesType;

  @Field(() => OriginType, { nullable: true })
  origin?: OriginType;
}
```

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

Species
└── has_many Characters

Origins
└── has_many Characters
```

### External API Integration

The application integrates with the official Rick and Morty API:
- **Source**: https://rickandmortyapi.com/
- **Purpose**: Fetches character, species, and origin data
- **Sync Method**: REST API calls during population
- **Data Mapping**: Transforms external API data to local schema

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
docker-compose logs mysql
docker-compose logs postgres
```

#### Empty Query Results
If your GraphQL queries return empty arrays:

```bash
# 1. Ensure you've populated the database
curl -X POST http://localhost:3000/characters

# 2. Verify data was inserted by checking logs
npm run start:dev
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
2. **Use GraphQL Playground** to test queries interactively at http://localhost:3000/graphql
3. **Populate database first** - Run `POST http://localhost:3000/characters` before testing
4. **Test basic queries** with the `findCharacters` query
5. **Check Docker container status** with `docker-compose ps`
6. **Verify database connectivity** by checking container logs
7. **Use curl to test REST endpoints** for data population

### Quick Testing Checklist

```bash
# 1. Check if containers are running
docker-compose ps

# 2. Populate database with initial data
curl -X POST http://localhost:3000/characters

# 3. Test GraphQL query
curl -X POST http://localhost:3000/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "{ findCharacters { id name status } }"}'

# 4. Check application logs
npm run start:dev
```

## ⚙️ Configuration

### Environment Variables

The application automatically configures itself for development. For production or custom setups, you can create a `.env` file:

```bash
# Database Configuration (MySQL - Primary)
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=user
DB_PASSWORD=password
DB_NAME=rickandmortydb
DB_TYPE=mysql
DB_SYNCHRONIZE=true

# Alternative PostgreSQL Configuration
# DB_HOST=localhost
# DB_PORT=5432
# DB_USERNAME=user
# DB_PASSWORD=password
# DB_NAME=rickandmortydb
# DB_TYPE=postgres

# Application Configuration
PORT=3000
NODE_ENV=development
```

### Database Schema

The application uses Sequelize ORM with auto-sync enabled in development mode. The schema includes:

- **Characters** table with foreign keys to Species and Origins
- **Species** table with unique species names  
- **Origins** table with origin names and URLs
- Automatic timestamps (createdAt, updatedAt)
- **MySQL** as the primary database (with PostgreSQL support)
- **Redis** for caching (optional)

## 🛠️ Technologies Used

| Technology | Purpose | Version |
|------------|---------|---------|
| **NestJS** | Backend framework | ^11.0.1 |
| **GraphQL** | API query language | ^16.11.0 |
| **Apollo Server** | GraphQL server | ^5.0.0 |
| **TypeScript** | Type safety | ^5.7.3 |
| **Sequelize** | ORM for database | ^6.37.7 |
| **MySQL** | Primary database | 8.0 |
| **PostgreSQL** | Alternative database | 14 |
| **Redis** | Caching layer | 7 |
| **Docker** | Containerization | - |
| **Jest** | Testing framework | ^30.0.0 |
| **Axios** | HTTP client | ^1.12.2 |
| **Class Validator** | Input validation | ^0.14.2 |
| **Joi** | Schema validation | ^18.0.1 |

### Core Dependencies

#### Production Dependencies
- `@nestjs/core`, `@nestjs/common` - NestJS framework core
- `@nestjs/graphql`, `@apollo/server` - GraphQL implementation
- `@nestjs/sequelize`, `sequelize-typescript` - Database ORM
- `@nestjs/config` - Configuration management
- `mysql2` - MySQL database driver
- `class-transformer`, `class-validator` - Data validation
- `axios` - External API communication
- `rxjs` - Reactive programming

#### Development Dependencies
- `@nestjs/cli` - NestJS command line interface
- `eslint`, `prettier` - Code quality and formatting
- `jest`, `@nestjs/testing` - Testing framework
- `typescript`, `ts-node` - TypeScript support

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
