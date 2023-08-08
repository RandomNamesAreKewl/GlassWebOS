var held_window = null;
var held_offset = [0, 0];

document.addEventListener("mousedown", (e) => {
    if(e.target instanceof HTMLDivElement) {
        if(e.target.classList.contains("titlebar")) {
            held_window = e.target.parentElement;
            held_offset = [
                held_window.offsetLeft - e.clientX,
                held_window.offsetTop - e.clientY
            ];
            held_window.glasswindow.Focus();
        }
    }
    if(e.target instanceof HTMLButtonElement) {
        if(e.target.classList.contains("close") && 
           e.target.parentElement.classList.contains("titlebar")) {
            e.target.parentElement.parentElement.glasswindow.Close();
        }
    }
});

document.addEventListener("mousemove", (e) => {
    if(held_window) {
        held_window.style.left = (e.clientX + held_offset[0]) + "px";
        held_window.style.top = (e.clientY + held_offset[1]) + "px";
    }
});

document.addEventListener("mouseup", (e) => {
    held_window = null;
});
