from flask import Flask, request, jsonify
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)

# Mock data storage with initial messages
mock_queues = {
    "queue1": [{"content": "Initial message for queue1"}, {"content": "Another message in queue1"}],
    "queue2": [{"content": "Hello from queue2"}, {"content": "Queue2 is not empty"}],
    "queue3": [{"content": "Queue3 has some data"}, {"content": "More data in queue3"}]
}

@app.route('/api/<queue_name>', methods=['POST'])
def add_message(queue_name):
    message = request.json
    if queue_name not in mock_queues:
        mock_queues[queue_name] = []
    mock_queues[queue_name].append(message)
    return jsonify({"status": "Message added"}), 201

@app.route('/api/<queue_name>', methods=['GET'])
def get_message(queue_name):
    if queue_name in mock_queues and mock_queues[queue_name]:
        return jsonify(mock_queues[queue_name][0]), 200
    else:
        return jsonify({"content": f"No messages in {queue_name}"}), 204

@app.route('/api/<queue_name>/all', methods=['GET'])
def get_all_messages(queue_name):
    if queue_name in mock_queues:
        return jsonify(mock_queues[queue_name]), 200
    else:
        return jsonify([]), 200

@app.route('/api/queues', methods=['GET'])
def get_queues():
    queue_info = {name: len(queue) for name, queue in mock_queues.items()}
    return jsonify(queue_info)

def generate_random_message():
    messages = [
        "It's the (AI) prescription to maximize your growth potential.",
        "This is a test message.",
        "Effortlessly attract and retain your top customers with our prescriptive AI",
        "Random message #" + str(random.randint(1, 1000)),
        "As a Value-Bidding partner, our AI helps you attract high-value customers on Google and Meta, then delivers timely actions to effectively activate, engage, nurture, and retain them.",
        "Welcome to Voyantis's queue system"
    ]
    return {"content": random.choice(messages)}

@app.route('/api/generate', methods=['POST'])
def generate_messages():
    for queue in mock_queues.values():
        for _ in range(random.randint(1, 5)):
            queue.append(generate_random_message())
    return jsonify({"status": "Random messages added to queues"}), 201

if __name__ == '__main__':
    app.run(debug=True)