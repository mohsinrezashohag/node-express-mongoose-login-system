const app = require("./app");
const dbConnection = require("./utils/dbConnection");
port = 5000;




//db connection
dbConnection()

app.listen(port, () => {
    console.log("listening to port : ", port);
})