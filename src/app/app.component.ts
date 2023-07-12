import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  api = 'https://api.whatsapp.com/send?phone=91';
  title = 'whatsapp';
  numFromGroup: FormGroup;
  unamePattern = "^[0-9]{10}$";
  constructor(private fb: FormBuilder, private router: Router) {
    this.numFromGroup = this.fb.group({
      mobile_number: ['', [Validators.required, Validators.pattern(this.unamePattern)]]
    });
  }

  handleInput(event: any) {
    event.preventDefault();
    const value = event.target.value;
    console.log(value)
  }
  onSubmit() {
    console.log(this.numFromGroup)
    if (this.numFromGroup.invalid) return;
    const value = this.numFromGroup.value;
    const mobileNumber = Number(value.mobile_number);
    window.open(this.api+mobileNumber, '_blank')
  }
  get hasError(): string | null {
    if (this.numFromGroup.controls['mobile_number'].errors) {
      const errors = this.numFromGroup.controls['mobile_number'].errors;
      if (errors['required']) {
        return 'required';
      } else if (errors['pattern']) {
        return 'pattern';
      }
    }
    return null;
  }
}
