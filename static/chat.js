(function () {
    let iframeElement = null;
    function findScriptElementBySrc(src) {
        var scriptElements = document.querySelectorAll('script');
        for (var i = 0; i < scriptElements.length; i++) {
            if (scriptElements[i].src === src) {
                return scriptElements[i];
            }
        }
        return null;
    }
    // var scriptUrl = 'https://trycitadel.com/script.js'; // Update with the correct URL
    var scriptUrl = 'https://mx-abhishek.vercel.app/chat.js';
    var scriptElement = findScriptElementBySrc(scriptUrl);
    if (!scriptElement) { return; }

    var siteUid = scriptElement.getAttribute('data-site'); var customerDomain = scriptElement.getAttribute('data-domain'); var widgetIdentifier = scriptElement.getAttribute('widget');

    function createButtonAndWidget() {
        var buttonElement = document.createElement('button');
        buttonElement.id = 'citadel-button';
        buttonElement.innerText = 'Open Widget';
        buttonElement.style.position = 'fixed';
        buttonElement.style.bottom = '20px';
        buttonElement.style.right = '20px';
        buttonElement.style.padding = '10px';
        buttonElement.style.backgroundColor = '#007bff';
        buttonElement.style.color = '#fff';
        buttonElement.style.border = 'none';
        buttonElement.style.borderRadius = '5px';
        buttonElement.style.cursor = 'pointer';
        buttonElement.style.zIndex = '9999';
        document.body.appendChild(buttonElement);

        function openWidget() {
            iframeElement = document.createElement('iframe');
            iframeElement.id = 'citadel-iframe';
            iframeElement.src = 'https://mx-abhishek.vercel.app/help/mobile'; // Replace with the desired website URL
            iframeElement.style.position = 'fixed';
            if (window.innerWidth < 768) {
                iframeElement.style.height = '100vh';
                iframeElement.style.width = '100vw';
                iframeElement.style.bottom = '0';
                iframeElement.style.right = '0';
            } else if (screen.width < 768) {
                iframeElement.style.height = '100vh';
                iframeElement.style.width = '100vw';
                iframeElement.style.bottom = '0';
                iframeElement.style.right = '0';
            } else {
                iframeElement.style.height = '80vh';
                iframeElement.style.width = '450px';
                iframeElement.style.bottom = '20px';
                iframeElement.style.right = '20px';
            }
            iframeElement.style.border = 'none';
            iframeElement.style.borderRadius = '5px';
            iframeElement.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.2)';
            iframeElement.style.zIndex = '999999';
            iframeElement.style.backgroundColor = '#fff';
            document.body.appendChild(iframeElement);

            iframeElement.contentWindow.postMessage({ message: 'iframe_opened' }, '*');
            // hide the button
            buttonElement.style.display = 'none';
        }
        buttonElement.addEventListener('click', openWidget);
    }
    createButtonAndWidget();
    iframeElement = document.getElementById('citadel-iframe');
    window.addEventListener('message', function (event) {
        if (event.data.message === 'close_iframe') {
            iframeElement.remove();
            // show the button
            document.getElementById('citadel-button').style.display = 'block';
        }
    });
    window.addEventListener('resize', function () {
        iframeElement = document.getElementById('citadel-iframe');
        if (!iframeElement) { return; }
        if (window.innerWidth < 768) {
            iframeElement.style.height = '100vh';
            iframeElement.style.width = '100vw';
            iframeElement.style.bottom = '0';
            iframeElement.style.right = '0';
        } else if (screen.width < 768) {
            iframeElement.style.height = '100vh';
            iframeElement.style.width = '100vw';
            iframeElement.style.bottom = '0';
            iframeElement.style.right = '0';
        } else {
            iframeElement.style.height = '80vh';
            iframeElement.style.width = '450px';
            iframeElement.style.bottom = '20px';
            iframeElement.style.right = '20px';
        }
    });

    window.addEventListener('beforeunload', function () {
        if (iframeElement) {
            iframeElement.remove();
            document.getElementById('citadel-button').removeEventListener('click', function () { });
        }
        window.removeEventListener('message', function () { });
        window.removeEventListener('resize', function () { });
        window.removeEventListener('beforeunload', function () { });
    });
})();