"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isGif(file) {
    var gifValidator = new RegExp("(.*?).(gif)$");
    return gifValidator.exec(file);
}
exports.isGif = isGif;