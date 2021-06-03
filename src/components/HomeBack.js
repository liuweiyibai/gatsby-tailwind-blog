import React from 'react';

// const rule = `
//   :doodle {
//     @grid: 25x1 / 18vmin;
//   }
//   :container {
//     perspective: 30vmin;
//   }

//   @place-cell: center;
//   @size: 100%;

//   border: @r(2px) solid @pd(
//     #00b8a9, #f8f3d4, #f6416c, #ffde7d
//   );

//   @random(.1) { border-style: dashed; }
//   @random(.1) { border-style: dotted; }
//   @random(.1) {
//     border-width: @p(3px, 4px);
//     border-style: double;
//   }

//   border-radius: 50%;
//   transform-style: preserve-3d;
//   will-change: transform, opacity;
//   animation: scale-up 7s linear infinite;
//   animation-delay: calc(-7s / @size() * @i());

//   @keyframes scale-up {
//     0%, 100% {
//       transform: translate3d(0, 0, 0) rotate(0);
//       opacity: 0;
//     }
//     10% {
//       opacity: 1;
//     }
//     95% {
//       transform:
//         translate3d(0, 0, 45vmin)
//         rotateX(calc(@p(-1, 1) * @r(30deg, 330deg)))
//         rotateY(calc(@p(-1, 1) * @r(30deg, 330deg)))
//         rotateZ(calc(@p(-1, 1) * @r(30deg, 330deg)))
//     }
//   }`;

const rule = `
:doodle {
  @grid: 500x1/ 40vmin;
  perspective: 10vmin;
}

@place-cell: center;
@size: 40% 1px;

will-change: transform, opacity;
transform-style: preserve-3d;

background: linear-gradient(to left,
  @multi(@p([2-4]), @p(#00b8a9, #f8f3d4, #f6416c, #ffde7d)),
  transparent @r(50%)
);

animation: move @r(10s, 20s, 1) linear infinite;
animation-delay: -@r(1s, 20s);

--trans:
  translateX(50%)
  rotateX(@r(-180deg, 180deg))
  rotateY(@r(-180deg, 180deg))
  rotateZ(@r(-180deg, 180deg));

transform-origin: 0 center;
transform: var(--trans) scale(2);
opacity: 0;

@keyframes move {
  20% { opacity: 1; }
  100% { transform: var(--trans) scale(0); }
}`

export default () => <css-doodle>{rule}</css-doodle>;
