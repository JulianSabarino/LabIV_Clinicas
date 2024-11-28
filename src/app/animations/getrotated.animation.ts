import { trigger, group, style, animate, transition, query, animateChild, stagger } from '@angular/animations';

export const getRotatedAnimation = [
  trigger('getRotatedAnimation', [
    // When the element enters
    transition(':enter', [
      style({ 
        opacity: 0, 
        transform: 'rotate(90deg) translateY(100%)'  // Start from 90° rotation and moved down
      }),
      animate('1s', style({ 
        opacity: 1, 
        transform: 'rotate(0deg) translateY(0%)'  // Rotate back to 0° and move to the original position
      })) 
    ])
  ])
  
];

