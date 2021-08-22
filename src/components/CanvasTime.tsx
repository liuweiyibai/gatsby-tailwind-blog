import * as React from 'react';
import canvasTime from '@/utils/canvasTime';

const CanvasTime = () => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  React.useEffect(() => {
    if (canvasRef.current !== null) {
      canvasTime(canvasRef.current, localStorage.getItem('theme') === 'true' ? true : false);
    }

    const callback = (e: CustomEventInit) => {
      if (canvasRef.current !== null) {
        canvasTime(canvasRef.current, e.detail);
      }
    };

    window.addEventListener('changeTheme', callback);

    return () => {
      window.removeEventListener('changeTheme', callback);
    };
  }, []);
  return <canvas ref={canvasRef} style={{ width: '220px' }} />;
};

export default CanvasTime;
