import { trigger, group, style, animate, transition, query, animateChild, stagger } from '@angular/animations';

export const modalAnimation = [
  trigger('modalAnimation', [
    // When the element enters
    transition(':enter', [
      style({ opacity: 0 }),  // Start from right, fully transparent
      animate('2s', style({ opacity: 1 })) // Move to original position and fade in
    ])
  ])
  
];

