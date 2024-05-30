# 🍿 Semantic Movies Search

This quick project was built as a part of a talk on semantic search to demonstrate the difference between traditional keyword search and semantic search in the context of movies. The goal is to showcase how semantic search can provide more relevant and accurate results compared to simple keyword-based search which most websites like IMDb offer.

## Getting Started

Follow these instructions to set it up locally.

### Prerequisites

-   NodeJS
-   NPM
-   Docker

### Installation

1. Clone the repository.

2. Install the required packages in both the client and the server directories:

    ```sh
    npm install
    ```

3. Set up the movie database:

    - Ensure you have a dataset of movies. You can use an existing dataset or ask for a DB URI from [Nedwize](https://github.com/Nedwize)

4. Run the application on Docker with `docker compose`:

    ```sh
    docker compose up
    ```

5. Add the following environment variables in a `.env` file in the server directory.

    ```env
    MONGO_DB_URI=
    CHROMA_DB_URI=http://localhost:8000
    CHROMA_DB_CREDENTIALS=
    CHROMA_DB_AUTH_PROVIDER=chromadb.auth.token_authn.TokenAuthenticationServerProvider
    ```

6. Trigger the `/api/movies/feed` API to create vector embeddings of the movie dataset. (Feel free to search and tweak with the `BATCH_SIZE` variable to batch embeddings creation according to your specs, I set it to `100` on a Macbook Pro M1 16GB)

7. Test the application out.

### Usage

1. Access the application through your web browser at `http://localhost:3030`.
2. Enter a search query in the search bar.
3. Toggle between `Boring Search` and `Cool Search` to see the difference in results.

## Contributing

Feel free to raise a PR! Your help is appreciated. Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

## Contact

If you have any questions or feedback, feel free to open an issue.

---

Happy Searching!

---

![Semantic Movies Search](https://via.placeholder.com/600x200.png?text=Semantic+Movies+Search+Demo)

# TODO

-   [ ] Deploy on a subdomain
