import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

import { api } from "../services/api";

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
    <div className="w-full max-w-[800px] mx-auto mt-[120px] p-8 text-foreground">
      <header className="flex justify-between items-center mb-8 p-4 rounded-lg glass-morphism shadow-lg">
        <h2 className="text-2xl font-bold gradient-text-brand">Settings</h2>
        <nav>
          <Link to="/subscription" className="btn btn-ghost">Manage Subscription</Link>
        </nav>
      </header>

      <main className="flex flex-col gap-8">
        <div className="p-8 rounded-lg bg-card border border-border glass-morphism">
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-foreground">AI Personality</h3>
            <p className="text-sm text-muted-foreground">
              Customize the AI's personality and tone (Pro feature).
            </p>
          </div>
          <Link to="/settings/ai" className="btn btn-primary">Customize</Link>
        </div>

        <div className="p-8 rounded-lg bg-card border border-border glass-morphism mt-8">
          <form onSubmit={handleUpload} className="flex flex-col gap-6">
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-foreground">Upload Training Data</h3>
              <p className="text-sm text-muted-foreground">
                Upload a .txt file of your past conversations to help the AI learn your style.
              </p>
            </div>

            <div>
              <label htmlFor="file-upload" className="block font-semibold text-foreground mb-2">Training File</label>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer transition-colors duration-150 hover:border-primary">
                <div className="flex flex-col items-center gap-4 text-muted-foreground">
                  <svg className="w-12 h-12 text-muted-foreground" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="flex gap-1 items-baseline">
                    <label htmlFor="file-upload" className="font-semibold text-primary cursor-pointer focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary">
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" accept=".txt" onChange={handleFileChange} />
                    </label>
                    <p className="text-sm text-muted-foreground">or drag and drop</p>
                  </div>
                  <p className="text-sm text-muted-foreground">TXT up to 10MB</p>
                  {file && <p className="mt-4 font-semibold text-success">{file.name}</p>}
                </div>
              </div>
            </div>

            <button type="submit" disabled={loading || !file} className="self-end btn btn-primary">
              {loading ? "Uploading..." : "Upload"}
            </button>
          </form>
          {message && <p className={`mt-4 text-center ${message.includes("successfully") ? "text-success" : "text-error"}`}>{message}</p>}
        </div>

        <div className="p-8 rounded-lg bg-card border border-border glass-morphism mt-8">
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-foreground">Keyword Triggers</h3>
            <p className="text-sm text-muted-foreground">
              Get notified when a message contains specific keywords.
            </p>
          </div>
          <form onSubmit={handleAddKeyword} className="flex flex-col gap-6">
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer transition-colors duration-150 hover:border-primary">
              <div className="flex flex-col items-center gap-4 text-muted-foreground">
                <input
                  type="text"
                  value={newKeyword}
                  onChange={(e) => setNewKeyword(e.target.value)}
                  placeholder="Add a keyword"
                  className="sr-only"
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newKeyword}
                    onChange={(e) => setNewKeyword(e.target.value)}
                    placeholder="Add a keyword"
                    className="p-2 border border-border rounded-lg bg-input-background text-foreground focus:outline-none focus:border-primary"
                  />
                  <button type="submit" className="btn btn-primary">Add</button>
                </div>
              </div>
            </div>
          </form>
          <div className="mt-4">
            {keywords.map((keyword) => (
              <div key={keyword} className="inline-flex items-center bg-muted text-foreground rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">
                {keyword}
                <button onClick={() => handleRemoveKeyword(keyword)} className="ml-2 text-destructive bg-transparent border-none cursor-pointer text-xl leading-none transition-colors hover:text-destructive-foreground">
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="p-8 rounded-lg bg-card border border-border glass-morphism mt-8">
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-foreground">AI Signature</h3>
            <p className="text-sm text-muted-foreground">
              Include a "Sent with AI using Assistext" signature on AI-generated messages.
            </p>
          </div>
          <div className="flex items-center">
            <input
              id="ai-signature"
              type="checkbox"
              checked={includeAiSignature}
              onChange={handleSignatureChange}
              className="h-5 w-5 rounded border-border bg-input-background text-primary focus:ring-primary"
            />
            <label htmlFor="ai-signature" className="ml-2 text-sm text-neutral-text">
              Enable AI Signature
            </label>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
