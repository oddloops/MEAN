import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectToDatabase } from "./database";

// Load environment variables from the .env file
dotenv.config();

const { ATLAS_URL } = process.env;

if (!ATLAS_URL) {
    console.error(
        "No ATLAS_URL environment variable has been defined in config.env"
    );
    process.exit(1);
}

connectToDatabase(ATLAS_URL)
    .then(() => {
        const app = express();
        app.use(cors());

        // start the Express server
        app.listen(5200, () => {
            console.log(`Server running at http://localhost:5200...`);
        })
    })
    .catch((error) => console.error(error));