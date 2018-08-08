import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '../../../../node_modules/@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import 'rxjs/add/operator/switchMap';

import { Measurement } from '../../core/models/Measurement';
import { MeasurementService } from '../../core/services/measurement.service';
import { Observable } from '../../../../node_modules/rxjs/Observable';

@Component({
  selector: 'app-measurement-save',
  templateUrl: './measurement-save.component.html',
  styleUrls: ['./measurement-save.component.scss']
})
export class MeasurementSaveComponent implements OnInit {
  measurement: Measurement = new Measurement();

  measurementSaveForm: FormGroup;
  formErrors = {
    'name': '',
    'description': ''
  };
  validationMessages = {
    'name': {
      'required': 'Name is required.',
      'minlength': 'Name must be at least 2 characters long',
      'maxlength': 'Name can not exceed 255 characters.'
    },
    'description': {
      'maxlength': 'Description can not exceed 255 characters.'
    }
  };

  constructor(
    private measurementService: MeasurementService, 
    private route: ActivatedRoute, 
    private formBuilder: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => {
        var measurementId = +params['id'];
        if (measurementId){
          return this.measurementService.getMeasurement(measurementId);
        }
          
        return new Observable<Measurement>(o => {
          o.next(new Measurement());
          o.complete();
        });
      })
      .subscribe(measurement => {
        this.measurement = measurement;
      });
  }

  createForm() {
    this.measurementSaveForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
      description: ['', [Validators.maxLength(255)]]
    });

    this.measurementSaveForm.valueChanges.subscribe(data => this.onValueChanged());
    this.onValueChanged();
  };

  onValueChanged(data?: any) {
    if (!this.measurementSaveForm) return;

    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = this.measurementSaveForm.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  };

  formSubmit() {
    this.measurementService.saveMeasurement(this.measurement)
      .subscribe(m => console.log('sent'), e => console.log('error', e));
  };

  getTitle() {
    this.measurement.id ? "Edit Measurement" : "Add Measurement";
  }

}