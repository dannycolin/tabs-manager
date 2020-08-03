async function getTabs() {
  let tabs = await browser.tabs.query({});
  let tabList = document.getElementById("tab-list");
  let tabItem;

  for (let tab of tabs) {
    tabItem = document.createElement("li");
    tabItem.textContent = "Tab " + tab.id;
    tabItem.setAttribute("data-tab-id", tab.id);
    tabList.appendChild(tabItem);
  }
}

function updateTabs(action, tabId) {
  let tabList = document.getElementById("tab-list");
  let tabListChilds = tabList.childNodes;
  let tabItem;

  if (action == "add") {
    tabItem = document.createElement("li");
    tabItem.textContent = "Tab " + tabId;
    tabItem.setAttribute("data-tab-id", tabId);
    tabList.appendChild(tabItem);
  } else if (action == "remove") {
    for (let child = 0; child < tabListChilds.length; child++) {
      let tabListChild = tabListChilds[child];
      let tabListChildId = tabListChild.getAttribute("data-tab-id");
      if (tabListChildId == tabId) {
        tabList.removeChild(tabListChild);
      }
    }
  }
}

function onTabCreated(tab) {
  updateTabs("add", tab.id);
}
browser.tabs.onCreated.addListener(onTabCreated);

function onTabRemoved(tabId, removeInfo) {
  updateTabs("remove", tabId);
}
browser.tabs.onRemoved.addListener(onTabRemoved);

function main() {
  getTabs();
}
main();
