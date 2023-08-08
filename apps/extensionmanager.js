CreateWindowWithTemplate("apphtml/listmanager").then(glasswindow => {
    function AddExtension(extension) {
        var div = document.createElement("div");
        div.style.display = "flex";
        var title = div.appendChild(document.createElement("span"));
        title.textContent = extension;
        title.style.flexGrow = 1;
        var deletebutton = div.appendChild(document.createElement("button"));
        deletebutton.textContent = "Remove";
        deletebutton.onclick = _ => {
            div.remove();
            // Adapted from https://stackoverflow.com/questions/3954438/how-to-remove-item-from-array-by-value
            let index = PersistantData.Extensions.indexOf(extension);
            if(index !== -1) {
                PersistantData.Extensions.splice(index, 1);
            }
        };
        glasswindow.element.querySelector(".listview").appendChild(div);
    }

    glasswindow.element.querySelector(".title").textContent = "Extension Manager";
    for(var i=0; i<PersistantData.Extensions.length; i++) {
        var extension = PersistantData.Extensions[i];
        AddExtension(extension);
    }

    glasswindow.element.querySelector(".add-button").onclick = _ => {
        var location = prompt("Extension location (eg. https://example.com/extension.js)");
        AddExtension(location);
        PersistantData.Extensions.push(location);
    };
});