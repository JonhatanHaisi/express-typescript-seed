const path = require('path');

let configs;

try {
    configs = require(path.resolve("config", "config.js"));
} catch (e) {
    configs = require(path.resolve("src", "config", "config.js"));
}

Object.keys(configs).forEach(key => configs[key] = configs[key]["database"]);

module.exports = configs;