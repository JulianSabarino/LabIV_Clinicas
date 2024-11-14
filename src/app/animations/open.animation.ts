import { trigger, group, style, animate, transition, query, animateChild, state } from '@angular/animations';

export const openAnimation = trigger('routeAnimations', [
  trigger('openClose', [ 
      state('open', style({
        height: '200px',
        opacity: 1,
        backgroundColor: 'green'
      })),
      state('closed', style({
        height: '100px',
        opacity: 0.8,
        backgroundColor: 'red'
      })),
      transition('open => closed', [
        animate('1s ease-out') // ,step-end
      ],),
      transition('closed => open', [
        animate('10s')
      ]),
    ]),
  
]);