import * as React from 'react';
import canvasTime from 'utils/canvasTime';

const CanvasTime = () => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null!);
  React.useEffect(() => {
    canvasTime(canvasRef.current, localStorage.getItem('theme') === 'true' ? true : false);

    const callback = (e: CustomEventInit) => {
      canvasTime(canvasRef.current, e.detail);
    };

    window.addEventListener('changeTheme', callback);

    return () => {
      window.removeEventListener('changeTheme', callback);
    };
  }, []);
  return <canvas ref={canvasRef} style={{ width: '220px' }} />;
};

export default CanvasTime;
