document.addEventListener("DOMContentLoaded", function() {
    var downloadBtn = document.getElementById("downloadBtn");
  
    downloadBtn.addEventListener("click", function() {
      var json = decodeURIComponent(window.json);
      var dataUrl = "data:text/json;charset=utf-8," + encodeURIComponent(json);
      var downloadLink = document.createElement("a");
      downloadLink.href = dataUrl;
      downloadLink.download = "extensions.json";
      downloadLink.style.display = "none";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    });
  });
  