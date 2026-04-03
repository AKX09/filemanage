# File Management System

Upload and share files with expiring links.

## Features
- File upload with unique shareable links
- Redis caching (85% faster retrieval)
- Auto-deletion with BullMQ
- Rate limiting

## Tech Stack
Node.js, Express, MongoDB, Redis, BullMQ, Multer

## Setup
```bash
npm install
# Add .env with MONGO_URI, REDIS_URL
npm start

#Start main server
nodemon server.js

# Start worker (in separate terminal)
nodemon worker.js
```

## API
- `POST /files/upload` - Upload file
- `GET /files/:id` - Download file

## Performance
- 100 concurrent users, 0% errors
- 64 req/s, median 392ms

## TODO
- Migrate to S3
- Add virus scanning
