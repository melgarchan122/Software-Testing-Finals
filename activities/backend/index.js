import express from `express`;
import dotenv from `dotenv`;

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
let data = []; 

app.use(express.json());

//routes
app.get("/", (req, res) => {
    res.send("Hello World");
});


app.post("/login", (req, res) => {
      const {username, password} = req.body; // destructing assignment JSON object
   
      // Basic validation
    if (!username || !Password || !role){
        return res.status(400).send("username, password and role fields are required"); // 400 Bad Request
    }
     
    // Simulate user Authentication
    const user = data.find(
        (u) => u.username === username && u.password === password);
       
        // Log the registered users
        if (user) { 
        res.send(`User${user.name} logged in successfully`);
    } else {
        res.status(401).send("Invalid username or password"); //401 Unauthorized 
    }
});

app.post("/register", (req, res) => {
    const { username, name, password,  role } = req.body;
      
    // Basic validation
    if (!username || !Password || !role){
        return res.status(400).send("username, password and role fields are required"); // 400 Bad Request
    }
   
    // store user data in memory (for demonstration)
    data.push({ username, name, password, role});

    // Log the registered users
    console.log("Registered Users:", data);

    // Simulate user Registration
    res.send(`User ${username}`)
})

app.post("/logout", (req, res) => {
    // Simulate User logout
    res.send("User Logged out successfully");

});

app.listen(port, () =>{
    console.log(`server is running on port ${port} registered successfully`);
});