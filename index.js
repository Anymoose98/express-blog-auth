const express = require('express');
const app = express();
const port = 3000;
const dolciRouter = require("./router/dolciRouter");
const users = require("./db/users.json");
const jwt = require("./middlewares/jwtToken");

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.post('/login', (req, res) => {
    // const { username, password } = req.body;
    const { username, password } = req.query;
    console.log(username, password);
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
        return res.status(404).send('Credenziali errate');
    }
    const token = jwt.generateToken(user);
    res.send(token);
});


app.get("/", (req, res) => {
    res.send('<h1>Pagina iniziale</h1>');
});


app.use("/dolci", dolciRouter);

app.use(jwt.authenticateWithJWT);

app.get("/dent")

app.listen(port, () => {
    console.log(`Server http://localhost:${port}`);
});