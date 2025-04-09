import express from "express"
import { configDotenv } from "dotenv"
import cors from "cors"
import { createUser, test_drizzle_integration, test_neon_connection } from "./db/pg_db.js";
import { authRouter } from "./routers/AuthRouter.js";
import { doesUserExist, getUserWithEmail } from "./operations/UserOperations.js";
configDotenv();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors({
    origin:["*"]
}))

app.use(express.json()); // <-- This is required to parse JSON requests
app.use(express.urlencoded({ extended: true })); // For form-data parsing

app.use("/auth",authRouter);
app.use("/",(req,res) => {
    res.json({"message":"Welcome to the server..."})
})


app.listen(PORT, async () => {
    console.log(`Server has started on URL: http://localhost:${PORT}`)
    // test_neon_connection();
    // test_drizzle_integration();
    // createUser({name:"Rahul Jauhari",age:21,email:"rj.rahul.jauhari@gmail.com1"});
    // console.log(doesUserExist("rj.rahul.jauhari@gmail.com"))
    // console.log((await getUserWithEmail("rj.rahul.jauhari@gmail.com")))
})
