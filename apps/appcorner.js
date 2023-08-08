CreateWindowWithTemplate("apphtml/appcorner").then(glasswindow => {
    function refresh() {
        glasswindow.element.querySelector(".listview").textContent = "";
        for (const app in PersistantData.Apps) {
            if (Object.hasOwnProperty.call(PersistantData.Apps, app)) {
                const appname = PersistantData.Apps[app];
                let button = document.createElement("button");
                button.innerText = appname;
                let to_open = app;
                button.onclick = _ => {
                    LoadApplication(to_open);
                };
                glasswindow.element.querySelector(".listview").appendChild(button);
            }
        }
    }

    refresh();
    glasswindow.element.querySelector(".refresh").onclick = refresh;
    glasswindow.element.style.minHeight = "20em";
    glasswindow.element.style.minWidth = "30em";
    glasswindow.element.style.height = "22em";
    glasswindow.element.style.width = "30em";
    glasswindow.element.style.bottom = "0em";
    glasswindow.element.style.left = "0em";
});
