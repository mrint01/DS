import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
@Component({
  selector: 'app-task',
  templateUrl: './task.page.html',
  styleUrls: ['./task.page.scss'],
})
export class TaskPage implements OnInit {
  public  lenghttasks;
  tasks = [];
  constructor(public afDB: AngularFireDatabase,) {
    this.getTasks();

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
          tasklength : this.tasks.length+1

        });
        this.lenghttasks = this.tasks.length;

      });


    });
    return this.lenghttasks;
  }
  ngOnInit() {
  }

}
