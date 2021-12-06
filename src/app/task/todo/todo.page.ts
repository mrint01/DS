import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.page.html',
  styleUrls: ['./todo.page.scss'],
})

export class TodoPage implements OnInit {
  public static  options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' } as const;
  currentDate: string;
  myTask: string;
  addTask: boolean;
  tasks = [];


  constructor(public afDB: AngularFireDatabase,) {
    // get the date of today
    const event = new Date();
    this.currentDate =event.toLocaleDateString(undefined, TodoPage.options);
    this.getTasks(); // call the function to get all data of tasks from database


  }
  // this for to show the formulaire to enter new task
  showForm() {
    this.addTask = !this.addTask;
    this.myTask = '';
  }
  // this for add the task to database
  addTaskToFirebase() {
    this.afDB.list('Tasks/').push({
      text: this.myTask,
      date: new Date().toISOString(),
      checked: false,
      idUser:'id user',
    });
    this.showForm();
  }
//  To get the tasks from database
  getTasks() {
    this.afDB.list('Tasks/').snapshotChanges(['child_added', 'child_removed']).subscribe(actions => {
      this.tasks = [];
      actions.forEach(action => {
        this.tasks.push({
          key: action.key,
          text: action.payload.exportVal().text,
          hour: action.payload.exportVal().date.substring(11, 16),
          checked: action.payload.exportVal().checked,


        });


      });
    });
  }
// if checkbox true will change it in the database
  changeCheckState(ev: any) {
    this.afDB.object('Tasks/' + ev.key + '/checked/').set(ev.checked);
  }

  // To delete the task from database
  deleteTask(task: any) {
    this.afDB.list('Tasks/').remove(task.key);
  }
  ngOnInit() {
  }

}
