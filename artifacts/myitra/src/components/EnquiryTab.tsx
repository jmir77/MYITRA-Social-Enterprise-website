import React, { useState } from "react";

export default function EnquiryTab() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    // PASTE YOUR GOOGLE APPS SCRIPT WEB APP URL HERE
    const GOOGLE_SCRIPT_URL =
      "https://script.google.com/macros/s/AKfycbwFbi45XgrbrLojHJ8v9Tf-jlsso6q9mtIB-Oe900hL3HL1He3B4SKNVqnhPb-Km9U/exec";

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
      alert("Thank you! Your inquiry has been sent directly to us.");
    } catch (error) {
      console.error("Submission failed:", error);
      setStatus("error");
      alert("Something went wrong. Please check your internet connection.");
    } finally {
      setStatus("idle");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Enquiry Tab</h2>
      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Name</label>
          <input
            type="text"
            style={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Email Address</label>
          <input
            type="email"
            style={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Inquiry Details</label>
          <textarea
            rows={5}
            style={styles.textarea}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your inquiry here..."
            required
          />
        </div>

        <button
          type="submit"
          style={styles.button}
          disabled={status === "sending"}
        >
          {status === "sending" ? "Sending..." : "Inquire"}
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "500px",
    margin: "40px auto",
    padding: "30px",
    fontFamily: '"Poppins", sans-serif',
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    borderRadius: "8px",
    background: "#ffffff",
  },
  title: { margin: "0 0 20px 0", color: "#333333" },
  formGroup: { marginBottom: "20px" },
  label: {
    display: "block",
    marginBottom: "6px",
    fontWeight: 600,
    color: "#555555",
  },
  input: {
    width: "100%",
    padding: "10px",
    border: "1px solid #cccccc",
    borderRadius: "4px",
    boxSizing: "border-box" as const,
    fontSize: "14px",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    border: "1px solid #cccccc",
    borderRadius: "4px",
    boxSizing: "border-box" as const,
    fontSize: "14px",
    resize: "vertical" as const,
  },
  button: {
    width: "100%",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    padding: "12px",
    fontSize: "16px",
    fontWeight: "bold",
    borderRadius: "4px",
    cursor: "pointer",
  },
};
