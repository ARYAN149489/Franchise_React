// server/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 5000;

app.use(cors({
  origin: "http://localhost:5173", // your React app URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully!"))
  .catch(err => console.error("MongoDB connection error:", err));

const applicantRouter = require("./routes/applicant_router.js");
const adminRouter = require("./routes/admin_router.js");
const franchiseRouter = require("./routes/franchise_router.js");

app.use("/api/applicant", applicantRouter);
app.use("/api/admin", adminRouter);
app.use("/api/franchise", franchiseRouter);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port: ${PORT}`);
});