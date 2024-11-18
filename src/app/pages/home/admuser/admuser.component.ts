import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { UserinfoPipe } from '../../../pipes/userinfo.pipe';
import { AgePipe } from '../../../pipes/age.pipe';
import { AdminregisterComponent } from '../../../components/adminregister/adminregister.component';
import { TurndategeneratorComponent } from '../../../components/turndategenerator/turndategenerator.component';

//npm install xlsx file-saver --save  --> import * as XLSX from 'xlsx'; --> 
/*
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([header, ...rows]);

    // Create a workbook
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'User Data');

    // Convert the workbook to binary Excel data
    const excelData: Blob = XLSX.write(wb, { bookType: 'xls', type: 'binary' });
*/

import * as FileSaver from 'file-saver';
import { MatDialog } from '@angular/material/dialog';
import { CreatenewadminComponent } from '../../../shared/createnewadmin/createnewadmin.component';


@Component({
  selector: 'app-admuser',
  standalone: true,
  imports: [CommonModule,NgxSpinnerModule,UserinfoPipe,AgePipe,AdminregisterComponent,TurndategeneratorComponent],
  templateUrl: './admuser.component.html',
  styleUrl: './admuser.component.scss'
})
export class AdmuserComponent implements OnInit{

  authService = inject(AuthService);
  spinner = inject(NgxSpinnerService);
  dialog = inject(MatDialog);
  selectedUser: any | null;

  async ngOnInit() {
    this.spinner.show();
    await this.authService.getUserList();
    this.spinner.hide();
  }

  selectUser(user: any)
  {
    this.selectedUser = user;
    console.log(this.selectedUser);
  }

  async disableAccount(user:any)
  {
    console.log(user)

    this.spinner.show();
    if(user.active) user.active=false;
    else user.active=true;

    await this.authService.enableAccount(user,user.active);
    this.spinner.hide();

  }

  exportCSV()
  {
    const header = ['Nombre', 'Apellido', 'Email', 'Edad', 'DNI', 'Es Admin', 'Es Medico', 'Detalles'];
    const rows = this.authService.userList.map(user => [
      user.userInfo.name,
      user.userInfo.surename,
      user.userInfo.mail,
      user.userInfo.age,
      user.userInfo.dni,
      user.userInfo.admin ? 'Si' : 'No',
      user.userInfo.medic ? 'Si' : 'No',
      user.userInfo.info.join('; ')  // Join any info array items into a single string
    ]);

    // Create a CSV string
    let csvContent = header.join(',') + '\n';
    rows.forEach(row => {
      csvContent += row.join(',') + '\n';
    });

    // Create a Blob and use FileSaver.js to download the CSV
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    FileSaver.saveAs(blob, 'users_data.csv');
  }

  async createAdmin()
  {

    const dialogRef = this.dialog.open(CreatenewadminComponent, {
      backdropClass: 'no-backdrop',  // This will make the backdrop invisible
      panelClass: 'centered-dialog', // Apply custom class for centering
      hasBackdrop: false,  // Option
    });
    console.log(dialogRef);

  }
  
}
