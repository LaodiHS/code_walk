const { GenerateDomResources } = require("./lib/nodeModuleFileResource.js");
const fs = require("fs")

let script_and_style_dependencies = new GenerateDomResources();
var express = require("express");
const listenersEmitters = require("./Listeners_Emitters");
var app = express();
const port = process.env.PORT || 8080;
app.use(express.json())
const path = require("path");

const { write_file } = require("./lib/write_to_file.js");


(async () => {
  let i = 0;
  // const tab = await require("../lib/puppeteer_module.js").start();
  const editor_instances = {};

  const error_messages = {};

  const log_to_client = {
    logging: {
      string: (type_, socket) => {
        const correct_type = typeof type === "string";
        socket.emit(logging, { data: { editor_saved: correct_type } });
        return correct_type;
      },
    },
  };


  const { scripts, styles } = await script_and_style_dependencies.getAllScripts(
    [
      "codemirror.theme.files",
      "codemirror.lib.files",
      "codemirror.mode.javascript.files",
      "codemirror.mode.clike.files",
      "codemirror.addon.selection.files",
      "codemirror.addon.edit.files",
      "codemirror.addon.search.files",
      "codemirror.addon.lint.files",
      "codemirror.addon.hint.files",
      "codemirror.addon.dialog.files",
      "jshint.dist.files",
      "gridstack.dist.files",
      "axios.dist.files"
    ]
  );


// <link rel="stylesheet" href="public/styles.css"></link>
// <script type="text/javascript" src=" public/scripts.js">
// <script>
// ${scripts}
// <script src="static/socket.io-client/dist/socket.io.js"></script>
// ${styles}
// styles





  app
    .use("/static", express.static("./node_modules"))
    .use("/public", express.static("./public"))
    .set("views", path.join(__dirname, "views"))

    .get("/", (req, res) =>
      res.send(`<!DOCTYPE html>
      <html>
          <head>
              <meta charset="utf-8">
              <title>Socket.io Code Editor</title>
              <link rel="icon" type="image/x-icon" href="/public/favicon.ico">
           ${styles}
              <link rel="stylesheet" href="public/css1.css">
          </head>
          <body>
             <script type="text/javascript" src=" public/scripts1.js"></script>
              <script>
              document.addEventListener("DOMContentLoaded", function () {
                const socket = io(window.location.host);
                socket.on(
                    "socket_connect", (editor_) => {                
                      eval(editor_.editor.editor_options.dom[0])
                    })
                    
                     Array.from(document.querySelectorAll("script")).map(node => node.remove())
              });
              </script>
          
          </body>
      </html>`)
    );


app.post('/schema', async function(req, res){

  const {schema, password} = req.body;
  if(password === "I haven't got a thing to know."){
  await  fs.promises.writeFile(path.join(__dirname, 'public/schema.json'), schema, {encoding:"utf8"});
  res.status(200).send("good");
  }
})


  var http = require("http").Server(app);

  var io = require("socket.io")(http);

  io.on("disconnect", (socket) => {
    socket.close();
  });


  io.on("connection", (socket) => {
    let uniqueId =
      socket.handshake.headers["user-agent"] + socket.handshake.address;
    if (!editor_instances[uniqueId]) {
      const { editor_model
      } = require("./editor_model.js")
      editor_instances[uniqueId] = new editor_model("", uniqueId);
    }
    const editor = editor_instances[uniqueId];

    socket.emit("socket_connect", { editor: editor.start_editor() });

    listenersEmitters.server.listeners.forEach((node) => {
      socket.on(node.socket_flag, ({ data }) => {
        // console.log("data", data);
      });
    });

    // socket.on(`url`, (url) => {
    //   (async (url) => {
    //     console.log("url-->", url);

    //   //   await tab
    //   //     .goto(url.data, {
    //   //       waitUntil: "networkidle0",
    //   //     })
    //   //     .then((data) => {
    //   //       return data;
    //   //     })

    //   //     .catch(console.error);
    //   //   const data = await tab.evaluate(() => {});
    //    })(url);

    // });

    socket.on("editorText", (data) => {
      // console.log("data:", data);
    });
  });




  http.listen(port, () => {
    // will start once server starts
    console.error(`Listening on ${8080}`);
  });


})();


