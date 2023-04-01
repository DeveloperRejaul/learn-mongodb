const app = require("./src/10._file_upload_to_databass/app.js");
const port = 3000;

app.get("/", (req, res) => res.send({ message: "Server Active" }));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
