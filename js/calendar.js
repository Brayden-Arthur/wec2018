storage_list = []
$('#month_view').fullCalendar({
      header: {
				left: 'prev,next today',
				center: 'title',
				right: 'month,agendaWeek'
			},
      defaultView: 'month',
      dayClick: function(date){
        $('#day_view').fullCalendar("gotoDate",date)
      },
      eventClick: function(calEvent, jsEvent, view) {
          editEvent(calEvent);
      },
      editable: true
})

$('#day_view').fullCalendar({
  allDaySlot: false,
  selectable: true,
  header: {
    left: '',
    center: 'title',
    right: ''
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

function newEvent(start){
  var event_object = {
    title: document.getElementById('event_title').value,
    start: document.getElementById('start_time').value,
    end: document.getElementById('end_time').value
  };
  console.log(event_object)
  $('#month_view').fullCalendar('renderEvent', event_object, true);
  $('#day_view').fullCalendar('renderEvent', event_object, true);
  document.getElementById('event_title').value = '';
}

function editEvent(calEvent){
  console.log(calEvent)
}

function saveEvents(){
  event_list = $("#month_view").fullCalendar('clientEvents')
  console.log(event_list)
  for(i=0; i < event_list.length; i++){
    storage_object = {
      "title": event_list[i]['title'],
      "start": event_list[i]['start'],
      "end": event_list[i]['end']
    }
    console.log(storage_object);
    storage_list[i] = storage_object
  }

  localStorage.setItem("event_list",JSON.stringify(storage_list))
}

function setup(){

  
}
