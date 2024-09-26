# News Aggregator

## Project Overview

News Aggregator is a modern web application built with Next.js that aggregates news articles from various sources, providing users with a centralized platform to stay informed about current events. The application offers personalized news feeds, article search functionality, and a user-friendly interface for browsing and reading news content.

## Features

- Aggregated news from multiple reputable sources
- Personalized news feed based on user preferences
- Article search functionality
- Responsive design for optimal viewing on various devices
- Server-side rendering for improved performance and SEO
- Modal view for quick article previews
- Pagination for easy navigation through article lists

## Technologies Used

- Next.js 15 (App Router)
- React
- TypeScript
- Tailwind CSS
- Docker
- Zod (for form validation)
- React hook form

## Prerequisites

Before running the application, ensure you have the following installed:

- Node.js (v20 or later)
- npm or yarn
- Docker (if using Docker deployment method)

## Environment Setup

The project uses encrypted environment variables for security. To set up the environment:

1. Obtain the encryption key and initialization vector (IV) from the project administrator.
2. Run the following command to decrypt the environment variables:

```bash
npx decrypt-env --key="${KEY}" --iv="${IV}" --env=".env.local"
```

Replace `${KEY}` and `${IV}` with the actual key and IV provided.

## Running the Application

There are two methods to run the application: using Docker or Docker Compose.

### Method 1: Using Docker

1. Build the Docker image:

```shellscript
docker build -t news-aggregator .
```

2. Run the Docker container:

```shellscript
docker run -p 3000:3000 news-aggregator
```

### Method 2: Using Docker Compose

1. Run the following command to build and start the container:

```shellscript
docker compose up --build
```

After using either method, the application will be available at `http://localhost:3000`.

## Project Structure

```plaintext
src/
├── app/
│   ├── (auth)/
│   ├── (dashboard)/
│   ├── @modal/
│   ├── api/
│   ├── article/
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   ├── loading.tsx
│   └── page.tsx
├── components/
│   ├── articles/
│   ├── buttons/
│   ├── forms/
│   ├── layout/
│   ├── sections/
│   └── ui/
├── config/
│   └── constants.ts
├── contexts/
│   └── ArticleContext.tsx
├── hooks/
│   └── useArticles.ts
├── lib/
│   ├── api-clients/
│   ├── schemas.ts
│   └── utils.ts
├── services/
│   ├── articleService.ts
│   ├── feedService.ts
│   ├── guardianApiService.ts
│   ├── newYorkTimesApiService.ts
│   └── newsApiService.ts
└── types/
    ├── api.ts
    ├── article.ts
    ├── enums.ts
    ├── guardianApi.d.ts
    ├── newYorkTimesApi.d.ts
    └── newsApi.d.ts
```
