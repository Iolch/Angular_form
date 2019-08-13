import { Component, OnInit, Input } from '@angular/core';
import { formatNumber } from '@angular/common';
import { Field } from 'src/app/field/field.model';

@Component({
  selector     :'bsc-form',
  templateUrl  :'./form.component.html',
  styleUrls    :['./form.component.css']
})
export class FormComponent implements OnInit {

  @Input("addusername")             applyUsername             :boolean = false;
  @Input("addemail")                applyEmail                :boolean = true;
  @Input("addemailconfirmation")    applyEmailConfirmation    :boolean = false;
  @Input("addfirstname")            applyFirstName            :boolean = false;
  @Input("addlastname")             applyLastName             :boolean = false;
  @Input("addphone")                applyPhone                :boolean = false;
  @Input("addpassword")             applyPassword             :boolean = true;
  @Input("addpasswordconfirmation") applyPasswordConfirmation :boolean = false;

  fields: Field[];
  fieldsvalue:FormType = 
  {
    username  :"",
    email     :"",
    emailconf :"",
    firstname :"",
    lastname  :"",
    phone     :"",
    password  :"",
    passwconf :"",
  };

  
  
  constructor()
  {
    
  }
  ngOnInit() {
    //TEM QUE SER EXECUTADO NO ONINIT, QUANDO OS INPUTS JÁ FORAM COMPUTADOS
    this.fields  =
    [
      {id: "username", type:"text", label:"Username", placeholder:"Username", render:this.applyUsername},
      {id: "firstname", type:"text", label:"First Name", placeholder:"First Name", render:this.applyFirstName},
      {id: "lastname", type:"text", label:"Last Name", placeholder:"Last Name", render:this.applyLastName},
      {id: "phone", type:"text", label:"Phone", placeholder:"(DD)XXXXXXXXX", render:this.applyPhone},
      {id: "email", type:"email", label:"Email", placeholder:"Email", render:(this.applyEmail||this.applyEmailConfirmation)},
      {id: "emailconf", type:"email", label:"Conf. Email", placeholder:"Retype your email", render:this.applyEmailConfirmation},
      {id: "password", type:"password", label:"Password", placeholder:"Password", render:(this.applyPassword||this.applyPasswordConfirmation)},
      {id: "passwconf", type:"password", label:"Conf. Password", placeholder:"Retype your password", render:this.applyPasswordConfirmation},
    ];
  }
  reciverFeedback(response) {
    // console.log('Foi emitido o evento', response);
    this.fieldsvalue[response.field] = response.value;
    
  }
  
  validateData()
  {
    var _data :string[]   =[  this.fieldsvalue.username,
                              this.fieldsvalue.email,
                              this.fieldsvalue.emailconf,
                              this.fieldsvalue.firstname,
                              this.fieldsvalue.lastname,
                              this.fieldsvalue.phone,
                              this.fieldsvalue.password,
                              this.fieldsvalue.passwconf
                            ];

    var _fields :boolean[] =[ this.applyUsername,
                              this.applyEmail,
                              this.applyEmailConfirmation,  
                              this.applyFirstName,          
                              this.applyLastName,          
                              this.applyPhone,           
                              this.applyPassword,           
                              this.applyPasswordConfirmation,
                            ];

    // vamos verificar se há algum campo vazio
    for(var el:number = 0; el < _fields.length; el++)
    {
      if(_fields[el] && (_data[el]==="" || _data[el] === null)) console.log(`VALIDAÇÃO FALHOU ${_data[el]}`);
    }
    // vamos verificar se os emails conferem
    if(this.applyEmailConfirmation && (this.fieldsvalue.email != this.fieldsvalue.emailconf)) console.log("EMAIL NÃO CORRESPONDE"); 
  
    // vamos verificar se as senhas conferem
    if(this.applyPasswordConfirmation && (this.fieldsvalue.password != this.fieldsvalue.passwconf)) console.log("SENHA NÃO CORRESPONDE"); 
  
  }
}
interface FormType {
  [key: string] :string;
}