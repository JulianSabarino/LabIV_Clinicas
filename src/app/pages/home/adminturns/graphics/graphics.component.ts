import { Component } from '@angular/core';
import { BackgroundimageComponent } from '../../../../shared/backgroundimage/backgroundimage.component';
import { TurnsperspecialityComponent } from '../../../../shared/graphics/turnsperspeciality/turnsperspeciality.component';
import { TurnsperdayComponent } from '../../../../shared/graphics/turnsperday/turnsperday.component';
import { TurnsaskedbyrangeComponent } from '../../../../shared/graphics/turnsaskedbyrange/turnsaskedbyrange.component';
import { TurnsfinishedbyrangeComponent } from '../../../../shared/graphics/turnsfinishedbyrange/turnsfinishedbyrange.component';
import { AllturnsaskedbyrangeComponent } from '../../../../shared/graphics/allturnsaskedbyrange/allturnsaskedbyrange.component';
import { AllturnendedbyrangeComponent } from '../../../../shared/graphics/allturnendedbyrange/allturnendedbyrange.component';

@Component({
  selector: 'app-graphics',
  standalone: true,
  imports: [BackgroundimageComponent,TurnsperspecialityComponent,TurnsperdayComponent,AllturnsaskedbyrangeComponent,AllturnendedbyrangeComponent],
  templateUrl: './graphics.component.html',
  styleUrl: './graphics.component.scss'
})
export class GraphicsComponent {

}
