import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import EmailSender from "./sendEmail.js";

// dotenv.config();
const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
// app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
app.use(cors({ origin: "http://localhost:3000" }));



// ****** SEND API
app.post("/send", async (req, res) => {
  try {
    // const { firstName, lastName, companyName, email, phone, query, message} = req.body
    const reqData = req.body
    EmailSender(reqData)
    res.json({ msg: "Your message sent successfully" });
  } catch (error) {
    res.status(404).json({ msg: "Error ❌" });
  }
});

app.listen(5000, () => {
  console.log(`Server is connected`)
});
