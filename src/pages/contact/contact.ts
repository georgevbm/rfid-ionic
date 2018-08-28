import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Patrimony } from '../../model/patrimony';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { PatrimonyProvider } from '../../providers/patrimony/patrimony';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
  providers: [PatrimonyProvider]
})
export class ContactPage implements OnInit{
  
  private newPatrimonyForm: FormGroup;
  private patrimony:Patrimony;

  constructor(
    public navCtrl: NavController,
    private fb: FormBuilder,
    private patrimonyProvider:PatrimonyProvider) {
      this.patrimony = new Patrimony();
  }

  ngOnInit(): void {
    this.buildForm();
  }

  public buildForm(): void {
    this.newPatrimonyForm = this.fb.group({
      'name': [this.patrimony.name, Validators.required],
      'description': [this.patrimony.description, Validators.required],
      'tagId': [this.patrimony.tagId, Validators.required]
    });
  }

  public async onSubmit(){
    try {
      let patrimony = await this.patrimonyProvider.save(this.newPatrimonyForm.value).toPromise();
    } catch (error) {
      console.log('error: ', error);
    }
  }

}
