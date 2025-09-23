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
    <div className="min-h-screen">
      <header className="flex items-center justify-between p-4 glass-morphism shadow-lg">
        <h2 className="text-2xl font-bold gradient-text-brand">Settings</h2>
        <nav>
          <Link to="/subscription" className="btn btn-ghost">Manage Subscription</Link>
        </nav>
      </header>

      <main className="p-8">
        <div className="max-w-2xl mx-auto">
          <div className="p-6 rounded-lg glass-morphism">
            <form onSubmit={handleUpload} className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-neutral-text">Upload Training Data</h3>
                <p className="mt-1 text-sm text-neutral-text/60">
                  Upload a .txt file of your past conversations to help the AI learn your style.
                </p>
              </div>
              
              <div>
                <label htmlFor="file-upload" className="block text-sm font-medium text-neutral-text">Training File</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md border-neutral-border hover:border-primary">
                  <div className="space-y-1 text-center">
                    <svg className="w-12 h-12 mx-auto text-neutral-text/60" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="flex text-sm text-neutral-text/60">
                      <label htmlFor="file-upload" className="relative font-medium rounded-md cursor-pointer text-primary hover:text-primary/80 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary">
                        <span>Upload a file</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" accept=".txt" onChange={handleFileChange} />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-neutral-text/60">TXT up to 10MB</p>
                    {file && <p className="text-sm text-success">{file.name}</p>}
                  </div>
                </div>
              </div>

              <button type="submit" disabled={loading || !file} className="w-full btn btn-primary">
                {loading ? "Uploading..." : "Upload"}
              </button>
            </form>
            {message && <p className={`mt-4 text-sm text-center ${message.includes("successfully") ? "text-success" : "text-error"}`}>{message}</p>}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
