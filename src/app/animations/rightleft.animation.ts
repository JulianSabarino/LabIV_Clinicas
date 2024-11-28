import { trigger, group, style, animate, transition, query, animateChild, stagger } from '@angular/animations';

/*

This does not function if there are too many elements in the dom
export const rightLeftAnimation = 
[
    trigger('rightLeftAnimation', [ 
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateX(100%)' }),  // Start from right, fully transparent
          animate('3s', style({ opacity: 1, transform: 'translateX(0)' })) // Move to original position and fade in
        ]),
        query(':leave', [
          style({ opacity: 0, transform: 'translateX(0%)' }),  // Start from right, fully transparent
          animate('3s', style({ opacity: 1, transform: 'translateX(100%)' })) // Move to original position and fade in
        ])
      ])
    ])
  ]
*/

export const rightLeftAnimation = [
  trigger('rightLeftAnimation', [
    // When the element enters
    transition(':enter', [
      style({ opacity: 0, transform: 'translateX(100%)' }),  // Start from right, fully transparent
      animate('2s', style({ opacity: 1, transform: 'translateX(0%)' })) // Move to original position and fade in
    ])
  ])
  
];

