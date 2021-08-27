import React from 'react';
import Popup from 'reactjs-popup';

const ToolTipQrCode = () => {
  return (
    <Popup
      position="bottom center"
      arrow={false}
      on="hover"
      trigger={
        <a
          onClick={() => false}
          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 cursor-pointer"
        >
          @VX
        </a>
      }
    >
      <img src="//cdn.clearlywind.com/blog-images/images/liuweiyibai.jpeg" className="w-52 h-auto" />
    </Popup>
  );
};

export default ToolTipQrCode;
