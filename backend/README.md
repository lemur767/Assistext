
To run the backend on a different machine on your network, you need to do the following:

1.  **Copy the `backend` directory to the new machine.**

2.  **Install the dependencies.** Open a terminal on the new machine, navigate to the `backend` directory, and run the following command:

    ```bash
    pip install -r requirements.txt
    ```

3.  **Set up the `.env` file.** Create a new file named `.env` in the `backend` directory and add the following content. **Remember to replace the placeholder values with your actual credentials.**

    ```
    # .env

    # Flask
    SECRET_KEY=your_secret_key
    FLASK_DEBUG=False

    # Database
    # Make sure the database is accessible from the new machine
    DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE

    # JWT
    JWT_SECRET_KEY=your_jwt_secret_key

    # Redis (optional)
    # REDIS_URL=redis://localhost:6379/0

    # SignalWire
    SIGNALWIRE_PROJECT_ID=your_signalwire_project_id
    SIGNALWIRE_API_TOKEN=your_signalwire_api_token
    SIGNALWIRE_SPACE_URL=your_signalwire_space_url
    SIGNALWIRE_PHONE_NUMBER=your_signalwire_phone_number

    # Stripe
    STRIPE_API_KEY=your_stripe_api_key
    STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

    # OpenAI
    OPENAI_API_KEY=your_openai_api_key
    ```

4.  **Run the application with Waitress.** In the same terminal, run the following command:

    ```bash
    waitress-serve --host 0.0.0.0 --port 5000 wsgi:application
    ```

    This will start the backend server and make it accessible to other machines on your network.

**Important Notes:**

*   **Database:** You need to have a PostgreSQL database running and accessible from the new machine. Make sure the `DATABASE_URL` in your `.env` file is correct.
*   **Firewall:** You may need to configure the firewall on the new machine to allow incoming connections on port 5000.
*   **ngrok:** You can still use ngrok to expose the backend to the internet. Just run ngrok on the new machine and point it to the local port 5000.
