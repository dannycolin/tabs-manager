/**
 * Browser Action
 */


async function setBadge(event) {
  let tabs = await browser.tabs.query({});
  let tabsLength = tabs.length;

  if (event == "onRemoved") {
    tabsLength = tabs.length - 1;
  } else {
    tabsLength = tabs.length;
  }

  browser.browserAction.setBadgeText({
    text: tabsLength.toString()
  });
}
setBadge();

function onTabCreated(tab) {
  setBadge("onCreated");
}
browser.tabs.onCreated.addListener(onTabCreated);

function onTabRemoved(tabId, removeInfo) {
  setBadge("onRemoved");
}
browser.tabs.onRemoved.addListener(onTabRemoved);

function onBrowserActionClicked() {
  browser.tabs.create({
    url: "/tab-manager.html"
  });
}
browser.browserAction.onClicked.addListener(onBrowserActionClicked);
