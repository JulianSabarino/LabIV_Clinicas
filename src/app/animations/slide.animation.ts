import { trigger, group, style, animate, transition, query, animateChild, stagger } from '@angular/animations';

export const slideInAnimation = 
[
    trigger('slideInAnimation', [ 
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateX(-100%)'}),
          stagger('500ms', [
            animate('700ms', style({ opacity: 1, transform: 'translateY(0)'}))
          ])
        ], { optional: true }),
        query(':leave', [
          stagger('500ms', [
            animate('700ms', style({ opacity: 0,  transform: 'translateX(100%)'}))
          ])
        ], { optional: true })
      ])
    ])
  ]
