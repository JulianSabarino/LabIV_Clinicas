import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { GraphsService } from '../../../services/graphs.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-turnsfinishedbyrange',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './turnsfinishedbyrange.component.html',
  styleUrl: './turnsfinishedbyrange.component.scss'
})
export class TurnsfinishedbyrangeComponent implements OnInit{

  authSvc = inject(AuthService)
  graphSvc = inject(GraphsService);

  medicList: any[] = []
  selectedMedic: string | null = null;
  dateStart?: string;
  dateEnd?: string;

  ammountOfTurns = 0;

  async ngOnInit()
  {
    await this.authSvc.getUserList();
    
    this.authSvc.userList.forEach(user => {
      if(user.userInfo.medic)
        this.medicList.push(user)
    });

  }

  async loadValues()
  {
    if(this.dateStart && this.dateEnd && this.selectedMedic)
    {
      console.log("entre")
      this.ammountOfTurns = await this.graphSvc.turnsFinishedInRange(this.formatDate(this.dateStart),this.formatDate(this.dateEnd), this.selectedMedic)
    }
  }

  selectMedic(event: any): void {
    this.selectedMedic = event.target.value;
    this.loadValues();
  }

  selectRange()
  {
    this.loadValues();
  }

  formatDate(dateString: string): string {
    const parts = dateString.split('-');
    if (parts.length !== 3) {
      return "Invalid date format"; // Handle incorrect input
    }
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }

}
