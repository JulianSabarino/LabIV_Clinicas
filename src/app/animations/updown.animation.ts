import { trigger, group, style, animate, transition, query, animateChild, stagger } from '@angular/animations';

export const upDownAnimation = [
  trigger('upDownAnimation', [
    // When the element enters
    transition(':enter', [
      style({ opacity: 0, transform: 'translateY(100%)' }),  // Start from right, fully transparent
      animate('1s', style({ opacity: 1, transform: 'translateY(0%)' })) // Move to original position and fade in
    ])
  ])
  
];

