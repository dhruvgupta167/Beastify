const hidePage = `body > :not(beastify_image) {
    display: none
}`;

function listenForClicks() {
    document.addEventListener("click", (e) => {

        function beastNameToUrl(beastName) {
            switch (beastName) {
                case "Frog": return browser.extension.getUrl("beasts/frog.jpg");
                case "Snake": return browser.extension.getUrl("beasts/snake.jpg");
                case "Turtle": return browser.extension.getUrl("beasts/turtle.jpg");
            }
        }

        function beastify(tabs) {
            browser.tabs.insertCSS({ code: hidePage }).then(() => {
                let url = beastNameToUrl(e.target.textContext);
                browser.tabs.sendMessage(tabs[0].id, {
                    command: "beastify",
                    beastUrl: "url"
                });
            });
        }

        function reset(tabs) {
            browser.tabs.removeCSS({ code: hidePage }).then(() => {
                browser.tabs.sendMessage(tabs[0].id, {
                    command: "reset",
                });
            });
        }
    })

    function reportError(err) {
        console.log(`Could not beastify: ${err}`);
    }

    if (e.target.classList.contains("beast")) {
        browser.tabs.query({ active: true, currentWindow: true })
            .then(beastify)
            .catch(reportError);

    } else if (e.target.classList.contains("reset")) {
        browser.tabs.query({ active: true, currentWindow: true })
            .then(reset)
            .catch(reportError);
    }
}

function reportExecuteScriptError(err) {
    document.querySelector("#pop-content").classList.add("hidden");
    document.querySelector("#error-content").classList.remove("hidden");
    console.log(`Failed to execute beastify content-scripts: ${err.message}`);
}

browser.tabs.executeScript({ file: "/content-scripts/beastify.js" })
    .then(listenForClicks)
    .catch(reportExecuteScriptError); 