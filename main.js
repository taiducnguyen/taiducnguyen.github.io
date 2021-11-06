var footer = document.getElementById("footer");
var filter = document.getElementById("filter");

function reachBottom(entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // hide
      filter.classList.add("hideBtn");
    } else {
      // show button
      filter.classList.remove("hideBtn");
    }
  });
}
let observer = new IntersectionObserver(reachBottom);
observer.observe(footer);

var topPage = document.getElementById("header");

function reachTop(entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // hide
      filter.classList.add("hideBtn");
    } else {
      // show button
      filter.classList.remove("hideBtn");
    }
  });
}
let observerTop = new IntersectionObserver(reachTop);
observerTop.observe(topPage);

let selector = document.getElementById("selector");
function showSelector() {
  if (selector.classList.contains("showSelector")) {
    selector.classList.remove("showSelector");
    window.onscroll = function () {};
  } else {
    selector.classList.add("showSelector");
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    (scrollLeft = window.pageXOffset || document.documentElement.scrollLeft),
      // if any scroll is attempted, set this to the previous value
      (window.onscroll = function () {
        window.scrollTo(scrollLeft, scrollTop);
      });
  }
}

let selectSort = document.getElementById("selectSort");
function showSort() {
  if (selectSort.classList.contains("showSort")) {
    selectSort.classList.remove("showSort");
    window.onscroll = function () {};
  } else {
    selectSort.classList.add("showSort");
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    (scrollLeft = window.pageXOffset || document.documentElement.scrollLeft),
      // if any scroll is attempted, set this to the previous value
      (window.onscroll = function () {
        window.scrollTo(scrollLeft, scrollTop);
      });
  }
}

/* ===== FILTER ===== */

function change() {
  var dealCbs = document.querySelectorAll(".dealType input[type='checkbox']");
  var priceCbs = document.querySelectorAll(".price input[type='checkbox']");
  var filters = {
    deals: getClassOfCheckedCheckboxes(dealCbs),
    prices: getClassOfCheckedCheckboxes(priceCbs),
  };

  filterResults(filters);
}

function getClassOfCheckedCheckboxes(checkboxes) {
  var classes = [];

  if (checkboxes && checkboxes.length > 0) {
    for (var i = 0; i < checkboxes.length; i++) {
      var cb = checkboxes[i];

      if (cb.checked) {
        classes.push(cb.getAttribute("rel"));
      }
    }
  }

  return classes;
}

function filterResults(filters) {
  var resultElements = document.querySelectorAll(".items .item");
  var hiddenElements = [];

  if (!resultElements || resultElements.length <= 0) {
    return;
  }

  for (var i = 0; i < resultElements.length; i++) {
    var element = resultElements[i];

    if (filters.deals.length > 0) {
      var isHidden = true;

      for (var j = 0; j < filters.deals.length; j++) {
        var filter = filters.deals[j];

        if (element.classList.contains(filter)) {
          isHidden = false;
          break;
        }
      }

      if (isHidden) {
        hiddenElements.push(element);
      }
    }

    if (filters.prices.length > 0) {
      var isHidden = true;

      for (var j = 0; j < filters.prices.length; j++) {
        var filter = filters.prices[j];

        if (element.classList.contains(filter)) {
          isHidden = false;
          break;
        }
      }

      if (isHidden) {
        hiddenElements.push(element);
      }
    }
  }

  for (var i = 0; i < resultElements.length; i++) {
    resultElements[i].style.display = "block";
  }

  if (hiddenElements.length <= 0) {
    return;
  }

  for (var i = 0; i < hiddenElements.length; i++) {
    hiddenElements[i].style.display = "none";
  }
}

function resetCbs() {
  var allChecked = document.querySelectorAll("input[type=checkbox]:checked");

  allChecked.forEach(target => 
    target.checked = false)
    change();
}

var list = document.querySelector(".items");
let original = list.querySelectorAll(".item");
console.log(original);
var nodesToSort = list.querySelectorAll(".item");
// console.log("nodesToSort", nodesToSort)

function toOriginal(){
  document.getElementById("demo").innerHTML = ": Default";
  for (var i = 0; i < original.length; i++){
    list.append(original[i]);
  }
}

function lowToHighName() {
  document.getElementById("demo").innerHTML = ": Name Asc";
  Array.prototype.map
    .call(nodesToSort, function (node) {
      return {
        node: node,
        relevantText: node.querySelector(
          ".item__content .item__container .name"
        ).textContent,
      };
    })
    .sort(function (a, b) {
      console.log(a, b);
      return a.relevantText.localeCompare(b.relevantText);
    })
    .forEach(function (item) {
      list.appendChild(item.node);
    });
}

function highToLowName() {
  document.getElementById("demo").innerHTML = ": Name Des";
  Array.prototype.map
    .call(nodesToSort, function (node) {
      return {
        node: node,
        relevantText: node.querySelector(
          ".item__content .item__container .name"
        ).textContent,
      };
    })
    .sort(function (a, b) {
      console.log(a, b);
      return b.relevantText.localeCompare(a.relevantText);
    })
    .forEach(function (item) {
      list.appendChild(item.node);
    });
}



function lowToHigh() {
  document.getElementById("demo").innerHTML = ": Price Up";
  
  Array.prototype.map
    .call(nodesToSort, function (node) {
      return {
        node: node,
        relevantText: node.querySelector(".item__price .new").textContent,
      };
    })
    .sort(function (a, b) {
      return Number(a.relevantText) - Number(b.relevantText);
    })
    .forEach(function (item) {
      list.appendChild(item.node);
    });
   
}

function highToLow() {
  document.getElementById("demo").innerHTML = ": Price Down";
  Array.prototype.map
    .call(nodesToSort, function (node) {
      return {
        node: node,
        relevantText: node.querySelector(".item__price .new").textContent,
      };
    })
    .sort(function (a, b) {
      return Number(b.relevantText) - Number(a.relevantText);
    })
    .forEach(function (item) {
      list.appendChild(item.node);
    });
}
