const form = document.querySelector("form");
const input = document.querySelector("input");
const ol = document.querySelector("ol");

const wiki = e => {
  var searchTerm = e.target.parentNode.dataset.key;
  var div = e.target.parentNode.childNodes[2];

  var url =
    "https://en.wikipedia.org/w/api.php?action=opensearch&search=" +
    searchTerm +
    "&format=json&callback=?";
  $.ajax({
    url: url,
    type: "GET",
    contentType: "application/json; charset=utf-8",
    async: false,
    dataType: "json",

    success: function(data, status, jqXHR) {
      var url = data[3][0];
      div.innerHTML =
        data[2][0] +
        " " +
        `<button onclick="window.open('${url}');"> click for more info</button>`;

      if (div.style.display === "block") {
        div.style.display = "none";
      } else {
        div.style.display = "block";
      }
    }
  })
    .done(function() {
      console.log("success");
    })
    .fail(function() {
      console.log("error");
    })
    .always(function() {
      console.log("complete");
    });
};

var start = e => {
  ol.textContent = "";
  var tableOfValue = [];
  var state;
  e.preventDefault();

  if (input.value === "Poland") {
    state = "PL";
  } else if (input.value === "Germany") {
    state = "DE";
  } else if (input.value === "Spain") {
    state = "ES";
  } else if (input.value === "France") {
    state = "FR";
  } else {
    input.value = "";
    return alert("Wpisz jedno z państw : Poland, Germany, France, Spain");
  }

  fetch("https://api.openaq.org/v1/measurements")
    .then(resp => resp.json())
    .then(resp => {
      resp.results.forEach(country => {
        if (country.country === state) {
          tableOfValue.push({
            val: country.value,
            cit: country.city
          });
        }
      });

      if (tableOfValue.length == 0) {
        input.value = "";
        return alert("brak danych");
      }
      tableOfValue.sort(function(a, b) {
        return parseInt(b.val, 10) - parseInt(a.val, 10);
      });

      for (var i = 0; i < 10; i++) {
        const li = document.createElement("li");
        li.innerHTML =
          tableOfValue[i].cit +
          " -  poziom zanieczyszcenia = " +
          tableOfValue[i].val +
          " " +
          "<button>Info</button>" +
          "<div class='panel'></div>";
        li.dataset.key = tableOfValue[i].cit;
        ol.appendChild(li);
        li.querySelector("button").addEventListener("click", wiki);
      }
      tableOfValue = "";
    });
};
form.addEventListener("submit", start);
