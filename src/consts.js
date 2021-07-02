let path, app;

try {
    path = window.require("path");
    app = window.require("electron").remote.app;
}
catch {
    path = require("path");
    app = require("electron").app;

}

module.exports = {
    encountersPath: path.join(app.getPath("userData"), "encounters"),
    avatarsPath: path.join(app.getPath("userData"), "avatars")
}