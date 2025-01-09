const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

//porta
const port= 3768;

app.use(express.json());
//CORS
app.use(cors())

//connection and creation i signup DB
mongoose
.connect('mongodb://localhost:27017/signupDB', {
useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=>{
    console.log('Connected to MongoDB');
})
.catch(err=>{
    console.error('Failed to connect to MongoDB', err)
})

//schema
const userSchema = new mongoose.Schema({
    name: {type:String, required:true},
    email: {type: String, required:true},
    password: {type: String, required: true},
    phone: {type:String, required:true},
});

//modeli
const User = mongoose.model('User', userSchema);

//port methods
app.post('/api/signup', (req,res)=>{
    const {name,email,password,phone} = req.body;
    const newUser = new User ({name, email, password, phone});
    newUser
    .save()
    .then(()=> res.send('Useri u krijua me sukses'))
    .catch((err)=> res.send('Ska shku mire diqka:'+ err.message))
})

//ku eshte serveri
app.listen(port, ()=>{
    console.log(`Server is running at http://localhost:${port}`)
})