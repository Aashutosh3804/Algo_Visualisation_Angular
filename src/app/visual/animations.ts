import {animate, keyframes, state, style, transition, trigger} from '@angular/animations';

export const Animations = [
  trigger('swap', [
    state('ini', style({
    transform: 'translate({{x1}}px,{{y1}}px)',
      opacity: 0
  }), {params: {x1: 0, y1: 0}}),
    state('i', style({
      transform: 'translate({{x1}}px,{{y1}}px)',

      opacity: 1
    }), {params: {x1: 0, y1: 0}}),
    state('fi', style({
      transform: 'translate({{x}}px,{{y}}px)',
      opacity: 1

    }), {params: {x: 0, y: 0}}),
    state('in', style({
      transform: 'translate({{x}}px,{{y}}px)',
      opacity: 1

    }), {params: {x: 0, y: 0}}),
    transition( '* => fi', animate('300ms')),
    transition( '* => in', animate('500ms')),
    transition('ini=>i', [
      animate(1500, keyframes([
        style({
          opacity: 0.5,
          offset: 0
        }),
        style({
          opacity: 0.8,
          offset: 0.5
        }),
        style({
          opacity: 1,
          offset: 0.8
        })
      ]))
    ]),

    transition('*=>void', [
      animate(2000, keyframes([
        style({
          opacity: 1,
          offset: 0
        }),
        style({
          opacity: 0.5,
          offset: 0.5
        }),
        style({
          opacity: 0,
          offset: 0.8
        })
      ]))
    ])

  ]),
  trigger('line', [
    state('ini', style({
      opacity: 1
    })),
    transition('*=>void', [
      animate(1500, keyframes([
        style({
          opacity: 1,
          offset: 0
        }),
        style({
          opacity: 0.5,
          offset: 0.5
        }),
        style({
          opacity: 0.2,
          offset: 0.8
        })
      ]))
    ]),
    transition('void=>*', [
      animate(1500, keyframes([
        style({
          opacity: 0.2,
          offset: 0
        }),
        style({
          opacity: 0.5,
          offset: 0.5
        }),
        style({
          opacity: 1,
          offset: 0.8
        })
      ]))
    ])
  ])
];
