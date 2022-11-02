const express = require('express');
const app = express();
const cors = require('cors');


//middleware
app.use(cors());
app.use(express.json())

// app.get('/', (req, res) => {
//     res.send("server working fine")
// })

const userRoutes = require('./routes/user.routes')

app.use('/api/v1/users', userRoutes)



module.exports = app