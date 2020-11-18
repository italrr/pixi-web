import { Component, Inject } from '@angular/core';
import { SessionBus } from '../services/sessionbus.service';
import { Channel } from '../models/Channel';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ErrorStateMatcher, MatDialog, MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { ViewChild } from '@angular/core';
import { ContentService } from '../services/content.service';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm, FormBuilder } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { ToolsService } from '../tools/tools';
import { AuthService } from '../services/auth.service';
import { User } from '../models/User';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'topbar-component',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent {
  private channel: Channel = null;
  private listView: boolean = true;
  private user: User;
  private searchRange: string = "gl";
  private filter: { order:string, sort: string, trend:'hot' } = {
		order: 'des',
		sort: 'pn',
		trend: 'hot'
	};
  
  constructor(private location: Location, private sessionBus: SessionBus, private router: Router, public dialog: MatDialog, private authService: AuthService){
    const me = this;
    sessionBus.listen.subscribe(
      data => {
        if(data.event == "ChannelChange"){
          me.channel = data.data;
        }
        if(data.event == "FilterChange"){
          me.filter = data.data;
        }        
      },
      error => {

      }
    );
    location.subscribe(val => {
      if(val.url.indexOf('/ch/') != 0){
        me.channel = null;
      }
    });
    me.filter = authService.getFilter();
  }

  ngAfterViewInit(){
    this.user = this.authService.getUser();
  }

	onSortChange(){
    const me = this;
		me.sessionBus.announce({ event: "FilterChange", data: me.filter });
	}

	onOrderChange(){
		const me = this;
		me.sessionBus.announce({ event: "FilterChange", data: me.filter });
	}


  goToAbout(){
    const me = this;
    me.channel = null;		
    me.router.navigate(['/about']);		
  }  

  private onSwitchView(){
    const me = this;
    me.listView = !me.listView;
    me.sessionBus.announce({ event: "SwitchView", data: me.listView });
  }

  private onMenu(){

  }

  private onUpload(){
    const me = this;
    const dialogRef = this.dialog.open(UpLoadContentDialogComponent, {
      data: { channel: me.channel }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  private onLogin(){
    const me = this;
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      data: { channel: me.channel }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });    
  }

  private onSortfilter(){

  }

  private onSearch(){

  }

  private onNotifications(){

  }

  private onUser(){

  }
}


@Component({
  selector: 'upload-content-dialog',
  templateUrl: 'upload-content-dialog.component.html',
  styleUrls: ['./upload-content-dialog.component.scss']
})
export class UpLoadContentDialogComponent {
  private channel: Channel;
  private image: string = null;
  private cvDims: {x: number, y: number} = {x: 0, y: 0};
  private showImageError: boolean = false;
  @ViewChild('previewimage', {static: false}) previewImage; 
  @ViewChild('previewimagecv', {static: false}) previewImageCV; 
  private title: string = "";
  private nsfw: boolean = false;
  titleFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(40)
  ]);
  matcher = new MyErrorStateMatcher();

  constructor(    @Inject(MAT_DIALOG_DATA) public data: { channel: Channel }, 
                  private contentService: ContentService, 
                  private toolsService: ToolsService, 
                  private dialogRef: MatDialogRef<UpLoadContentDialogComponent>,
                  private router: Router, 
                  public snackBar: MatSnackBar) {
    const me = this;
    me.channel = data.channel;  
  }

  imgOnLoad(){
    const div = this.previewImageCV.nativeElement;
    const img = this.previewImage.nativeElement;
    const imgDims = {x: img.naturalWidth, y: img.naturalHeight};
    let fdims = {x: 0, y: 0}; // final dimensions

    const imhordiff = imgDims.y / imgDims.x;
    const cvhordiff = this.cvDims.y / this.cvDims.x;

    fdims.x = this.cvDims.x;
    fdims.y = this.cvDims.x * imhordiff;

    img.width = fdims.x;
    img.height = fdims.y;

    
    div.className += " ucd-preview-anim";
  }

  ngAfterViewInit(){
    const div = this.previewImageCV.nativeElement;
    this.cvDims = {x: div.clientWidth, y: div.clientHeight};
  }

  upload(){
    const me = this;
    if(!me.image){
      me.showImageError = true;
      return;
    }
    if(me.titleFormControl.invalid){
      return;
    }

    
    const dialog = this.toolsService.loading('Uploading...', function(){
      me.contentService.upload(me.channel.name, me.titleFormControl.value, "gpJnyxNBr", !me.nsfw, [me.image]).subscribe((data: any) => {
        me.router.navigateByUrl(`/ch/${me.channel.name}#${data["orderId"]}`);

				me.snackBar.open('Success!', 'Dismiss', {
					duration: 2000
				});	        

        dialog.close();
      },
      (error) => {
				me.snackBar.open('Something went wrong', 'Dismiss', {
					duration: 2000
				});	  
        dialog.close();
      });
    });

    me.dialogRef.close();  

  }

  imgInputChange(fileInputEvent: any) {
    const me = this;
    const div = this.previewImageCV.nativeElement;
    const img = this.previewImage.nativeElement;
    const image = fileInputEvent.target.files[0]; 
    me.showImageError = false;
    img.src = "";
    div.className = "ucd-preview-outter";
    if (FileReader && image) {
      let fr = new FileReader();
      fr.onload = function () {
          const result = fr.result.toString();
          var n = result.indexOf(",");
          me.image = result.substring(n + 1, result.length)
          me.previewImage.nativeElement.src = fr.result;
      }
      fr.readAsDataURL(image);
    } 
  }

}


@Component({
  selector: 'login-dialog',
  templateUrl: 'login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent {

  form: FormGroup;
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  passwordControl = new FormControl('', [Validators.required]);
  hidePass: boolean = true;
  logingin: boolean = false;

  constructor(  private contentService: ContentService, 
                private toolsService: ToolsService, 
                private dialogRef: MatDialogRef<LoginDialogComponent>,
                private router: Router, 
                public snackBar: MatSnackBar,
                private authService: AuthService,
                fb: FormBuilder) {
    
    this.form = fb.group({
      emailControl: this.emailControl,
      passwordControl: this.passwordControl,
    });                  

  }

  login(){
    this.logingin = true;

    this.authService.login(this.emailControl.value, this.passwordControl.value).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      });

  }


}