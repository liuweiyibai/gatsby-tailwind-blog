import React from 'react';

export default function HTML(props: any) {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        {props.headComponents}
        <script
          dangerouslySetInnerHTML={{
            __html: `
                if(window.location.href.indexOf('lwyb.me') > -1){
                  var hm = document.createElement('script')
                  hm.src = 'https://hm.baidu.com/hm.js?b003ec8715c3cc2a4008d91cbed0dae6'
                  hm.async = true
                  var _hmt = _hmt || []
                  var s = document.getElementsByTagName('script')[0]
                  s.parentNode.insertBefore(hm, s)
                }
              `,
          }}
        />
      </head>
      <body {...props.bodyAttributes} className="antialiased text-black bg-white dark:bg-gray-900 dark:text-white">
        {props.preBodyComponents}
        <div key="body" id="___gatsby" dangerouslySetInnerHTML={{ __html: props.body }} />
        {props.postBodyComponents}
      </body>
    </html>
  );
}
