import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../App";

const Settings: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const auth = useAuth();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setMessage("Please select a file to upload.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      if (!auth?.session) {
        throw new Error("User not authenticated.");
      }

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/v1/training-data", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${auth.session.token}`,
        },
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || data.error);

      setMessage("File uploaded successfully!");
    } catch (err: unknown) {
      setMessage((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Settings</h2>
      <nav>
        <Link to="/subscription">Manage Subscription</Link>
      </nav>
      <form onSubmit={handleUpload}>
        <h3>Upload Training Data</h3>
        <p>
          Upload a .txt file of your past conversations to help the AI learn
          your style.
        </p>
        <div>
          <input type="file" accept=".txt" onChange={handleFileChange} />
        </div>
        <button type="submit" disabled={loading || !file}>
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Settings;
