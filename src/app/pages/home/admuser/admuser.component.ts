import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { UserinfoPipe } from '../../../pipes/userinfo.pipe';
import { AgePipe } from '../../../pipes/age.pipe';
import { AdminregisterComponent } from '../../../components/adminregister/adminregister.component';
import { TurndategeneratorComponent } from '../../../components/turndategenerator/turndategenerator.component';

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

  async disableAccount()
  {
    this.spinner.show();
    if(this.selectedUser.active) this.selectedUser.active=false;
    else this.selectedUser.active=true;

    await this.authService.enableAccount(this.selectedUser,this.selectedUser.active);
    this.spinner.hide();
  }
}
