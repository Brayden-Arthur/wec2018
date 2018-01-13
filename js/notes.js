// this is called after DOM parsing
setup()

function note_click() {
  var num_notes = document.querySelectorAll('.note').length;
  var element = document.createElement("div");
  var note = document.createElement("textarea");
  note.setAttribute("id", "text" + (num_notes + 1));
  element.appendChild(note);
  element.className="note";
  var close = document.createElement("span");
  var close_text = document.createTextNode("\u2715");
  close.setAttribute("class", "close");
  close.setAttribute("name", "close");
  close.setAttribute("onclick", "remove_note(this);");
  close.appendChild(close_text);
  element.appendChild(close);
  var note_area = document.getElementById("note_area");
  note_area.prepend(element);
}

function local_store() {
  var num_notes = document.querySelectorAll('.note').length;
  for(i = 1; i <= num_notes; i++){
    var note = document.getElementById("text" + i).value;
    localStorage.setItem("note" + i, note);
    localStorage.setItem("num_notes",num_notes)
  }
}

function remove_note(close_button) {
  var parent = close_button.parentElement;
  task_name = parent.innerText.replace("✕","");
  localStorage.removeItem(parent.firstChild.id.replace('text','note'));
  parent.style.display = 'none';
  localStorage.setItem("task_list",task_list.toString());
  var num_of_notes = parseInt(localStorage.getItem('num_notes'));
  num_of_notes -= 1;
  localStorage.setItem('num_notes',num_of_notes);
}

function setup() {
  var num_notes = localStorage.getItem("num_notes");
  if(num_notes){
    if(num_notes == 1){
      document.getElementById("text1").value = localStorage.getItem("note1")
    }
    else{
      for(i = 2; i <= num_notes; i++){
        var element = document.createElement("div");
        var note = document.createElement("textarea");

        note.setAttribute("id", "text" + i);
        element.appendChild(note);
        element.className="note";
        var close = document.createElement("span");
        var close_text = document.createTextNode("\u2715");
        close.setAttribute("class", "close");
        close.setAttribute("name", "close");
        close.setAttribute("onclick", "remove_note(this);");
        close.appendChild(close_text);
        element.appendChild(close);

        document.getElementById("note_area").prepend(element);
      }
      for(i = 1; i <= num_notes; i++){
        document.getElementById("text" + i).value = localStorage.getItem("note" + i)
      }
    }
  }
}
