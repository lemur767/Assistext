import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "../styles/Settings.css";

const Settings: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { session, isAuthenticated } = useAuth();

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
      if (!isAuthenticated || !session) {
        throw new Error("User not authenticated.");
      }

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/v1/training-data", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.token}`,
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
    <div className="settings_container">
      <header className="settings_header glass-morphism shadow-lg">
        <h2 className="settings_headerTitle gradient-text-brand">Settings</h2>
        <nav>
          <Link to="/subscription" className="btn btn-ghost">Manage Subscription</Link>
        </nav>
      </header>

      <main className="settings_mainContent">
        <div className="settings_settingsCard glass-morphism">
          <form onSubmit={handleUpload} className="settings_form">
            <div className="settings_formSection">
              <h3 className="settings_formSectionTitle text-neutral-text">Upload Training Data</h3>
              <p className="settings_formSectionDescription text-neutral-text/60">
                Upload a .txt file of your past conversations to help the AI learn your style.
              </p>
            </div>
            
            <div>
              <label htmlFor="file-upload" className="settings_fileUploadLabel text-neutral-text">Training File</label>
              <div className="settings_fileUploadArea border-neutral-border hover:border-primary">
                <div className="settings_fileUploadContent text-neutral-text/60">
                  <svg className="settings_fileUploadIcon" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="settings_fileUploadTextContainer">
                    <label htmlFor="file-upload" className="settings_fileUploadButton text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary">
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" className="settings_fileUploadInput" accept=".txt" onChange={handleFileChange} />
                    </label>
                    <p className="settings_fileUploadDragDropText">or drag and drop</p>
                  </div>
                  <p className="settings_fileUploadHint">TXT up to 10MB</p>
                  {file && <p className="settings_fileName text-success">{file.name}</p>}
                </div>
              </div>
            </div>

            <button type="submit" disabled={loading || !file} className="settings_submitButton btn btn-primary">
              {loading ? "Uploading..." : "Upload"}
            </button>
          </form>
          {message && <p className={`settings_message ${message.includes("successfully") ? "text-success" : "text-error"}`}>{message}</p>}
        </div>
      </main>
    </div>
  );
};

export default Settings;
