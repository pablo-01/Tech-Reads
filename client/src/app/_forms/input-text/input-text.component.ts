import { Component, Input, OnInit, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
  ////
  // Control value accesor, interface, allows a bridhe between DOM and angular forms
  // Accessing the form controls from registration component
  ////
@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.css']
})
export class InputTextComponent implements ControlValueAccessor {
 @Input() label: string; // passing
 @Input() type: 'text'; // for field types, initalize with text
 
  // Inject control 
  // @Self - ensured local injection 
  constructor(@Self() public ngControl: NgControl) { 
    this.ngControl.valueAccessor = this; //  acces to control in this component
  } 


  // 3 required methods
  writeValue(obj: any): void {
  }
  registerOnChange(fn: any): void {
  }
  registerOnTouched(fn: any): void {
  }



}
