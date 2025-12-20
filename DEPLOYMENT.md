# Deployment Guide

This repository uses GitHub Actions for Continuous Deployment (CD) to a VPS.

## Prerequisites

### 1. VPS Setup
The deployment script expects the following on your VPS:
-   **Repository Location**: The code must be cloned at `~/Assistext` (user's home directory).
    ```bash
    cd ~
    git clone https://github.com/your-username/Assistext.git
    ```
-   **System Dependencies**:
    -   Python 3.x (with `pip` and `venv` support)
    -   Node.js & npm
    -   Nginx
    -   PostgreSQL (or your configured DB)
-   **Services**:
    -   A systemd service named `assistext-backend` for the Python backend.
    -   Standard `nginx` service.

### 2. GitHub Secrets
You must configure the following **Secrets** in your GitHub repository settings (`Settings` > `Secrets and variables` > `Actions`):

| Secret Name | Description |
| :--- | :--- |
| `VPS_HOST` | The IP address or domain name of your VPS. |
| `VPS_USER` | The username to SSH into (e.g., `ubuntu`, `root`). |
| `VPS_PORT` | The custom SSH port (e.g., `46969`). |
| `SSH_KEY` | The private SSH key (`id_rsa`) used to authenticate with `VPS_USER`. |

### 3. SSH Key Setup (If you haven't done it yet)

1.  **Generate a new key pair** on your local machine (do not use a passphrase for automation):
    ```bash
    ssh-keygen -t ed25519 -C "github-actions-deploy" -f deploy_key
    ```
    This creates `deploy_key` (private) and `deploy_key.pub` (public).

2.  **Add Public Key to VPS**:
    -   Copy the content of `deploy_key.pub`.
    -   SSH into your VPS.
    -   Append the content to `~/.ssh/authorized_keys`:
        ```bash
        echo "PASTE_PUBLIC_KEY_HERE" >> ~/.ssh/authorized_keys
        ```

3.  **Add Private Key to GitHub**:
    -   Copy the content of `deploy_key` (the private key).
    -   Go to GitHub Secrets and create `SSH_KEY`.
    -   Paste the private key content there.

## How it Works

1.  **Trigger**: The workflow runs automatically whenever you **push to the `main` branch**.
2.  **Process**:
    -   GitHub Action connects to your VPS via SSH using the provided secrets.
    -   It navigates to `~/Assistext`.
    -   It executes `./deploy.sh` which:
        -   Pulls the latest code.
        -   Updates Backend & Frontend dependencies.
        -   Runs Database Migrations.
        -   Builds the Frontend.
        -   Restarts the Backend and Nginx services.

## Manual Deployment

You can also trigger the deployment manually by SSHing into your VPS and running:
```bash
cd ~/Assistext
./deploy.sh
```
