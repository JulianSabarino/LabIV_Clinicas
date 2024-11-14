import { trigger, group, style, animate, transition, query, animateChild } from '@angular/animations';

export const slideInAnimation = trigger('routeAnimations', [
    trigger('slideAnimation', [
        // Slide in from the right for "Next"
        transition(':increment', [
          style({ transform: 'translateX(100%)' }),
          animate('500ms ease-in-out', style({ transform: 'translateX(0%)' })),
        ]),
        // Slide in from the left for "Previous"
        transition(':decrement', [
          style({ transform: 'translateX(-100%)' }),
          animate('500ms ease-in-out', style({ transform: 'translateX(0%)' })),
        ]),
      ])
]);