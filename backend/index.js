import express from "express"
import { configDotenv } from "dotenv"
import cors from "cors"
configDotenv();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors({
    origin:["*"]
}))

app.use(express.json())


app.use("/",(req,res) => {
    res.json({"message":"Welcome to the server..."})
})


app.listen(PORT, () => {
    console.log(`Server has started on URL: http://localhost:${PORT}`)
})
