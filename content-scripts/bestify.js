(function () {

    if(window.hasRun) {
        return;
    }

    window.hasRun = true;

    function insertBeast(eastUrl) {
        removeExistingBeasts();
        let beastImage = document.createElement("img");
        beastImage.setAttribute("src", BeastUrl);
        beastImage.style.height = "100vh";
        beastImage.className = "beastify-image";
        document.body.appendChild(beastImage);
    }

    function removeExistingBeasts () {
        let existingBeasts = document.querySelectorAll(".beastify-image");

        for(let beast of existingBeasts) {
            beast.remove();
        }
    }

    browser.runtime.onMessage.addListener ((message) => {
        if(message.command === "beastify") {
            insertBeast(message.beastUrl);
        } else if (message.command === "reset") {
            removeExistingBeasts();
        }
    })

})();