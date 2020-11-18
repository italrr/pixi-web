import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material";
import { LoadingComponent } from "../tools/loading/loading";

@Injectable()
export class ToolsService {
  constructor(public dialog: MatDialog) {}

  public loading(msg: string, task: any = function() {}): any {
    let dialogRef = this.dialog.open(LoadingComponent, {
      width: "300px",
      height: "300px",
      disableClose: true,
      data: {
        task: task,
        msg: msg
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log("closed loading");
    });

    return dialogRef;
  }
  
}
