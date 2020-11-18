import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
    selector: 'loading',
    templateUrl: './loading.html',
    styleUrls: ['./loading.scss']
})
export class LoadingComponent {
    constructor(public dialogRef: MatDialogRef<LoadingComponent>, @Inject(MAT_DIALOG_DATA) public data: any){ 
        const me = this;
        var timeout = setTimeout(function(){
            data.task();
        }, 350);
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onClose(): void {
        this.dialogRef.close();        
    }
}
