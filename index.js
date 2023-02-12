const app = require("./src/14.Hashing-and-shalting-Auth/app.js");
const port = 3000;

app.get("/", (req, res) => res.send({ message: "Server Active" }));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
