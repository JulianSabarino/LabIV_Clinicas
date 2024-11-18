import { trigger, group, style, animate, transition, query, animateChild, stagger } from '@angular/animations';

export const slideInAnimation = 
[
    trigger('slideInAnimation', [ 
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(-100px)'}),
          stagger('1s', [
            animate('1s', style({ opacity: 1, transform: 'translateY(0)'}))
          ])
        ], { optional: true }),
        query(':leave', [
          stagger('100ms', [
            animate('1s', style({ opacity: 0,  "margin-top":"16rem"}))
          ])
        ], { optional: true })
      ])
    ])
  ]
