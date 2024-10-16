# Voyantis Queue Manager

This project consists of a Flask backend API for managing message queues and a React frontend for interacting with the queues.

## Project Structure

```
Voyantis/
├── backend/
│   ├── queue.py
│   └── requirements.txt
└── frontend/
    ├── home-assignment/
    └── package-lock.json
```

## Prerequisites

- Python 3.7+
- Node.js 14+
- npm 6+

## Setup and Running

### Backend

1. Navigate to the backend directory:
   ```
   cd Voyantis/backend
   ```

2. Create a virtual environment (optional but recommended):
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. Install the required packages:
   ```
   pip install -r requirements.txt
   ```

4. Run the Flask application:
   ```
   python queue.py
   ```

   The API will be available at `http://localhost:5000`.

### Frontend

1. Navigate to the frontend directory:
   ```
   cd Voyantis/frontend/home-assignment
   ```

2. Install the dependencies:
   ```
   npm install
   ```

3. Start the React development server:
   ```
   npm start
   ```

   The application will be available at `http://localhost:3000`.

## API Endpoints

- GET `/api/queues`: Get all queue names and their message counts
- GET `/api/<queue_name>`: Get the first message from a specific queue
- GET `/api/<queue_name>/all`: Get all messages from a specific queue
- POST `/api/<queue_name>`: Add a new message to a specific queue
- POST `/api/generate`: Generate random messages and add them to queues

## Frontend Features

- View all available queues and their message counts
- Retrieve a single message from a selected queue
- Retrieve all messages from a selected queue
- Add a new message to a selected queue
- Generate random messages across all queues

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
