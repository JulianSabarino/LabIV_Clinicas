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

  async disableAccount(user:any)
  {
    console.log(user)

    this.spinner.show();
    if(user.active) user.active=false;
    else user.active=true;

    await this.authService.enableAccount(user,user.active);
    this.spinner.hide();

  }
}
