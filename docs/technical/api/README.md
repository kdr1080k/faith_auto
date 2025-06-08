# FlexCar API Documentation

## Overview

The FlexCar API follows RESTful principles and provides endpoints for managing car subscriptions, vehicles, users, and payments.

## Base URL

```
https://api.flexcar.com/v1
```

## Authentication

All API requests require authentication using JWT tokens.

```http
Authorization: Bearer <your_jwt_token>
```

## Common Response Format

```json
{
  "status": "success",
  "data": {},
  "message": "",
  "errors": []
}
```

## Endpoints

### Authentication

#### Login
```http
POST /auth/login
```

Request:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "status": "success",
  "data": {
    "token": "jwt_token",
    "user": {
      "id": 1,
      "email": "user@example.com",
      "name": "John Doe"
    }
  }
}
```

### Vehicles

#### List Vehicles
```http
GET /vehicles
```

Query Parameters:
- `city` (string): Filter by city
- `body_type` (string): Filter by body type
- `fuel_type` (string): Filter by fuel type
- `seats` (integer): Filter by number of seats
- `page` (integer): Page number
- `limit` (integer): Items per page

Response:
```json
{
  "status": "success",
  "data": {
    "vehicles": [
      {
        "id": 1,
        "make": "Hyundai",
        "model": "Venue",
        "year": 2023,
        "body_type": "SUV",
        "fuel_type": "Petrol",
        "seats": 5,
        "price_per_month": 499,
        "status": "available",
        "images": ["url1", "url2"],
        "features": ["feature1", "feature2"]
      }
    ],
    "pagination": {
      "total": 100,
      "page": 1,
      "limit": 10
    }
  }
}
```

#### Get Vehicle Details
```http
GET /vehicles/{id}
```

Response:
```json
{
  "status": "success",
  "data": {
    "vehicle": {
      "id": 1,
      "make": "Hyundai",
      "model": "Venue",
      "year": 2023,
      "body_type": "SUV",
      "fuel_type": "Petrol",
      "seats": 5,
      "price_per_month": 499,
      "status": "available",
      "images": ["url1", "url2"],
      "features": ["feature1", "feature2"],
      "specifications": {
        "engine": "1.6L",
        "transmission": "Automatic",
        "fuel_economy": "7.2L/100km"
      }
    }
  }
}
```

### Subscriptions

#### Create Subscription
```http
POST /subscriptions
```

Request:
```json
{
  "vehicle_id": 1,
  "start_date": "2024-03-01",
  "duration_months": 3,
  "payment_method": "credit_card",
  "delivery_address": {
    "street": "123 Main St",
    "city": "Sydney",
    "postcode": "2000"
  }
}
```

Response:
```json
{
  "status": "success",
  "data": {
    "subscription": {
      "id": 1,
      "vehicle": {
        "id": 1,
        "make": "Hyundai",
        "model": "Venue"
      },
      "start_date": "2024-03-01",
      "end_date": "2024-06-01",
      "status": "active",
      "monthly_payment": 499
    }
  }
}
```

#### List Subscriptions
```http
GET /subscriptions
```

Response:
```json
{
  "status": "success",
  "data": {
    "subscriptions": [
      {
        "id": 1,
        "vehicle": {
          "id": 1,
          "make": "Hyundai",
          "model": "Venue"
        },
        "start_date": "2024-03-01",
        "end_date": "2024-06-01",
        "status": "active",
        "monthly_payment": 499
      }
    ]
  }
}
```

### Payments

#### Process Payment
```http
POST /payments
```

Request:
```json
{
  "subscription_id": 1,
  "amount": 499,
  "payment_method": "credit_card",
  "card_details": {
    "number": "4111111111111111",
    "expiry": "12/25",
    "cvv": "123"
  }
}
```

Response:
```json
{
  "status": "success",
  "data": {
    "payment": {
      "id": 1,
      "amount": 499,
      "status": "completed",
      "transaction_id": "txn_123",
      "date": "2024-03-01T10:00:00Z"
    }
  }
}
```

## Error Codes

| Code | Description |
|------|-------------|
| 400  | Bad Request |
| 401  | Unauthorized |
| 403  | Forbidden |
| 404  | Not Found |
| 422  | Validation Error |
| 429  | Too Many Requests |
| 500  | Internal Server Error |

## Rate Limiting

- 100 requests per minute for authenticated users
- 20 requests per minute for unauthenticated users

## Versioning

API versions are specified in the URL path. The current version is v1.

## Webhooks

FlexCar provides webhooks for the following events:

- Subscription created
- Subscription updated
- Payment processed
- Vehicle status changed

Webhook payload format:
```json
{
  "event": "subscription.created",
  "data": {
    "subscription_id": 1,
    "timestamp": "2024-03-01T10:00:00Z"
  }
}
``` 