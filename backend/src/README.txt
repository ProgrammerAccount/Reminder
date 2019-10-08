#Rutines

Repeat Task in selected day
Getting id of task and change date
Return 
	json
		[ //Array
			{	//Object
				"id":number '1.0,
				"id_task":number '1.0,
				"id_user":number '1.0,
				"recurring_days":json string'"[2,4,4]"
			}
		]


#Task

Return 
	json
		[ //Array
			{	//Object
				"id":number '1.0,
				"id_project":number '1.0,
				"priority":number '1.0,
				"queue":number '1.0, #Kolejka Ustawienie Zadań w kolejności
				"reminder":bool 'true
				"reminding_dateTime":Date '"2019-06-05T20:51:00+00:00"
				"status":bool 'false #Zadanie Wykonane True nie wykonane false
				"title":string' "Tytuł"
			}
		]

#Project /projects
Return
	json
		[ //Array
			{	//Object
				"id":number '1.0,
				"id_user":number '1.0,
				"title": string '"Tytuł"
			}
		]


#SubTimers

/TaskTitle
Return
	json 
			[ //Array
			{	//Object
				"id":number '1.0,
				"id_task":number '1.0,
				"start": string '"Mon, 10 Jun 2019 12:24:47 GMT"
				"stop": string '"Mon, 10 Jun 2019 12:24:47 GMT"
				"taskTitle": string '"Tytuł"
			}
		]


/subTimers/<int:id_task>
Return
	json
	[ #Array
		{ #Object
				"id":number '1.0,
				"id_task":number '1.0,
				"start": string '"Mon, 10 Jun 2019 12:24:47 GMT"
				"stop": string '"Mon, 10 Jun 2019 12:24:47 GMT"
		}
	]

