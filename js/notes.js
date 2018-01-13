// this is called after DOM parsing
setup()

function note_click() {
  var num_notes = document.querySelectorAll('.note').length;
  var element = document.createElement("div");
  var note = document.createElement("textarea");
  note.setAttribute("id", "text" + (num_notes + 1));
  element.appendChild(note);
  element.className="note";

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

        document.getElementById("note_area").prepend(element);
      }
      for(i = 1; i <= num_notes; i++){
        document.getElementById("text" + i).value = localStorage.getItem("note" + i)
      }
    }
  }
}
