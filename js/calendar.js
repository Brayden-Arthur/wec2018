storage_list = []
$('#month_view').fullCalendar({
  header: {
    left: 'prev,next today',
    center: 'title',
    right: 'month,agendaWeek,agendaDay'
  },
  defaultView: 'month',
  dayClick: function(date){
    $('#day_view').fullCalendar("gotoDate",date)
  },
  eventClick: function(calEvent, jsEvent, view) {
    editEvent(calEvent);
  },
  editable: false,
  select: function(start, end) {
    $('#event_creator').modal('toggle');
    document.getElementById('start_time').value = start.format();
    document.getElementById('end_time').value = end.format();

  },
  nowIndicator: true
})

$('#day_view').fullCalendar({
  allDaySlot: false,
  selectable: true,
  header: {
    left: '',
    center: 'title',
    right: ''
  },
  eventClick: function(calEvent, jsEvent, view) {
    editEvent(calEvent);
  },
  select: function(start, end) {
    $('#event_creator').modal('toggle');
    document.getElementById('start_time').value = start.format();
    document.getElementById('end_time').value = end.format();

  },
  defaultView: 'agendaDay',
  aspectRatio: 0.5,
  nowIndicator: true

})

calendar_setup();
function newEvent(start){
  var event_object = {
    title: document.getElementById('event_title').value,
    start: document.getElementById('start_time').value,
    end: document.getElementById('end_time').value
  };
  $('#month_view').fullCalendar('renderEvent', event_object, true);
  $('#day_view').fullCalendar('renderEvent', event_object, true);
  document.getElementById('event_title').value = '';
  saveEvents();
}

function editEvent(cal_event){
  var event_object = {
    "title": cal_event['title'],
    "start": cal_event['start'],
    "end": cal_event['end']
  };
  console.log(cal_event["_id"])
  $('#event_editor').modal('toggle');
  document.getElementById('edit_title').value = event_object["title"]
  document.getElementById('edit_start_time').value = event_object["start"].format();
  document.getElementById('edit_end_time').value = event_object["end"].format();
  document.getElementById('edit_id').innerHTML = cal_event["_id"]
}

function completeEdit(){
  $('#month_view').fullCalendar('removeEvent',document.getElementById('edit_id'));
  $('#day_view').fullCalendar('removeEvent',document.getElementById('edit_id'));
  var event_object = {
    title: document.getElementById('edit_title').value,
    start: document.getElementById('edit_start_time').value,
    end: document.getElementById('edit_end_time').value
  };
  $('#month_view').fullCalendar('renderEvent', event_object, true);
  $('#day_view').fullCalendar('renderEvent', event_object, true);
  document.getElementById('event_title').innerText = '';
  saveEvents();
}

function saveEvents(){
  event_list = $("#month_view").fullCalendar('clientEvents')
  for(i=0; i < event_list.length; i++){
    storage_object = {
      "title": event_list[i]['title'],
      "start": event_list[i]['start'],
      "end": event_list[i]['end']
    }
    storage_list[i] = storage_object
  }

  localStorage.setItem("event_list",JSON.stringify(storage_list))
}

function delete_event(){
  console.log(document.getElementById('edit_id').innerHTML)
  $('#month_view').fullCalendar('removeEvents',document.getElementById('edit_id').innerHTML);
  $('#day_view').fullCalendar('removeEvents',document.getElementById('edit_id').innerText);
  saveEvents();
}

function calendar_setup(){
  storage_string = localStorage.getItem("event_list")
  if(storage_string !== "" && storage_string !== null){
    storage_list = JSON.parse(storage_string)
    for(i = 0; i < storage_list.length; i++){
      var event_object = {
        "title": storage_list[i]['title'],
        "start": storage_list[i]['start'],
        "end": storage_list[i]['end']
      }
      $('#month_view').fullCalendar('renderEvent', event_object, true);
      $('#day_view').fullCalendar('renderEvent', event_object, true);
    }

  }
}
