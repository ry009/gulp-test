'use strict';

var testJson = "https://holidays-jp.github.io/api/v1/date.json";
var jsonText = "https://jsonplaceholder.typicode.com/posts";
var jsonPhoto = "https://jsonplaceholder.typicode.com/photos";

var init = function init() {
  var jsonUl = document.getElementsByClassName('jsonUl')[0];
  jsonUl.classList.add('txtUl');
  var imgList;
  fetch(jsonText).then(function (resp) {
    if (resp.ok) {
      return resp.json();
    } else {
      return Promise.reject(new Error('Error!!!'));
    }
  }).then(function (data) {
    data.forEach(function (item, i) {
      var li = document.createElement('li');
      var dl = document.createElement('dl');
      var dt = document.createElement('dt');
      var dd = document.createElement('dd');
      var p = document.createElement('p');
      dt.classList.add('title');
      dd.classList.add('body');
      p.classList.add('textBlock');
      dt.textContent = item.title;
      p.textContent = item.body;
      dd.dataset.id = i + 1;
      dl.appendChild(dt);
      dl.appendChild(dd);
      dd.appendChild(p);
      li.appendChild(dl);
      jsonUl.appendChild(li);
    });
  });
  fetch(jsonPhoto).then(function (resp) {
    if (resp.ok) {
      return resp.json();
    } else {
      return Proimise.reject(new Error("not images err!!"));
    }
  }).then(function (data) {
    data = data.slice(0, 100);
    var body = document.querySelectorAll('.body');
    body.forEach(function (item, i) {
      var div = document.createElement('div');
      var img = document.createElement('img');
      div.classList.add('imgBlock');
      var num = Number(item.dataset.id); // console.log(data);

      if (data[i].id === num) {
        img.src = data[i].url;
        div.appendChild(img);
        item.appendChild(div);
      }
    });
  });
};

var api = function api() {
  fetch(testJson).then(function (response) {
    if (response.ok) {
      return response.text();
    } else {
      return Promise.reject(new Error('エラーです'));
    }
  }).then(function (response) {
    var objRes = JSON.parse(response);
    console.log(objRes);
  });
};

document.addEventListener('DOMContentLoaded', function () {
  init();
});
var pageTop = document.getElementsByClassName('pageTop')[0];

function pageTopFunc() {
  var pageTop = document.getElementsByClassName('pageTop')[0];
  document.addEventListener('scroll', function (e) {
    var wH = window.pageYOffset;
    var sH = document.documentElement.scrollTop;
    var scrollTop = wH || sH;

    if (scrollTop > 100) {
      pageTop.classList.add('positionFix');
      pageTop.classList.remove('positionRelative');
      pageTop.style.right = "20px";
      pageTop.style.bottom = "20px";
    } else {
      pageTop.classList.add('positionAbsolte');
      pageTop.classList.remove('positionFix');
      pageTop.style.right = "-100%";
      pageTop.style.bottom = "0";
    }
  });
}

pageTopFunc();
var jsScroll = document.getElementsByClassName('jsScroll');

for (var i = 0; i < jsScroll.length; i++) {
  jsScroll[i].addEventListener('click', function () {
    var y = document.body.scrollTop || document.documentElement.scrollTop;
    var scrollSpeed = 7;
    var direction = this.dataset.scroll;
    var scrollTarget = 0;

    if (direction != 'up') {
      scrollTarget = document.getElementById(direction).getBoundingClientRect().top;
    }

    ;
    var targetY = scrollTarget;
    scrollToAnimation(0, y, 0, targetY, scrollSpeed, direction);
    return false;
  });
} // 指定した座標へスクロールアニメーション


function scrollToAnimation(x, y, targetX, targetY, scrollSpeed, direction) {
  var scTop = direction === 'up' ? Math.floor(y - y / (scrollSpeed * 2)) : Math.floor(y + (y / (scrollSpeed * 2) + 1));
  var scrollTimer = setTimeout(function () {
    scrollToAnimation(x, scTop, targetX, targetY, scrollSpeed, direction);
  }, scrollSpeed);

  if (direction === 'up') {
    if (y > targetY) {
      window.scrollTo(x, scTop);
      scrollTimer;
    } else {
      clearTimeout(scrollTimer);
      window.scrollTo(x, targetY);
    }
  } else {
    if (y < targetY) {
      if (scTop == 0) scTop++;
      window.scrollTo(x, scTop);
      scrollTimer;
    } else {
      clearTimeout(scrollTimer);
      window.scrollTo(x, targetY);
    }
  }
}
//# sourceMappingURL=main.js.map
