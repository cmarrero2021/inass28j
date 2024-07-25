let index = 0;

		$('#action_included').change(function(){

            let title = $('#action_included option:selected').text();
			let id = $(this).val();
			if(id==null||undefined){
				alert('Select an action');
				return false;
			}
            // console.log($(this).attr('id'));
			action.push($('#action_included').val());
			$('#action_included').val('');
			var wrapper = $('.field_wrapper');
			var fd = new FormData();
			fd.append('_token', $('[name=_token]').val());
			$.ajax({
				url: 'task-case-fields/'+id,
				type: 'post',
				data: fd,
				contentType: false,
				processData: false,
				success: function(response){
					$.each(response.fieldNames,function(i,value){
                        var now = moment();
                        const element1 = document.querySelector(`[id^="accordionn"]`);
                        let newIndex;
                        element1 == null ? newIndex = index : (index++ , newIndex = index);
                        // console.log(newIndex);
                        wrapper.append(`<div class="accordion-item" accordion_id="${newIndex}">
                        <h2 class="accordion-header d-block" id="headingOne">
                        <div class="row">
                        <div class="col-md-11">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#accordionn${newIndex}" aria-expanded="true" aria-controls="${newIndex}">${title}</button>
                        </div>
                        <div class="col-md-1">
                        <button class="remove-action" style="border:none; background-color: #fff" onclick="removeAction(${newIndex})" index="${newIndex}"><i class="fa fa-times" style="margin-right: 10% !important"></i>
                        </button>
                        <div>
                        </h2>
                        <div id="accordionn${newIndex}" class="accordion-collapse collapse ${newIndex==0?'show':''} aria-labelledby="headingOne"data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                        <div class="row">
                        <div class="col-md-6">
                        <div class="mb-3">
                        <label for="${value.field_name}"class="form-label }">${value.field_name}</label>
                        <input type="text" class="form-control" name="action_field[]" field_id="${value.id}" action_id="${id} " placeholder="${value.field_name}"/>
                        </div>
                        </div>
                        <div class="col-md-6">
                        <div class="mb-3">
                        <label for="due_date" class="form-label">Due Date</label>
                        <input type="date" class="form-control" name="due_date[]" placeholder="Due Date" value=""/>
                        </div>
                        </div>
                        </div>
                        <div class="row">
                        <div class="col-md-6">
                        <div class="mb-3">
                        <label for="due_time" class="form-label">Due Time</label>
                        <input type="time" class="form-control" min="${now.tz('UTC').format('HH:mm')}" name="due_time[]" placeholder="Due Time" value=""/>
                        </div>
                        </div>
                        <div class="col-md-6">
                        <div class="mb-3">
                        <label for="observations" class="form-label">Observations</label>
                        <input type="text" class="form-control" name="observations[]" placeholder="Observations" value=""/>
                        </div>
                        </div>
                        </div>
                        <div class="row"><div class="col-md-6"><div class="mb-3">
                        <label for="task_user_id" class="form-label">User Assigned</label>
                        <select class="form-select user-id" name="task_user_id[]" placeholder="User Assigned" value=""  /><option value="">Select user</option>"${userList}"</select>
                        </div>
                        </div>
                        <div class="col-md-6">
                        <div class="mb-3">
                        <label for="notification_time" class="form-label">Notification Time</label>
                        <input type="text" class="form-control notification-time" index="${newIndex}" name="task_notification_time[]" placeholder="Notification Time" value="${$('#time_notification').val()!=''?$('#time_notification').val() : ''}"/>
                        </div>
                        </div>
                        </div>
                        </div>
                        </div>
                        </div>`);

					})
				},
				error: function (error) {
					// console.log('test ', error.responseJSON.error);
					let allErrors = [];
					typeof(error.responseJSON.error) == 'string' ? allErrors = error.responseJSON.error :
					Object.entries(error.responseJSON.error).forEach(([key, value]) => {
						allErrors.push(value)
					});
					Swal.fire({
						title: 'Error',
						text: allErrors,
						icon: 'error',
					});
				}
			});
		})

        //save
		$('#task-save').click(function(){
			var fieldIncluded = [];
			var fields = document.getElementsByName("action_field[]");
            var dateTask = document.getElementsByName("due_date[]");
            var observations = document.getElementsByName("observations[]");
            var dueTime = document.getElementsByName("due_time[]");
            var userId = document.getElementsByName("task_user_id[]");
            var notificationTime = document.getElementsByName("task_notification_time[]");

			for(var i = 0; i < fields.length; i++) {
                fieldIncluded.push([fields[i].getAttribute('action_id'),
                fields[i].getAttribute('field_id'),
                fields[i].value,
                dateTask[i].value,
                observations[i].value,
                dueTime[i].value,
                userId[i].value,
                notificationTime[i].value

            ]);
            }

				$.post('task-case-save',{number: $('#number').val(), text: $('#text').val(), task_due_date: $('#task_due_date').val(), action_included: action, user_id: $('#user_id').val(),action_field: fieldIncluded, _token:$('[name=_token]').val()})
			.done(function(data) {
				$('#number').val('');
				$('#text').val('');
				$('#task_due_date').val('');
				$('#action_included').val('');
				$('#user_id').val('');
				$('#create').modal('hide');
				Swal.fire({
					title: 'Success',
					text: 'Task case created successfully',
					icon: 'success',
					timer: 2000,
					timerProgressBar: true
				});
				document.location.reload(true)
			}).fail(function(error) {
				let allErrors = [];
				typeof(error.responseJSON.error) == 'string' ? allErrors = error.responseJSON.error :
				Object.entries(error.responseJSON.error).forEach(([key, value]) => {
					allErrors.push(value)
				});
				const list = document.createElement('ul')
				$.each(allErrors, function(i,value){
					list.append(value)
				})
				$('#espera').modal('hide');
				Swal.fire({
					title: 'ERROR',
					html: list,
					icon: 'error',
				});
			});
		});



        $(function(){

            $('input[type="checkbox"][name=switch1]').change(function(e){

                if($('input[type="checkbox"][name=switch1]').is(':checked')){
                    $('input[type="checkbox"][name=switch1]').attr('checked', true);
                    $('.time-notification-div').removeClass('d-none');
                }else{
                    $('input[type="checkbox"][name=switch1]').attr('checked',false);
                    $('.time-notification-div').addClass('d-none');
                    $('#time_notification').val('');
                    $('.notification-time').val('');
                }
            })

            $('#time_notification').change(function () {
                // console.log($(this).attr('id'));
                $('[name=time_notification_value]').attr('value', $(this).val());
                if($(this).val()=='custom'){
                $('#time_notification').val('');
                $('#time_notification').addClass('d-none');
                $('#btn-back-notification').removeClass('d-none');
                $('#time_notification_custom').removeClass('d-none');
                }

                let timeNoficationFields = document.getElementsByName('task_notification_time[]');

                for (let i = 0; i < timeNoficationFields.length; i++) {

                    if ($('.notification-time[index=' + i + ']').val() == '') {
                        $('.notification-time[index=' + i + ']').val($(this).val());
                    }
                }
            })

             //time_notification_custom
            $('#time_notification_custom').on('change', function () {
                //console.log($(this).attr(id));
                if ($(this).val() > 480) {
                    $(this).val(480);
                    $('[name=time_notification_value]').attr('value', 480);
                } else {
                    $('[name=time_notification_value]').attr('value', $(this).val());
                }

                let timeNoficationFields = document.getElementsByName('task_notification_time[]');

                for (let i = 0; i < timeNoficationFields.length; i++) {

                    if ($('.notification-time[index=' + i + ']').val() == '') {
                        $('.notification-time[index=' + i + ']').val($(this).val());
                    }
                }
            })
           
            //evento boton volver en creacion de tareas
             $('#btn-back-notification').click(function(){
                $('#time_notification').removeClass('d-none');
                $('#btn-back-notification').addClass('d-none');
                $('#time_notification_custom').addClass('d-none');
                $('#time_notification_custom').val('');
             });

             //selector de tiempo en edicion
             $('#time_notification_edit').change(function(){

                $('[name=time_notification_value_edit]').attr('value', $(this).val());
                if($(this).val()=='custom'){
                $('[name=time_notification_value_edit]').attr('value', '');
                $('#time_notification_custom_edit').val('');
                $('#time_notification_edit').val('');
                $('#time_notification_edit').addClass('d-none');
                $('#btn-back-notification_edit').removeClass('d-none');
                $('#time_notification_custom_edit').removeClass('d-none');
                }

                 if (currentRoute.indexOf("task-case") > -1) {
                     let timeNoficationFields = document.getElementsByName('task_notification_time_edit[]');

                     for (let i = 0; i < timeNoficationFields.length; i++) {

                         if ($('.notification-time-edit[index=' + i + ']').val() == '') {
                             $('.notification-time-edit[index=' + i + ']').val($(this).val());
                         }
                     }
                 }
            })

            //evento cambio en input tiempo custom edicion
             $('#time_notification_custom_edit').on('change', function () {

                if ($(this).val() > 480) {
                    $(this).val(480);
                    $('[name=time_notification_value_edit]').attr('value', 480);
                } else {
                    $('[name=time_notification_value_edit]').attr('value', $(this).val());
                }

                if (currentRoute.indexOf("task-case") > -1) {
                let timeNoficationFields = document.getElementsByName('task_notification_time_edit[]');

                    for (let i = 0; i < timeNoficationFields.length; i++) {

                        if ($('.notification-time-edit[index=' + i + ']').val() == '') {
                            $('.notification-time-edit[index=' + i + ']').val($(this).val());
                        }
                    }
                }
            })

            //evento boton volver edicion
            $('#btn-back-notification_edit').click(function(){
                $('#time_notification_value_edit').val('');
                $('#time_notification_edit').removeClass('d-none');
                $('#time_notification_edit').val('');
                $('#btn-back-notification_edit').addClass('d-none');
                $('#time_notification_custom_edit').addClass('d-none');
                $('#time_notification_custom_edit').val('');
             });
        });
