import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { api } from "../services/api";
import "../styles/Settings_dashboard.css";

const Settings: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { session, isAuthenticated } = useAuth();
  const [keywords, setKeywords] = useState<string[]>([]);
  const [newKeyword, setNewKeyword] = useState("");
  const [includeAiSignature, setIncludeAiSignature] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!isAuthenticated || !session) {
          throw new Error("User not authenticated.");
        }

        const data = await api.get("/users/profile");
        setKeywords(data.user.keyword_triggers || []);
        setIncludeAiSignature(data.user.include_ai_signature || false);
      } catch (err: unknown) {
        setMessage((err as Error).message);
      }
    };
    if (isAuthenticated) {
      fetchProfile();
    }
  }, [isAuthenticated, session]);

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

      await api.post("/training-data", formData);

      setMessage("File uploaded successfully!");
    } catch (err: unknown) {
      setMessage((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddKeyword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyword.trim()) return;

    const updatedKeywords = [...keywords, newKeyword];
    try {
      await api.put("/users/profile/keyword_triggers", {
        keyword_triggers: updatedKeywords,
      });
      setKeywords(updatedKeywords);
      setNewKeyword("");
    } catch (err: unknown) {
      setMessage((err as Error).message);
    }
  };

  const handleRemoveKeyword = async (keywordToRemove: string) => {
    const updatedKeywords = keywords.filter(
      (keyword) => keyword !== keywordToRemove
    );
    try {
      await api.put("/users/profile/keyword_triggers", {
        keyword_triggers: updatedKeywords,
      });
      setKeywords(updatedKeywords);
    } catch (err: unknown) {
      setMessage((err as Error).message);
    }
  };

  const handleSignatureChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSignatureValue = e.target.checked;
    setIncludeAiSignature(newSignatureValue);
    try {
      await api.put("/users/profile/include_ai_signature", {
        include_ai_signature: newSignatureValue,
      });
    } catch (err: unknown) {
      setMessage((err as Error).message);
    }
  };

  return (
    <div className="settings-container">
      <header className="settings-page-header">
        <h2 className="settings-page-title">Settings</h2>
        <nav>
          <Link to="/subscription" className="btn btn-ghost">Manage Subscription</Link>
        </nav>
      </header>

      <main className="settings-content-wrapper">
        <div className="settings-card">
          <div className="settings-group-header">
            <h3 className="settings-group-title">AI Personality</h3>
            <p className="settings-group-description">
              Customize the AI's personality and tone (Pro feature).
            </p>
          </div>
          <Link to="/settings/ai" className="btn btn-primary">Customize</Link>
        </div>

        <div className="settings-card">
          <form onSubmit={handleUpload} className="settings-form">
            <div className="settings-group-header">
              <h3 className="settings-group-title">Upload Training Data</h3>
              <p className="settings-group-description">
                Upload a .txt file of your past conversations to help the AI learn your style.
              </p>
            </div>

            <div>
              <label htmlFor="file-upload" className="settings-field-label">Training File</label>
              <div className="settings-upload-area">
                <div className="settings-upload-content">
                  <svg className="settings-upload-icon" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="settings-upload-label">
                    <label htmlFor="file-upload" className="settings-upload-link">
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" accept=".txt" onChange={handleFileChange} />
                    </label>
                    <p className="description-sm">or drag and drop</p>
                  </div>
                  <p className="description-sm">TXT up to 10MB</p>
                  {file && <p className="settings-file-name">{file.name}</p>}
                </div>
              </div>
            </div>

            <button type="submit" disabled={loading || !file} className="btn btn-primary" style={{ alignSelf: 'flex-end' }}>
              {loading ? "Uploading..." : "Upload"}
            </button>
          </form>
          {message && <p className={`settings-message ${message.includes("successfully") ? "success" : "error"}`}>{message}</p>}
        </div>

        <div className="settings-card">
          <div className="settings-group-header">
            <h3 className="settings-group-title">Keyword Triggers</h3>
            <p className="settings-group-description">
              Get notified when a message contains specific keywords.
            </p>
          </div>
          <form onSubmit={handleAddKeyword} className="settings-form">
            <div className="settings-keyword-input-wrapper">
              <div className="settings-keyword-form-content">
                <input
                  type="text"
                  value={newKeyword}
                  onChange={(e) => setNewKeyword(e.target.value)}
                  placeholder="Add a keyword"
                  className="sr-only"
                />
                <div className="settings-keyword-row">
                  <input
                    type="text"
                    value={newKeyword}
                    onChange={(e) => setNewKeyword(e.target.value)}
                    placeholder="Add a keyword"
                    className="settings-keyword-input"
                  />
                  <button type="submit" className="btn btn-primary">Add</button>
                </div>
              </div>
            </div>
          </form>
          <div className="settings-tags-container">
            {keywords.map((keyword) => (
              <div key={keyword} className="settings-keyword-tag">
                {keyword}
                <button onClick={() => handleRemoveKeyword(keyword)} className="settings-tag-remove-btn">
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="settings-card">
          <div className="settings-group-header">
            <h3 className="settings-group-title">AI Signature</h3>
            <p className="settings-group-description">
              Include a "Sent with AI using Assistext" signature on AI-generated messages.
            </p>
          </div>
          <div className="settings-checkbox-wrapper">
            <input
              id="ai-signature"
              type="checkbox"
              checked={includeAiSignature}
              onChange={handleSignatureChange}
              className="settings-checkbox"
            />
            <label htmlFor="ai-signature" className="settings-checkbox-label">
              Enable AI Signature
            </label>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
