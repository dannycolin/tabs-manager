/**
 * Browser Action
 */

async function setTabCounter(event) {
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

function setTabCounterStyle() {
  browser.browserAction.setTitle({ title: "Open Tab Manager" });
  browser.browserAction.setBadgeBackgroundColor({ color: "rgba(0,0,0,0)" });
  browser.browserAction.setBadgeTextColor({ color: "#f9f9fa" });
}

function onTabCreated(tab) {
  setTabCounter("onCreated");
}
browser.tabs.onCreated.addListener(onTabCreated);

function onTabRemoved(tabId, removeInfo) {
  setTabCounter("onRemoved");
}
browser.tabs.onRemoved.addListener(onTabRemoved);

function onBrowserActionClicked() {
  browser.tabs.create({
    url: "/tab-manager.html"
  });
}
browser.browserAction.onClicked.addListener(onBrowserActionClicked);

/*
 * On Startup
 */

function main() {
  setTabCounterStyle();
  setTabCounter();
}
main();
