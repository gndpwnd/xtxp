chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.extensions) {
    var extensionList = document.getElementById("extensionList");
    extensionList.innerHTML = "";

    request.extensions.forEach(function(extension) {
      var link = document.createElement("a");
      link.href = extension.url;
      link.textContent = extension.name;
      link.target = "_blank";

      var listItem = document.createElement("li");
      listItem.appendChild(link);
      extensionList.appendChild(listItem);
    });
  }
});
