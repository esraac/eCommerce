import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast.error("All fields are required!");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address!");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${backendUrl}/api/contact`, {
        name,
        email,
        message,
      });
      console.log("Backend URL:", backendUrl);
      if (response.data.success) {
        toast.success("Message sent successfully!");
        setName('');
        setEmail('');
        setMessage('');
      } else {
        toast.error(response.data.message || "Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      console.error("Error details:", error.response?.data)
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Contact Support</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-semibold">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="Your Name"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-semibold">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="Your Email"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-semibold">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full border p-2 rounded"
            rows="4"
            placeholder="Your Message"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 text-white rounded ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}
