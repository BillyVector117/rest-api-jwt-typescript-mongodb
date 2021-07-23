const dotenv = require('dotenv');
const mongoose = require("mongoose");
dotenv.config();

// mongodb+srv://XXXXXXXXX:rXXXXXXXXX@cluster0.0nfke.mongodb.net/XXXXXXXXX?retryWrites=true&w=majority
const URI = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASSWORD}@cluster0.rogia.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;
mongoose
    .connect(URI, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
    .then((event: any) =>
        console.log("Successfully connected to:", event.connection.name)
    )
    .catch((error: object) => console.log("ERROR DETECTED: ", error));
// LocalHost mode
/* mongoose.connect("mongodb://localhost/testApplication", {
})
    .then(db => console.log("Database connected successfully!"))
    .catch(err => console.log(err)) */

