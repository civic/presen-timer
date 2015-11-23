chrome.app.runtime.onLaunched.addListener(function() {
    chrome.app.window.create('index.html', {
        outerBounds: {
            width: 220,
            height: 150,
        },
        frame: {
            type: "none",
        },
        alwaysOnTop: true
    });
});
