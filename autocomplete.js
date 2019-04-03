function autocomplete(inp, arr) {
  var currentFocus;
  inp.addEventListener("input", function(e) {
    var a,
      b,
      i,
      val = this.value;

    closeAllLists();
    if (!val) {
      return false;
    }
    currentFocus = -1;
    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    this.parentNode.appendChild(a);
    for (i = 0; i < arr.length; i++) {
      if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        b = document.createElement("DIV");
        b.innerHTML = arr[i].substr(0, val.length);
        b.innerHTML += arr[i].substr(val.length);
        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
        b.addEventListener("click", function(e) {
          inp.value = this.getElementsByTagName("input")[0].value;
          closeAllLists();
        });
        a.appendChild(b);
      }
    }
    function closeAllLists(elmnt) {
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
          x[i].parentNode.removeChild(x[i]);
        }
      }
    }
  });
}
var countries = ["Poland", "France", "Spain", "Germany"];
autocomplete(document.getElementById("myInput"), countries);
