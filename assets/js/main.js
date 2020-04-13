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

document.addEventListener('DOMContentLoaded', function (e) {
  init();
});
document.addEventListener('scroll', function (e) {
  var wH = window.pageYOffset;
  console.log(wH);
});
//# sourceMappingURL=main.js.map
