window.onload = function() {
  var home = document.getElementById('groupId1');
  var comments = document.getElementById('groupId3');
  var shop = document.getElementById('groupId4');
  var quiz = document.getElementById('groupId5');
  var sitemap = document.getElementById('groupId6');
  var aboutUs = document.getElementById('groupId7');
  var gallery = document.getElementById('groupId8');

  home.onclick = function() {
    window.location.href = "home.html";
  }

  comments.onclick = function() {
    window.location.href = "feedback.html";
  }

  shop.onclick = function() {
    window.location.href = "buy-products.html";
  }

  quiz.onclick = function() {
    window.location.href = "quiz.html";
  }
  
  sitemap.onclick = function() {
    window.location.href = "sitemap.html";
  }

  gallery.onclick = function() {
    window.location.href = "gallery.html";
  }

  aboutUs.onclick = function() {
    window.location.href = "student-details.html";
  }
}