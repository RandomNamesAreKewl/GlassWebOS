var PersistantData = {
    Apps: {}
};
if(document.cookie.split(";").some(item => item.startsWith("persistantdata="))) {
    PersistantData = JSON.parse(document.cookie.split(";").find(item => item.startsWith("persistantdata=")).split("=")[1]);
}
RegisterApp("Command Prompt", "apps/commandprompt.js")

window.addEventListener("unload", _ => {
    document.cookie = "persistantdata=" + JSON.stringify(PersistantData);
});

class GlassWindow {
    OnClose = [];
    OnFocus = [];

    constructor(element) {
        if(!element) {
            this.element = document.createElement("div");
            this.element.classList.add("window");
        } else {
            this.element = element;
        }
        this.element.glasswindow = this;
        this.taskicon = document.createElement("div");
        this.taskicon.classList.add("appicon");
        this.taskicon.addEventListener("click", _ => this.Focus());
        document.getElementById("taskbar").appendChild(this.taskicon);
    }

    Close() {
        this.element.remove();
        this.taskicon.remove();
        for(var i=0; i<this.OnClose.length; i++) {
            this.OnClose[i].call(this);
        }
        delete this;
    }

    Focus() {
        for(var i=0; i<this.OnFocus.length; i++) {
            this.OnFocus[i].call(this);
        }
        this.element.parentElement.appendChild(this.element);
    }

    ListenOnClosed(callback) {
        if(typeof(callback) !== "function")
            return;
        this.OnClose.push(callback);
    }

    ListenOnFocused(callback) {
        if(typeof(callback) !== "function")
            return;
        this.OnFocus.push(callback);
    }
}

function CreateWindowWithTemplate(window_template) {
    return fetch(window_template + ".html").then(res => res.text()).then(text => {
        var template = document.createElement("template");
        template.innerHTML = text.trim();
        var window_content = template.content.firstChild;
        document.getElementById("window-area").appendChild(window_content);
        return new GlassWindow(window_content);
    });
}

function LoadApplication(location) {
    fetch(location).then(res => res.text()).then(app => {
        Function(app)();
    });
}

function RegisterApp(name, location) {
    PersistantData.Apps[location] = name;
}

LoadApplication("apps/appcorner.js");
