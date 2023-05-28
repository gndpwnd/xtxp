document.addEventListener("DOMContentLoaded", function() {
    var exportBtn = document.getElementById("exportBtn");
    var importBtn = document.getElementById("importBtn");
    var extensionList = document.getElementById("extensionList");
  
    exportBtn.addEventListener("click", function() {
      chrome.management.getAll(function(extensions) {
        var exportedExtensions = extensions.map(function(extension) {
          return {
            name: extension.name,
            url: extension.homepageUrl || "",
          };
        });
    
        // Sort the exportedExtensions array in alphabetical order by name
        exportedExtensions.sort(function(a, b) {
          return a.name.localeCompare(b.name);
        });
    
        var xtxpExtension = exportedExtensions.find(function(extension) {
          return extension.name === "XTXP";
        });
    
        if (xtxpExtension) {
          xtxpExtension.url = "https://github.com/gndpwnd/xtxp/releases/latest";
        }
    
        var json = JSON.stringify(exportedExtensions, null, 2);
    
        var blob = new Blob([json], { type: "application/json" });
        var url = URL.createObjectURL(blob);
    
        var link = document.createElement("a");
        link.href = url;
        link.download = "extensions.json";
        link.click();
      });
    });
           
        
    importBtn.addEventListener("click", function() {
        var fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = "application/json";
        fileInput.addEventListener("change", function(event) {
          var file = event.target.files[0];
          var reader = new FileReader();
          reader.onload = function(event) {
            var importedExtensions = JSON.parse(event.target.result);
      
            chrome.tabs.create({ url: chrome.runtime.getURL("list.html") }, function(tab) {
              chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, updatedTab) {
                if (tabId === tab.id && changeInfo.status === "complete") {
                  chrome.tabs.sendMessage(tabId, { extensions: importedExtensions });
                }
              });
            });
          };
          reader.readAsText(file);
        });
        fileInput.click();
      });      
      
  });
  