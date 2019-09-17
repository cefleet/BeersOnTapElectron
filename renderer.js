const { remote, ipcRenderer } = require('electron')
//just setting up the defaults /// yes some of this is not best practices
let view = "present";
let changeView = new CustomEvent('changeView');
changeView.view = view;
window.dispatchEvent(changeView);

document.addEventListener("keydown", event => {
    switch (event.key) {
        case "Escape":
            if (remote.getCurrentWindow().isFullScreen()) {
                remote.getCurrentWindow().setFullScreen(false);
                view = "admin";
                changeView.view = view;
                window.dispatchEvent(changeView);
            }
            break;
        //uncomment these if you want to have dev tools open up
        case "F12":
            remote.getCurrentWindow().toggleDevTools();
            
    }
});

ipcRenderer.on('viewChanged', function (ev, data) {
    remote.getCurrentWindow().setFullScreen(true);
    view = "present";
    changeView.view = view;
    window.dispatchEvent(changeView);
});

ipcRenderer.on('dataChanged', ()=>{
    if(view === "present"){
        remote.getCurrentWindow().reload();
    }
})


