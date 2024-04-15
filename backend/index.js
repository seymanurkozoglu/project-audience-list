const express = require('express');
const cors = require('cors')
const userRoutes = require('./routes/users')

const app = express();
app.use(cors());
app.use(express.json())

app.all("*", userRoutes);

app.use("/",(req,res)=>{
    res.send("Server is running.")
})

app.listen(5000, () => {
    console.log('Connected to backend!');
})