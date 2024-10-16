import React, { useState, useEffect } from "react";

const API_URL = "http://localhost:5000/api";

export default function App() {
  const [queues, setQueues] = useState({});
  const [selectedQueue, setSelectedQueue] = useState("");
  const [message, setMessage] = useState(null);
  const [allMessages, setAllMessages] = useState([]);
  const [error, setError] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    fetchQueues();
    const interval = setInterval(fetchQueues, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchQueues = async () => {
    try {
      const response = await fetch(`${API_URL}/queues`);
      if (!response.ok) {
        throw new Error("Failed to fetch queues");
      }
      const data = await response.json();
      setQueues(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGetMessage = async () => {
    if (!selectedQueue) return;
    try {
      const response = await fetch(`${API_URL}/${selectedQueue}`);
      if (response.status === 204) {
        setMessage("No message available");
      } else if (!response.ok) {
        throw new Error("Failed to fetch message");
      } else {
        const data = await response.json();
        setMessage(
          data && data.content ? data.content : "Invalid message format"
        );
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGetAllMessages = async () => {
    if (!selectedQueue) return;
    try {
      const response = await fetch(`${API_URL}/${selectedQueue}/all`);
      if (!response.ok) {
        throw new Error("Failed to fetch messages");
      }
      const data = await response.json();
      setAllMessages(
        data.map((msg) =>
          msg && msg.content ? msg.content : "Invalid message format"
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAddMessage = async () => {
    if (!selectedQueue || !newMessage) return;
    try {
      const response = await fetch(`${API_URL}/${selectedQueue}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: newMessage }),
      });
      if (!response.ok) {
        throw new Error("Failed to add message");
      }
      setNewMessage("");
      fetchQueues();
      handleGetAllMessages();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGenerateMessages = async () => {
    try {
      const response = await fetch(`${API_URL}/generate`, {
        method: "POST",
      });
      if (!response.ok) {
        throw new Error("Failed to generate messages");
      }
      fetchQueues();
      if (selectedQueue) {
        handleGetAllMessages();
      }
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  console.log("message", message?.content);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f3f4f6",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "16px",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
          maxWidth: "500px",
          width: "100%",
        }}
      >
        <h1
          style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "24px" }}
        >
          Voyantis Queue Manager
        </h1>
        <div style={{ display: "flex", marginBottom: "16px" }}>
          <select
            value={selectedQueue}
            onChange={(e) => setSelectedQueue(e.target.value)}
            style={{
              flex: 1,
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #d1d5db",
            }}
          >
            <option value="">Select a queue</option>
            {Object.entries(queues).map(([name, count]) => (
              <option key={name} value={name}>{`${name} (${count})`}</option>
            ))}
          </select>
          <button
            onClick={handleGetMessage}
            style={{
              marginLeft: "8px",
              padding: "8px 16px",
              backgroundColor: "#3b82f6",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Get Message
          </button>
          <button
            onClick={handleGetAllMessages}
            style={{
              marginLeft: "8px",
              padding: "8px 16px",
              backgroundColor: "#10b981",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Get All
          </button>
        </div>
        <div style={{ display: "flex", marginBottom: "16px" }}>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Enter new message"
            style={{
              flex: 1,
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #d1d5db",
            }}
          />
          <button
            onClick={handleAddMessage}
            style={{
              marginLeft: "8px",
              padding: "8px 16px",
              backgroundColor: "#f59e0b",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Add Message
          </button>
        </div>
        <button
          onClick={handleGenerateMessages}
          style={{
            width: "100%",
            padding: "8px 16px",
            backgroundColor: "#8b5cf6",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginBottom: "16px",
          }}
        >
          Generate Random Messages
        </button>
        {message && (
          <div>
            <h2
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                marginBottom: "8px",
              }}
            >
              Last Retrieved Message:
            </h2>
            <pre
              style={{
                backgroundColor: "#f3f4f6",
                padding: "8px",
                borderRadius: "4px",
                overflowX: "auto",
              }}
            >
              {message}
            </pre>
          </div>
        )}
        {allMessages.length > 0 && (
          <div>
            <h2
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                marginBottom: "8px",
              }}
            >
              All Messages:
            </h2>
            {allMessages.map((msg, index) => (
              <pre
                key={index}
                style={{
                  backgroundColor: "#f3f4f6",
                  padding: "8px",
                  borderRadius: "4px",
                  overflowX: "auto",
                  marginBottom: "8px",
                }}
              >
                {JSON.stringify(msg, null, 2)}
              </pre>
            ))}
          </div>
        )}
        {error && (
          <div
            style={{
              backgroundColor: "#fee2e2",
              color: "#991b1b",
              padding: "16px",
              borderRadius: "4px",
              marginTop: "16px",
            }}
          >
            <strong>Error:</strong> {error}
          </div>
        )}
      </div>
    </div>
  );
}
