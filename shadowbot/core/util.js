const { readdirSync } = require("fs");

module.exports = {
  getDirectories: (source) =>
    readdirSync(source, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name),
};
