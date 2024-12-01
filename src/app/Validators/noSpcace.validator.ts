import {
  AbstractControl,
  FormControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

// export const noSpace = (form: FormControl): ValidationErrors | null => {
//   console.log(form.value);

//   // Check if the value contains any space
//   if (form.value && form.value.includes(' ')) {
//     return { noSpace: true }; // return an error object if there's a space
//   }

//   return null; // return null if there's no space
// };

export const noSpace = (text: string): ValidatorFn => {
  return (form: AbstractControl): ValidationErrors | null => {
    console.log(form.value);

    // Check if the value contains any space
    if (form.value && form.value.includes(text)) {
      return { noSpace: true }; // return an error object if there's a space
    }

    return null; // return null if there's no space
  };
};
