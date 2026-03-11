# Albania Cities REST API

## Project Description

This project is a **REST API for cities in Albania** built with **SvelteKit**.
The API allows users to retrieve information about different cities such as their name, location, type, population and elevation.

The main goal of this project is to demonstrate:

* REST API design
* correct HTTP methods and status codes
* Basic Authentication for protected endpoints
* clean Git history with meaningful commits
* API testing and documentation using Postman

---

## Data Model

Each city contains the following attributes:

| Field      | Description                        |
| ---------- | ---------------------------------- |
| id         | unique identifier                  |
| name       | name of the city                   |
| location   | region of the city                 |
| type       | type of place (city)               |
| population | number of inhabitants              |
| height     | elevation above sea level (meters) |

Example:

```json
{
  "id": 1,
  "name": "Tirana",
  "location": "Central Albania",
  "type": "city",
  "population": 421000,
  "height": 110
}
```

---

## API Endpoints

### Public Endpoints

#### Get all cities

GET /api/cities

Response:

200 OK

Returns a list of all cities.

---

#### Get one city

GET /api/cities/:id

Example:

GET /api/cities/1

Responses:

200 OK – city found
404 Not Found – city does not exist

---

### Protected Endpoints (Basic Auth required)

#### Create a new city

POST /api/cities

Response:

201 Created

---

#### Update a city

PUT /api/cities/:id

Response:

200 OK – city updated
404 Not Found – city not found

---

#### Delete a city

DELETE /api/cities/:id

Response:

200 OK – city deleted
404 Not Found – city not found

---

## Authentication

POST, PUT and DELETE endpoints require **Basic Authentication**.

Example credentials:

Username: admin
Password: secret

If authentication fails the API returns:

401 Unauthorized

---

## HTTP Status Codes

The API uses standard HTTP status codes:

* 200 OK
* 201 Created
* 401 Unauthorized
* 404 Not Found
* 400 Bad Request

---

## Technologies Used

* SvelteKit
* Node.js
* MySQL
* REST API
* Postman for testing

---

## Testing

All endpoints were tested using **Postman**.
The complete Postman collection is included in this repository.

---

## Deployment

The API is deployed using **Vercel**.

Example endpoint:

GET /api/cities


# Author

Project created by Regis Balla.
