# Beastify

**What it does**

The extension includes:
- a browser action with a popup including HTML, CSS, and JS
- a content script
- three images, each of a different beast, packaged as web accessible resources

When the user clicks the browser action button, the popup is shown, enabling the user to choose one of three beasts.

When it is shown, the popup injects a content script into the current page.

When the user chooses a beast, the extension sends the content script a message containing the name of the chosen beast.

When the content script receives this message, it replaces the current page content with an image of the chosen beast.

When the user clicks the reset button, the page reloads, and reverts to its original form.

