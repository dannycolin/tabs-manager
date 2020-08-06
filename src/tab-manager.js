async function getTabs() {
  let tabs = await browser.tabs.query({});
  let tabList = document.getElementById("tab-list");
  let tabItem;

  for (let tab of tabs) {
    tabItem = document.createElement("li");
    tabItem.className = "tab-item";
    tabItem.textContent = tab.title;
    tabItem.setAttribute("data-tab-id", tab.id);
    tabItem.addEventListener("click", onTabClicked, false);

    tabItemCloseButton = document.createElement("button");
    tabItemCloseButton.textContent = "Close";
    tabItemCloseButton.addEventListener("click", onTabCloseButtonClicked, false);

    tabItem.appendChild(tabItemCloseButton);
    tabList.appendChild(tabItem);
  }
}

function updateTabs(action, tabId, tabTitle) {
  let tabList = document.getElementById("tab-list");
  let tabListChilds = tabList.childNodes;
  let tabItem;

  if (action == "add") {
    tabItem = document.createElement("li");
    tabItem.className = "tab-item";
    tabItem.textContent = tabTitle;
    tabItem.setAttribute("data-tab-id", tabId);
    tabItem.addEventListener("click", onTabClicked, false);

    tabItemCloseButton = document.createElement("button");
    tabItemCloseButton.textContent = "Close";
    tabItemCloseButton.addEventListener("click", onTabCloseButtonClicked, false);

    tabItem.appendChild(tabItemCloseButton);
    tabList.appendChild(tabItem);
  } else if (action == "remove") {
    for (let child = 0; child < tabListChilds.length; child++) {
      let tabListChild = tabListChilds[child];
      let tabListChildId = tabListChild.getAttribute("data-tab-id");
      if (tabListChildId == tabId) {
        tabList.removeChild(tabListChild);
        tabListChild.removeEventListener("click", onTabClicked, false);
      }
    }
  }
}

function onTabCreated(tab) {
  updateTabs("add", tab.id, tab.title);
}
browser.tabs.onCreated.addListener(onTabCreated);

function onTabRemoved(tabId, removeInfo) {
  updateTabs("remove", tabId);
}
browser.tabs.onRemoved.addListener(onTabRemoved);

async function onTabClicked(event) {
  let tab = event.target;
  let tabId = parseInt(tab.getAttribute("data-tab-id"));
  await browser.tabs.update(tabId, { active: true });
}

async function onTabCloseButtonClicked(event) {
  let tab = event.target.parentNode;
  let tabId = parseInt(tab.getAttribute("data-tab-id"));
  await browser.tabs.remove(tabId);
}

function main() {
  getTabs();
}
main();
