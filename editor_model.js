const listenersEmitters = require("./Listeners_Emitters");
const ListenerService = require("./ListenerService");

let add_text_area_compile = `function add_text_area(l,y){l=Array.from(l);for(var a={};l.length;){a.$jscomp$loop$prop$updateHints$6=function(b){return function(){var e=b.$jscomp$loop$prop$editor$1.getValue();JSHINT.errors=JSHINT.errors||[];b.$jscomp$loop$prop$editor$1.operation(function(){for(var c=0;c<m.length;++c)b.$jscomp$loop$prop$editor$1.removeLineWidget(m[c]);m.length=0;c=b.$jscomp$loop$prop$editor$1.getValue();JSHINT(c,{esversion:"10"});localStorage.setItem(b.$jscomp$loop$prop$marker$2,c);!JSHINT.errors.length&&e.length&&
b.$jscomp$loop$prop$cached_code$3!==c.trim()&&(b.$jscomp$loop$prop$cached_code$3=c.trim(),setTimeout(function(){y(socket,e.trim())},350));for(c=0;c<JSHINT.errors.length;++c){var q=JSHINT.errors[c];if(q){var n=document.createElement("div"),u=n.appendChild(document.createElement("span"));u.innerHTML="!!";u.className="lint-error-icon";n.appendChild(document.createTextNode(q.reason));n.className="lint-error";m.push(b.$jscomp$loop$prop$editor$1.addLineWidget(q.line-1,n,{coverGutter:!1,noHScroll:!0}))}}});
var r=b.$jscomp$loop$prop$editor$1.getScrollInfo(),v=b.$jscomp$loop$prop$editor$1.charCoords({line:b.$jscomp$loop$prop$editor$1.getCursor().line+1,ch:0},"local").top;r.top+r.clientHeight<v&&b.$jscomp$loop$prop$editor$1.scrollTo(null,v-r.clientHeight+3)}}(a);var d=l.pop(),h=d.querySelector(".textArea"),f=d.querySelector(".select-theme");a.$jscomp$loop$prop$editor$1=void 0;a.$jscomp$loop$prop$marker$2=window.location.href;var w=document.createDocumentFragment(),p=document.createElement("Form");p.id=
"select_a_theme";var g=document.createElement("Label");g["for"]="theme_id";g.innerHTML="Choose a theme";d=document.createElement("SELECT");d.name="themes";d.id="theme_id";p.appendChild(g);p.appendChild(d);g=document.getElementsByTagName("link");for(var x=0;g.length>x;){var k=g[x++];if(k.href.includes("theme")){k=k.href.split("/").pop().split(".").shift();var t=document.createElement("OPTION");t.value=k;t.innerText=k;d.appendChild(t)}w.appendChild(p);f.appendChild(w)}a.$jscomp$loop$prop$cached_code$3=
"";a.$jscomp$loop$prop$ce$4=h;f=localStorage.getItem(a.$jscomp$loop$prop$marker$2);a.$jscomp$loop$prop$ce$4.textContent=f?f:"";a.$jscomp$loop$prop$editor$1=CodeMirror(function(b){return function(e){b.$jscomp$loop$prop$ce$4.parentNode.replaceChild(e,b.$jscomp$loop$prop$ce$4)}}(a),h.code_editor_options);f?a.$jscomp$loop$prop$editor$1.getDoc().setValue(f):null;var m=[];a.$jscomp$loop$prop$waiting$5=void 0;a.$jscomp$loop$prop$editor$1.on("change",function(b){return function(){clearTimeout(b.$jscomp$loop$prop$waiting$5);
b.$jscomp$loop$prop$waiting$5=setTimeout(b.$jscomp$loop$prop$updateHints$6,500)}}(a));setTimeout(a.$jscomp$loop$prop$updateHints$6,100);a.$jscomp$loop$prop$editor$1.setOption("theme","dracula");document.getElementById("url");h=new Map;h.set(d,{type:"click",dep:{editor:a.$jscomp$loop$prop$editor$1},method:function(b,e){return e.editor.setOption("theme",b.target.value)}});ListenerService(h);a={$jscomp$loop$prop$editor$1:a.$jscomp$loop$prop$editor$1,$jscomp$loop$prop$marker$2:a.$jscomp$loop$prop$marker$2,
$jscomp$loop$prop$cached_code$3:a.$jscomp$loop$prop$cached_code$3,$jscomp$loop$prop$ce$4:a.$jscomp$loop$prop$ce$4,$jscomp$loop$prop$waiting$5:a.$jscomp$loop$prop$waiting$5,$jscomp$loop$prop$updateHints$6:a.$jscomp$loop$prop$updateHints$6}}};`

