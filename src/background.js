/**
 * Browser Action
 */
browser.browserAction.onClicked.addListener(onBrowserActionClicked);

function onBrowserActionClicked() {
  browser.tabs.create({
    url: "/tab-manager.html"
  });
}
