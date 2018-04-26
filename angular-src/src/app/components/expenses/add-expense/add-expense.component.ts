import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ProjectService } from '../../../services/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css']
})
export class AddExpenseComponent implements OnInit {

  constructor(
    private http: Http ,
    private projectService: ProjectService ,
    private route: ActivatedRoute ,
    private router: Router ,
    private fb: FormBuilder ,
    private flashMessage: FlashMessagesService ) {
  }

  expenseForm: FormGroup ;

  ngOnInit() {
    this.expenseForm = this.fb.group({
      date: ['', Validators.required],
      amount: ['', Validators.required],
      description: ['']
    });
  }
  onFormSubmit() {
    // validate required fields
    const id = this.route.snapshot.paramMap.get('id');
    const proj_id = this.route.snapshot.paramMap.get('proj_id');
    if (this.expenseForm.valid) {
      this.expenseForm.value.amount = this.expenseForm.value.amount * -1;
      this.projectService.addExpense(id, proj_id, this.expenseForm.value).subscribe(data => {
        if (data.success) {
          this.flashMessage.show(data.message, {cssClass: 'alert-success', timeout: 3000});
          this.router.navigate([`/companies/${id}/projects/${proj_id}`]);
        } else {
          this.flashMessage.show(data.message, {cssClass: 'alert-danger', timeout: 3000});
          this.router.navigate([`/companies/${id}/projects/${proj_id}/add-expense`]);
        }
      });
    }
  }
}