let add_text_area =`
function add_text_area(HtmlNodeArray,listenersEmitters) {
  HtmlNodeArray = Array.from(HtmlNodeArray)
  while (HtmlNodeArray.length) {
    const editor_box = HtmlNodeArray.pop();
    const text_area = editor_box.querySelector(".textArea")
    const theme_select = editor_box.querySelector(".select-theme")

    let editor;
    let marker = window.location.href;
    const frag = document.createDocumentFragment();
    const form = document.createElement("Form");
    form.id = "select_a_theme";
    let label = document.createElement("Label");
    label.for = "theme_id";
    label.innerHTML = "Choose a theme";
    const select = document.createElement("SELECT");
    select.name = "themes";
    select.id = "theme_id";
    form.appendChild(label);
    form.appendChild(select);
    const links = document.querySelectorAll('meta[theme]');
    let i = 0;
    while (links.length > i) {
      const link = links[i++];
    
        const css = link.getAttribute('theme');
        const theme = document.createElement("OPTION");
        theme.value = css;
        theme.innerText = css;
        select.appendChild(theme);
      
      frag.appendChild(form);
      theme_select.appendChild(frag);
    }
    let cached_code = "";

    let ce = text_area
      sessionStorage.clear();
      localStorage.clear();
    //let text_code = localStorage.getItem(marker)
    //ce.textContent = text_code ? text_code : "";
    var text = ce.textContent || ce.innerText || ce.innerHTML || text_area.code_text;
    
    editor = CodeMirror((node) => { ce.parentNode.replaceChild(node, ce) },
      text_area.code_editor_options
    );
    editor.getDoc().setValue(text) 
    var widgets = [];
    function updateHints() {
      let str_code = editor.getValue();
      JSHINT.errors = JSHINT.errors || [];


      editor.operation(function () {

        for (var i = 0; i < widgets.length; ++i)editor.removeLineWidget(widgets[i]);
        widgets.length = 0;
        const str = editor.getValue();


        JSHINT(str, { esversion: "10" });
        // localStorage.setItem(marker, str);
        if (!JSHINT.errors.length && str_code.length && cached_code !== str.trim()) {
          cached_code = str.trim();

          setTimeout(() => {
            
           
            listenersEmitters(socket, str_code.trim());
          }, 350)
        }
        for (var i = 0; i < JSHINT.errors.length; ++i) {
          var err = JSHINT.errors[i];
          if (!err) {
            continue;
          }

          var msg = document.createElement("div");
          var icon = msg.appendChild(document.createElement("span"));
          icon.innerHTML = "!!";
          icon.className = "lint-error-icon";
          msg.appendChild(document.createTextNode(err.reason));
          msg.className = "lint-error";
          widgets.push(editor.addLineWidget(err.line - 1, msg, {
            coverGutter: false,
            noHScroll: true,
          }));
        }
      });
      let info = editor.getScrollInfo();
      let after =
        editor.charCoords({ line: editor.getCursor().line + 1, ch: 0 }, "local")
          .top;
      if (info.top + info.clientHeight < after)
        editor.scrollTo(null, after - info.clientHeight + 3);
    }
    let waiting;
    editor.on(
      "change", function () {
        clearTimeout(waiting);
        waiting = setTimeout(updateHints, 500);
      });

    setTimeout(updateHints, 100);

    editor.setOption("theme", "dracula");

    let urlNode = document.getElementById("url");

    const listenerService = new Map();
    // listenerService.set(urlNode,{type:'keydown', dep:{socket:socket},  method:({socket})=>  socket.emit('url', {url: data.value})   });
    listenerService.set(select, { type: 'click', dep: { editor: editor }, method: (event, { editor }) => editor.setOption("theme", event.target.value) });
    ListenerService(listenerService);

    }
  }`;






class Editor_Model {
  constructor(text_from_server, session_id) {
    this.session_id = session_id;
    this.text_content = text_from_server;
    this.code_editor_options = {
      //mode:"javascript"text/x-c++src
      //
      mode: "javascript",
      lineNumbers: true,
      lineWrapping: true,
      indentWithTabs: true,
      value: this.text_concent,
      styleActiveLine: true,
      matchBrackets: true,
      theme: "solarized",
      // linting option is not documented.
      lint: { esversion: "10" },
      width: "auto",
      gutters: ["CodeMirror-lint-markers"],

      extraKeys: {
        "Ctrl-J": "toMatchingTag",
        "Ctrl-S": function (cm) {
          saveCode(cm); //function called when 'ctrl+s' is used when instance is in focus
        },
        F11: function (cm) {
          toggleFullscreen(cm, true); //function called for full screen mode
        },
        Esc: function (cm) {
          toggleFullscreen(cm, false); //function to escape full screen mode
        },
      },

      dom: [
        `
          // DOM dependency functions
          ${ListenerService.toString()};
         
         
       async  function attachGrid(){
          const children = []
          const gen_x = (x) => x===0 ? 5 : 0
          
            let x = 0;
           let m = 10;
            let y = 1;
            const w = 3;
            const h = 7;
            let c = 0;

          const response = axios.get("/public/schema.json").then(data=> data.data)
          const result = await response
         // console.log('result: ', result)
          for(const file_name in result){  
          
            

           if(c % 2 ===0){
             y += 8
           } 


            let str =  result[file_name]
            children.push({x : x, y : y, w : 3 , h : 8, content: '<div class="editor"><label class="file_label" >'+ file_name +'</label><div class="textArea">'+ result[file_name] +'</div><div class="select-theme"></div></div>' })
            //  console.log(children)
        
          
            c++;
            x =  x ===  5 ? 0 : 5
    
          }
     
            let options = { // main grid options
              cellHeight: 50,
              margin: 5,
              minRow: 5, // don't collapse when empty
              acceptWidgets: true,
              id: 'main',
              children: children  
            };
                                      
            let grid = GridStack.addGrid(document.querySelector("body"), options);
          
    
        return   grid
          }


          async function start_grid(){
            let grid = await attachGrid()

     const editors = grid.el.querySelectorAll(".editor")
     add_text_area(editors, ${listenersEmitters.client.emitters.string_code} )
          }
          start_grid()

${add_text_area}




          `,
      ],
    };
  }

  /** 
    @parameter text {String}
    @parameter session_id {String}
    @parameter socket {Object}
    @return void
    **/
  save_text(text, socket) {
    console.log(
      `client code for ${this.session_id}:  ${log_to_client.logging.string(
        text,
        socket
      )}`
    );
  }
  get_text_content() {
    return this.text_content;
  }
  start_editor() {
    return {
      code_text: this.text_content,
      editor_options: this.code_editor_options,
    };
  }
}
module.exports = ({ editor_model: Editor_Model })