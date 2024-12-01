import { Component, inject, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { noSpace } from './Validators/noSpcace.validator';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'reactiveForms';

  reactiveForm!: FormGroup;

  private fb = inject(FormBuilder);

  ngOnInit(): void {
    // Using FormBuilder to initialize the form group and form controls
    this.reactiveForm = this.fb.group({
      // first_name: ['abjksdfhkjdfs', [Validators.required, Validators.email]],
      first_name: this.fb.control(''),
      last_name: ['', [Validators.required, noSpace('abc')]],
      email: ['', [Validators.email, Validators.required]],
      phone: ['', Validators.required],
      dob: [new Date().toISOString().split('T')[0], Validators.required],
      username: ['', Validators.required],
      gender: ['male', Validators.required],

      address: this.fb.group({
        address1: ['', Validators.required],
        address2: ['', Validators.required],
        country: ['germany', Validators.required],
        city: ['', Validators.required],
        region: ['', Validators.required],
        zip: [0, Validators.required],
      }),

      skills: this.fb.array([
        this.fb.control(''),
        this.fb.control(''),
        this.fb.control(''),
      ]),

      experience: this.fb.array([
        this.fb.group({
          company: ['abc'],
          exp2: ['def'],
          exp3: ['ghi'],
        }),
      ]),

      agree: [false, Validators.requiredTrue],
    });

    this.reactiveForm.get('last_name')?.statusChanges.subscribe({
      next: (data) => {
        console.log('Data: ', data);
      },
    });
  }

  get skills() {
    // console.log((this.reactiveForm.get('skills') as FormArray)?.controls);
    return (this.reactiveForm.get('skills') as FormArray).controls;
  }

  addNewSkill() {
    const skill_arr = this.reactiveForm.get('skills') as FormArray;
    skill_arr.push(new FormControl('d', Validators.required));
  }

  delete(index: number) {
    const skill_arr = this.reactiveForm.get('skills') as FormArray;
    skill_arr.removeAt(index);
  }

  get experiences() {
    return this.reactiveForm.get('experience') as FormArray;
  }

  addNewExperience() {
    this.experiences.push(
      new FormGroup({
        company: new FormControl('abc'),
        exp2: new FormControl('def'),
        exp3: new FormControl('ghi'),
      })
    );
    this.reactiveForm.reset();
  }

  onSubmit() {
    // console.log(this.reactiveForm);
    // for (let item in this.reactiveForm.controls) {
    //   console.log(item, this.reactiveForm.controls[item].valid);
    // }
    this.reactiveForm.patchValue({
      username: 'sdfdfdsdf',
    });
  }
}
