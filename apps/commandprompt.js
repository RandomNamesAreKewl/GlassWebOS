CreateWindowWithTemplate("apphtml/terminal").then(glasswindow => {
    function print(text) {
        glasswindow.element.querySelector(".terminal-output").appendChild(document.createTextNode(text));
    }
    print("Command Prompt 1.0\n");
    glasswindow.element.querySelector(".send").onclick = () => {
        print("\n> " + glasswindow.element.querySelector(".terminal-input").value + "\n");
        eval(glasswindow.element.querySelector(".terminal-input").value);
        glasswindow.element.querySelector(".terminal-input").value = "";
    };
});