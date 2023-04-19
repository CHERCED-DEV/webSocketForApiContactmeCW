const mongoose = require('mongoose');
const { uriDb } = require('./config');

const conn = {
    isConected: false,
}

async function dbConnect() {
    if (conn.isConected) return;
    const db = await mongoose.connect(uriDb || "");
    conn.isConected = db.connections[0].readyState ? true : false;
    console.log(db.connection.db.databaseName);
}

mongoose.connection.on("connected", () => {
    console.log("Mongo Its Running on CHERCED WORLD!")
});

mongoose.connection.on("error", (err) => {
    console.log(err)
});

module.exports = dbConnect;