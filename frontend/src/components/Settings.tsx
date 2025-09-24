import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../App";
import styles from "./Settings.module.css";

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
    <div className={styles.container}>
      <header className={`${styles.header} glass-morphism shadow-lg`}>
        <h2 className={`${styles.headerTitle} gradient-text-brand`}>Settings</h2>
        <nav>
          <Link to="/subscription" className="btn btn-ghost">Manage Subscription</Link>
        </nav>
      </header>

      <main className={styles.mainContent}>
        <div className={`${styles.settingsCard} glass-morphism`}>
          <form onSubmit={handleUpload} className={styles.form}>
            <div className={styles.formSection}>
              <h3 className={`${styles.formSectionTitle} text-neutral-text`}>Upload Training Data</h3>
              <p className={`${styles.formSectionDescription} text-neutral-text/60`}>
                Upload a .txt file of your past conversations to help the AI learn your style.
              </p>
            </div>
            
            <div>
              <label htmlFor="file-upload" className={`${styles.fileUploadLabel} text-neutral-text`}>Training File</label>
              <div className={`${styles.fileUploadArea} border-neutral-border hover:border-primary`}>
                <div className={`${styles.fileUploadContent} text-neutral-text/60`}>
                  <svg className={`${styles.fileUploadIcon}`} stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className={styles.fileUploadTextContainer}>
                    <label htmlFor="file-upload" className={`${styles.fileUploadButton} text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary`}>
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" className={styles.fileUploadInput} accept=".txt" onChange={handleFileChange} />
                    </label>
                    <p className={styles.fileUploadDragDropText}>or drag and drop</p>
                  </div>
                  <p className={styles.fileUploadHint}>TXT up to 10MB</p>
                  {file && <p className={`${styles.fileName} text-success`}>{file.name}</p>}
                </div>
              </div>
            </div>

            <button type="submit" disabled={loading || !file} className={`${styles.submitButton} btn btn-primary`}>
              {loading ? "Uploading..." : "Upload"}
            </button>
          </form>
          {message && <p className={`${styles.message} ${message.includes("successfully") ? "text-success" : "text-error"}`}>{message}</p>}
        </div>
      </main>
    </div>
  );
};

export default Settings;
