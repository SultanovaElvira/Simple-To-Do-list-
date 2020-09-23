let textAdding = document.querySelector(".text-adding");
let text = "";
let count = Number(localStorage.getItem("newNote_count"));
let todo = [];

if (count === null) {
  localStorage.setItem("newNote_count", 0);
  count = 0;
}

for (let index = 1; index <= count; index++) {
  text = localStorage.getItem("newNote_value[" + index + "]");

  $("ul").append(
    '<li class="new-todo" data-order =' +
      index +
      ">" +
      '<div class="input-group form-group mb-3">' +
      '<div class="input-group-prepend input-group-text">' +
      '<input class="checkbox" id="1" type="checkbox" />' +
      '<textarea name="text" rows="2" cols="100" class="form-control new-note">' +
      text +
      "</textarea>" +
      '<div class="input-group-append remove-button">' +
      '<button class="btn btn-outline-secondary deleteNote" type="button" id="inputGroupFileAddon04">X</button>' +
      "</div>" +
      "</div>" +
      "</div>" +
      "</li>"
  );
}

//add note by Enter key
$(document).ready(function () {
  $(textAdding).on("keypress", function (event) {
    if (event.which === 13) {
      event.preventDefault();
      let temp = {};
      temp.check = false;
      let i = todo.length;
      todo[i] = temp;
      let text = $(this).val();
      let count = Number(localStorage.getItem("newNote_count")) + 1;

      if (text !== "") {
        //what to add to ul
        $("ul").append(
          '<li class="new-todo" data-order =' +
            count +
            ">" +
            '<div class="input-group form-group mb-3">' +
            '<div class="input-group-prepend input-group-text">' +
            '<input class="checkbox" id="1" type="checkbox" />' +
            '<textarea name="text" rows="2" cols="100" class="form-control new-note">' +
            text +
            "</textarea>" +
            '<div class="input-group-append remove-button">' +
            '<button class="btn btn-outline-secondary deleteNote" type="button" id="inputGroupFileAddon04">X</button>' +
            "</div>" +
            "</div>" +
            "</div>" +
            "</li>"
        );

        //add/save count and note to localStorage

        localStorage.setItem("newNote_count", count);

        localStorage.setItem("newNote_value[" + count + "]", text);
        localStorage.setItem("todo", JSON.stringify(todo));
      } else {
        alert("Please add a note");
      }

      $(textAdding).val("");
    }
  });

  //add note by clicking "save" button
  document.querySelector(".add-note").onclick = function () {
    let text = $(".text-adding").val();
    let temp = {};
    temp.check = false;
    let i = todo.length;
    todo[i] = temp;
    let count = Number(localStorage.getItem("newNote_count")) + 1;

    if (text !== "") {
      $("ul").append(
        '<li class="new-todo"  data-order = "' +
          count +
          '"' +
          ">" +
          '<div class="input-group form-group mb-3">' +
          '<div class="input-group-prepend input-group-text">' +
          '<input class="checkbox" id="1" type="checkbox" />' +
          '<textarea name="text" rows="2" cols="100" class="form-control new-note">' +
          text +
          "</textarea>" +
          '<div class="input-group-append remove-button">' +
          '<button class="btn btn-outline-secondary deleteNote" type="button" id="inputGroupFileAddon04">X</button>' +
          "</div>" +
          "</div>" +
          "</div>" +
          "</li>"
      );
      localStorage.setItem("newNote_count", count);

      localStorage.setItem("newNote_value[" + count + "]", text);
      localStorage.setItem("todo", JSON.stringify(todo));
    } else {
      alert("Please add a note");
    }
    $(textAdding).val("");
  };

  //delete note from site and localStorage
  $("ul").on("click", ".remove-button", function () {
    let newValue = $(this).closest("li").data("order");

    let count = Number(localStorage.getItem("newNote_count"));
    localStorage.removeItem("newNote_value[" + newValue + "]"); //delete exact note from localStorage

    for (let index = newValue; index < count; index++) {
      let nextElem = index + 1;

      let text = localStorage.getItem("newNote_value[" + nextElem + "]");

      localStorage.setItem("newNote_value[" + index + "]", text);
      localStorage.removeItem("newNote_value[" + nextElem + "]"); //delete exact note from localStorage
      // localStorage.setItem("newNote_count", --count); //reduce count of notes

      // $(this).closest("li").remove(); //delete note from site
    }

    localStorage.setItem("newNote_count", --count); //reduce count of notes

    $(this).closest("li").remove(); //delete note from site
  });

  //if update note, to save updated text to localStorage
  $("ul").on("click", ".new-todo", function () {
    $(".new-note").on("input", function () {
      let text = $(this).val();
      let newValue = $(this).closest("li").data("order"); //taking number of li
      localStorage.setItem("newNote_value[" + newValue + "]", text); //input updated text to localStorage
    });
  });

  if (localStorage.getItem("todo")) {
    todo = JSON.parse(localStorage.getItem("todo"));
  }

  //disable note which is done,by clicking "checkbox"
  $("ul").on("click", ".checkbox", function () {
    let checkbox = document.querySelectorAll(".checkbox");
    for (let index = 0; index < checkbox.length; index++) {
      //add attribute "disabled" to li
      if ($(checkbox[index]).is(":checked")) {
        todo[index].check = true;
        $(checkbox[index])
          .closest("li")
          .find("textarea")
          .attr("disabled", true);
      } else {
        todo[index].check = false;
        $(checkbox[index])
          .closest("li")
          .find("textarea")
          .removeAttr("disabled");
      }
      localStorage.setItem("todo", JSON.stringify(todo));
    }
  });
  window.onload = function () {
    let checkbox = document.querySelectorAll(".checkbox");

    for (const key in todo) {
      if (todo[key].check == true) {
        $(checkbox[key]).attr("checked", "checked");
        $(checkbox[key]).closest("li").find("textarea").attr("disabled", true);
      } else {
        $(checkbox[key]).removeAttr("checked");
        $(checkbox[key]).closest("li").find("textarea").attr("disabled", false);
      }
    }
  };

  //to clear all notes from site and localStorage
  document.querySelector(".clear").onclick = function () {
    localStorage.clear();
    $("#todo").find("ul").text("");
  };

  //to be able to move notes up and down

  $(function () {
    $("ul").sortable({
      update: function (event, ui) {
        $(this)
          .children()
          .each(function (index) {
            let newOrder = $(this).attr("data-order");
            let text = $(this).closest("li").find("textarea").val();
            console.log(text);
            if (newOrder != index + 1) {
              $(this).attr("data-order", index + 1);
              // .addClass("updated");
              $(this).attr("data-order") == index + 1;
              let newText = $(this).closest("li").data("order"); //taking number of li
              // console.log(newText);
              localStorage.setItem("newNote_value[" + newText + "]", text);
            }
          });
      },
    });

    $("ul").disableSelection();
  });
});
