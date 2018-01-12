var task_list = []
setup();
function add_task(){
  var element = document.createElement("li");
  var input_text = document.getElementById("todo_task").value;
  var task = document.createTextNode(input_text);
  var close = document.createElement("span");
  var close_text = document.createTextNode("\u2715");
  close.setAttribute("class", "close");
  close.setAttribute("name", "close");
  close.setAttribute("onclick", "delete_task(this);");
  close.appendChild(close_text);
  element.setAttribute("class", "task");
  element.setAttribute("onclick", "check_task(this);");
  element.appendChild(task);
  element.appendChild(close);
  if(input_text == ""){
    alert("Please write a task name");
  }
  else{
    if (input_text.startsWith("-")) {
      element.classList.toggle("checked")
    }
    document.getElementById("task_list").appendChild(element);
    document.getElementById("todo_task").value = "";

    task_list.push(input_text)
    localStorage.setItem("task_list",task_list.toString());
  }
}

function delete_task(close_button){
  var parent = close_button.parentElement;
  task_name = parent.innerText.replace("✕","");

  task_index = task_list.indexOf(task_name);
  if(task_index > -1){
    task_list.splice(task_index,1)
  }
  parent.style.display = 'none';
  localStorage.setItem("task_list",task_list.toString());
}

function check_task(li_element){
  task_name = li_element.innerText.replace("✕","");
  task_index = task_list.indexOf(task_name);
  if(task_name.startsWith("-")){
    li_element.innerHTML = task_name.substr(1)
  }
  else{
    li_element.innerHTML = "-" + task_name
  }
  li_element.classList.toggle("checked")
  var close = document.createElement("span");
  var close_text = document.createTextNode("\u2715");
  close.setAttribute("class", "close");
  close.setAttribute("name", "close");
  close.setAttribute("onclick", "delete_task(this);");
  close.appendChild(close_text);
  li_element.appendChild(close);
  task_list[task_index] = li_element.innerText.replace("✕","");
  localStorage.setItem("task_list",task_list.toString());
}

function setup(){
  task_list = localStorage.getItem("task_list")
  if(task_list != null){
    task_list = localStorage.getItem("task_list").split(',');

    for(i = 0; i < task_list.length; i++){
      var element = document.createElement("li");
      var input_text = task_list[i];
      var task = document.createTextNode(input_text);
      var close = document.createElement("span");
      var close_text = document.createTextNode("\u2715");
      close.setAttribute("class", "close");
      close.setAttribute("name", "close");
      close.setAttribute("onclick", "delete_task(this);");
      close.appendChild(close_text);
      element.setAttribute("onclick", "check_task(this);");
      element.setAttribute("class", "task");
      if(input_text !== ""){
        if(input_text.startsWith("-")){
          element.classList.toggle("checked")
        }
        element.appendChild(task);
        element.appendChild(close);
        document.getElementById("task_list").appendChild(element);
      }
    }
  }
  else{
    task_list = []
  }
}
