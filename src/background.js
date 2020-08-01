/**
 * Browser Action
 */

function setBadge() {
  console.log("hello");
  browser.browserAction.setBadgeText({
    text: "1"
  });
}
setBadge();

async function onTabCreated(tab) {
  let tabs = await browser.tabs.query({});

  browser.browserAction.setBadgeText({
    text: tabs.length.toString()
  });
}
browser.tabs.onCreated.addListener(onTabCreated);

async function onTabRemoved(tabId, removeInfo) {
  let tabs = await browser.tabs.query({});
  let tabsLength = tabs.length - 1;

  browser.browserAction.setBadgeText({
    text: tabsLength.toString()
  });
}
browser.tabs.onRemoved.addListener(onTabRemoved);

function onBrowserActionClicked() {
  browser.tabs.create({
    url: "/tab-manager.html"
  });
}
browser.browserAction.onClicked.addListener(onBrowserActionClicked);
