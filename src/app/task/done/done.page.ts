import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
@Component({
  selector: 'app-done',
  templateUrl: './done.page.html',
  styleUrls: ['./done.page.scss'],
})

export class DonePage implements OnInit {
  public static  options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' } as const;
  currentDate: string;
  myTask:string;
  tasks = [];
  constructor(public afDB: AngularFireDatabase,) {
    // get the date of today
    const event = new Date();
    this.currentDate =event.toLocaleDateString(undefined, DonePage.options);
    this.getTasks(); // call the function to get all data of tasks from database

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
        checked: action.payload.exportVal().checked
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
