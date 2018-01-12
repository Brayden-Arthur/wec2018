$('#month_view').fullCalendar({
      header: {
				left: 'prev,next today',
				center: 'title',
				right: 'month,agendaWeek'
			},
      defaultView: 'month',
      editable: true
})

$('#day_view').fullCalendar({
  'changeView': "agendaDay"
  // methods here. see API
})
