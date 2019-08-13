import { Component, OnInit, Input } from '@angular/core';
import { formatNumber } from '@angular/common';
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

  fields:FormType = 
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

  
  // criando fields
  _username  = { id: "username", type:"text", label:"Username", placeholder:"Username"};
  _firstname = { id: "firstname", type:"text", label:"First Name", placeholder:"First Name"};
  _lastname  = { id: "lastname", type:"text", label:"Last Name", placeholder:"Last Name"};
  _phone     = { id: "phone", type:"text", label:"Phone", placeholder:"(DD)XXXXXXXXX"};
  _email     = { id: "email", type:"email", label:"Email", placeholder:"Email"};
  _emailconf = { id: "emailconf", type:"email", label:"Conf. Email", placeholder:"Retype your email"};
  _password  = { id: "password", type:"password", label:"Password", placeholder:"Password"};
  _passwconf = { id: "passwconf", type:"password", label:"Conf. Password", placeholder:"Retype your password"};
  
  ngOnInit() {
  }
  reciverFeedback(response) {
    // console.log('Foi emitido o evento', response);
    this.fields[response.field] = response.value;
    
  }
  
  validateData()
  {
    var _data :string[]   =[  this.fields.username,
                              this.fields.email,
                              this.fields.emailconf,
                              this.fields.firstname,
                              this.fields.lastname,
                              this.fields.phone,
                              this.fields.password,
                              this.fields.passwconf
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
    if(this.applyEmailConfirmation && (this.fields.email != this.fields.emailconf)) console.log("EMAIL NÃO CORRESPONDE"); 
  
    // vamos verificar se as senhas conferem
    if(this.applyPasswordConfirmation && (this.fields.password != this.fields.passwconf)) console.log("SENHA NÃO CORRESPONDE"); 
  
  }
}
interface FormType {
  [key: string] :string;
}