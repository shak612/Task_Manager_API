const express = require('express');
const router = require('./routes/tasksRoutes');
const app = express();

const PORT = 3000;

app.use(express.json());

app.use('/api', router);

app.listen(PORT, (err) => {
    if(!err){
        console.log(`Server is running on port ${PORT}`)
    }else{
        console.log("error:-", err)
    }
})