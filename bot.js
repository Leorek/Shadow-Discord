const { resolve } = require("path");
const { getDirectories } = require("./shadowbot/core/util");

console.log("Starting Shadow RE");

console.log("Loading clients");

const clients = getDirectories(resolve(__dirname, "./shadowbot/clients"));

console.log("Found these clients: ", clients);
