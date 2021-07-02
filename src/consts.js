
const path = window.require("path");
const app =  window.require("electron").remote.app;


module.exports = { 
    encountersPath: path.join(app.getPath("userData"), "encounters"), 
    avatarsPath: path.join(app.getPath("userData"), "avatars") 
}