import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { EspecialidadesService } from '../../../services/especialidades.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-userturns',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './userturns.component.html',
  styleUrl: './userturns.component.scss',
  animations:
  [trigger('openClose', [
    state('open', style({
      height: '200px',
      opacity: 1,
      backgroundColor: 'green'
    })),
  state('closed',style({
    height: '100px',
    opacity: 0.8,
    backgroundColor: 'red'
  })),
  transition('open => closed', [
    animate('2s ease-out')
  ],),
  transition('closed => open', [
    animate('10s')
  ]),
  ]),
],
})
export class UserturnsComponent implements OnInit{
  especialidadesSrv = inject(EspecialidadesService);

  ngOnInit(): void {
    this.especialidadesSrv.getEspecialidadesList();
  }
}
