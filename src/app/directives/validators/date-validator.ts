import {Directive} from '@angular/core';
import {AbstractControl} from '@angular/forms';

export class DateValidator {

  static matchDate(AC: AbstractControl) {
    let dateToday = Date.now();
    if(AC.get('dateEcheance') !== null){
      let dateEcheance = AC.get('dateEcheance').value; // to get value in input tag
      if (dateEcheance !== null) {
        if (dateEcheance < dateToday) {
          console.log('false');
          AC.get('dateEcheance').setErrors({matchDate: true})
        } else {
          console.log('true');
          return null
        }
      } else {
        console.log('true');
        return null
      }
    }else {
      console.log('true');
      return null
    }


  }

}
