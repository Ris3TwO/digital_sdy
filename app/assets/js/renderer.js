// window.$ = window.jQuery = require('jquery');

const webview = document.querySelector('webview')
webview.addEventListener('dom-ready', () => {
    // webview.openDevTools()
    const indicator = document.querySelector('.indicator')

    const loadstart = () => {
        indicator.innerText = 'Cargando...'
    }

    const loadstop = () => {
        indicator.innerText = ''
    }

    const ses = webview.getWebContents().session
    document.getElementById('dataDeleting').addEventListener("click", event => {
        ses.clearStorageData([storages => 'cookies'], function(data) {
            console.log(data);
        })
        webview.clearStorageData()
        webview.clearHistory()
        webview.addEventListener('did-start-loading', loadstart)
        webview.addEventListener('did-stop-loading', loadstop)
    });


    //Testing
    // $(document).ready(function() {
    document.getElementById('profiles').addEventListener("click", event => {
        document.getElementById('viewer').setAttribute('src', 'https://www.netflix.com/manageprofiles');
        webview.addEventListener('did-start-loading', loadstart)
        webview.addEventListener('did-stop-loading', loadstop)
    });

    document.getElementById('password').addEventListener("click", event => {
        document.getElementById('viewer').setAttribute('src', 'https://www.netflix.com/password');
        webview.addEventListener('did-start-loading', loadstart)
        webview.addEventListener('did-stop-loading', loadstop)
    });

    document.getElementById('plan').addEventListener("click", event => {
        document.getElementById('viewer').setAttribute('src', 'https://www.netflix.com/changePlan');
        webview.addEventListener('did-start-loading', loadstart)
        webview.addEventListener('did-stop-loading', loadstop)
    });

    document.getElementById('history').addEventListener("click", event => {
        document.getElementById('viewer').setAttribute('src', 'https://www.netflix.com/viewingactivity');
        webview.addEventListener('did-start-loading', loadstart)
        webview.addEventListener('did-stop-loading', loadstop)
    });

    // Netflix login
    document.getElementById('login').addEventListener("click", event => {
        document.getElementById('viewer').setAttribute('src', 'https://www.netflix.com/login');
        webview.addEventListener('did-start-loading', loadstart)
        webview.addEventListener('did-stop-loading', loadstop)
    });

    document.getElementById('loginhelp').addEventListener("click", event => {
        document.getElementById('viewer').setAttribute('src', 'https://www.netflix.com/loginhelp');
        webview.addEventListener('did-start-loading', loadstart)
        webview.addEventListener('did-stop-loading', loadstop)
    });

    document.getElementById('correo').addEventListener("click", event => {
        document.getElementById('viewer').setAttribute('src', 'https://tempr.email/');
        webview.addEventListener('did-start-loading', loadstart)
        webview.addEventListener('did-stop-loading', loadstop)
    });
    // });
})

webview.addEventListener('new-window', (e) => {
    const protocol = require('url').parse(e.url).protocol
    if (protocol === 'http:' || protocol === 'https:') {
        document.getElementById('viewer').setAttribute('src', e.url);
        webview.addEventListener('did-start-loading', loadstart)
        webview.addEventListener('did-stop-loading', loadstop)
    }
})

const remote = require('electron').remote;

// When document has loaded, initialise
document.onreadystatechange = () => {
    if (document.readyState == "complete") {
        handleWindowControls();
    }
};

function handleWindowControls() {

    let win = remote.getCurrentWindow();
    // Make minimise/maximise/restore/close buttons work when they are clicked
    document.getElementById('min-button').addEventListener("click", event => {
        win.minimize();
    });

    document.getElementById('max-button').addEventListener("click", event => {
        win.maximize();
    });

    document.getElementById('restore-button').addEventListener("click", event => {
        win.unmaximize();
    });

    document.getElementById('close-button').addEventListener("click", event => {
        win.close();
    });

    // Toggle maximise/restore buttons when maximisation/unmaximisation occurs
    toggleMaxRestoreButtons();
    win.on('maximize', toggleMaxRestoreButtons);
    win.on('unmaximize', toggleMaxRestoreButtons);

    function toggleMaxRestoreButtons() {
        if (win.isMaximized()) {
            document.body.classList.add('maximized');
        } else {
            document.body.classList.remove('maximized');
        }
    }
}

// $(".nav li").hover(function() {
//     $(this).children("ul").stop().delay(200).animate({ height: "toggle", opacity: "toggle" }, 200);
// });