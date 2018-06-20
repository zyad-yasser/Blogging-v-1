import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';
import { Directive, Input } from '@angular/core';

@Directive({
    selector:'[passwordMatchValidator]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: PasswordMatchDirective,
        multi:true
    }]
})
export class PasswordMatchDirective implements Validator {
    @Input() passwordMatchValidator : string;
    validate(control: AbstractControl): { [key:string] : any } | null {
        const controlToCompare = control.parent.get(this.passwordMatchValidator);
        if(controlToCompare && controlToCompare.value !== control.value)
            return { 'notEqual' : true };
        return null
    }
}
