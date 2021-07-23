import app from "./app";
require ("./database");

app.listen(app.get("PORT"), () => {
    console.log("Server on PORT ", app.get("PORT"))
});
