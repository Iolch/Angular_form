import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Field} from './field.model';

@Component({
  selector: 'bsc-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css']
})
export class FieldComponent implements OnInit {

  @Input() field: Field;
  @Output() response = new EventEmitter(); 
  fieldvalue: string="";
  constructor() { }

  ngOnInit() {
  }
  feedback()
  {
    //console.log('EMITE ', this.response.emit({"field": this.field.id, "value": this.fieldvalue}));
    this.response.emit({"field": this.field.id, "value": this.fieldvalue});

  }

}
