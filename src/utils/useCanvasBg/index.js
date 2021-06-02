import { useEffect } from 'react';

import { Ribbons } from './helper';

export function useCanvasBg(config) {
  useEffect(() => {
    let config = {
      animateSections: true,
      colorAlpha: 0.5,
      colorBrightness: '50%',
      colorCycleSpeed: 5,
      colorSaturation: '60%',
      horizontalSpeed: 200,
      parallaxAmount: -0.2,
      ribbonCount: 3,
      strokeSize: 0,
      verticalPosition: 'random',
    };
    new Ribbons(config);
    return () => {};
  }, []);
}
