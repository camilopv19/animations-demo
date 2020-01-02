import { trigger, transition, style, animate, state, keyframes, animation, useAnimation, query, animateChild, group } from '@angular/animations';

export let fade = trigger('fade', [
state('void', style({ opacity: 0 })),
    // transition('void <=> *', [  // Bidirectional transition from void to default and viceversa
transition(':enter, :leave', [ // Same as the bidirectional transitions but with aliases
    // for 'void => *, * => void'
    animate(2000)
    ])
]);

export let slide = trigger('slide', [
    transition(':enter', [
        // style({ transform: 'translateX(-10px)' }),
        style({ transform: 'translateX(100%)' }),
        animate('1s ease-in')  // Cubic-bezier with standard alias
    ]),

    transition(':leave', [
        animate('0.5s 1s cubic-bezier(.99,.16,.83,.67)', style({ transform: 'translateX(-100%)' }))
        // animTime, delay, Easing function: Ease-out
    ])
]);

/** CREATION OF A REUSABLE ANIMATION */
export let bounceOutLeftAnimation = animation(
    animate('{{ duration }} {{ easing }}',
        keyframes([
            style({ offset: .2, opacity: 1, transform: 'translateX(20px)' }),
            style({ offset: 1, opacity: 0, transform: 'translateX(-100%)' })
        ])
    )
,{
    params:{    //Default parameters for the interpotalion
        duration: '2s',
        easing: 'ease-out'
}});

export let bounce = trigger('bounce', [
    transition(':enter', [
        animate('0.5s ease-in',
            keyframes([
                style({ offset: 0, opacity: 0, transform: 'translateX(-100%)' }),
                style({ offset: .6, opacity: 1, transform: 'translateX(25px)' }),
                style({ offset: .75, opacity: 1, transform: 'translateX(10px)' }),
                style({ offset: .9, opacity: 1, transform: 'translateX(5px)' }),
                style({ offset: 1, opacity: 1, transform: 'translateX(0px)' }),
            ])
        )
    ]),
    transition(':leave',
        /** Usage the created animation */
        useAnimation(bounceOutLeftAnimation, {
            params: {  // Overriding default values
                duration: '0.5s'
            }
        })
    )
]);

export let customAnimation = trigger('todo', [
    transition(':enter', [
        style({ opacity: 0, backgroundColor: 'blue', color: 'white' }),
        animate(1000)
    ]),
    transition(':leave', [
        style({ backgroundColor: 'red' }),
        animate(1000),
        useAnimation(bounceOutLeftAnimation)])
]);

export let todoAnimations = trigger('todoAnimations', [
    transition(':enter', [
        // group helper for parallel animations (simultaneously)
        group([
            query('h1', [
                style({ transform: 'translateY(-20px)' }),
                animate(1000)
            ]),
            query('@todo', animateChild())
        // .className, #id
        // See Pseudo-selector tokens: DevStudy/Angular/Animations
        ]),
        query('@bounce', animateChild())
        // @todoAnimations and @todo are grouped and @bounce in sequence
    ])
]);
