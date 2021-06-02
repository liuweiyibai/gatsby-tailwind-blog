import React from 'react';
import cogoToast from 'cogo-toast';

/**
 * 复制文本
 * @param {*} text
 */
function copy(text) {
  const textarea = document.createElement('textarea');
  // 将该 textarea 设为 readonly 防止 iOS 下自动唤起键盘，同时将 textarea 移出可视区域
  textarea.readOnly = 'readonly';
  textarea.style.position = 'absolute';
  textarea.style.left = '-9999px';
  // 将要 copy 的值赋给 textarea 标签的 value 属性
  textarea.value = text;
  // 将 textarea 插入到 body 中
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
}

export default ({ href }) => {
  const handleCopy = href => {
    copy(href);
    cogoToast.success('复制成功!', { position: 'bottom-center' });
  };

  return (
    <div className="post-copyright">
      <div>
        <span className="post-copyright-meta">Author：</span>
        <span className="post-copyright-info">
          <a
            href="mailto:lw1140@163.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            刘威益佰
          </a>
        </span>
      </div>
      <div>
        <span className="post-copyright-meta">版权声明：</span>
        <span className="post-copyright-info">
          本文为博主原创文章，遵循
          <a
            href="https://creativecommons.org/licenses/by-sa/4.0/"
            target="_blank"
            rel="noopener noreferrer"
          >
            &nbsp;CC 4.0 BY-SA&nbsp;
          </a>
          版权协议，转载请附上原文出处链接和本声明
        </span>
      </div>
      <div>
        <span className="post-copyright-meta">Link：</span>
        <span className="post-copyright-info">
          <a
            rel="noopener noreferrer"
            role="button"
            tabIndex="copycopyrght"
            onClick={event => {
              event.stopPropagation();
              handleCopy(href);
              return false;
            }}
          >
            {href ? decodeURI(href) : '-'}
          </a>
        </span>
      </div>
    </div>
  );
};
