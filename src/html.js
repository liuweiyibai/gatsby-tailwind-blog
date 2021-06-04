import React from 'react'
import PropTypes from 'prop-types'
export default function HTML(props) {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        {props.headComponents}
        {process.env.NODE_ENV === 'production' && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                var hm = document.createElement('script')
                hm.src = 'https://hm.baidu.com/hm.js?b003ec8715c3cc2a4008d91cbed0dae6'
                hm.async = true
                var _hmt = _hmt || []
                var s = document.getElementsByTagName('script')[0]
                s.parentNode.insertBefore(hm, s)
              `
            }}
          />
        )}
        <style>
          {`
            #nprogress {
              pointer-events: none;
            }

            #nprogress .bar {
              background: #66B889;
              position: fixed;
              z-index: 1031;
              top: 0;
              left: 0;
              width: 100%;
              height: 2px;
            }

            /* Fancy blur effect */
            #nprogress .peg {
              display: block;
              position: absolute;
              right: 0px;
              width: 100px;
              height: 100%;
              box-shadow: 0 0 10px #29d, 0 0 5px #29d;
              opacity: 1.0;
              -webkit-transform: rotate(3deg) translate(0px, -4px);
                  -ms-transform: rotate(3deg) translate(0px, -4px);
                      transform: rotate(3deg) translate(0px, -4px);
            }

            /* Remove these to get rid of the spinner */
            #nprogress .spinner {
              display: block;
              position: fixed;
              z-index: 1031;
              top: 15px;
              right: 15px;
            }

            #nprogress .spinner-icon {
              width: 18px;
              height: 18px;
              box-sizing: border-box;

              border: solid 2px transparent;
              border-top-color: #29d;
              border-left-color: #29d;
              border-radius: 50%;

              -webkit-animation: nprogress-spinner 400ms linear infinite;
                      animation: nprogress-spinner 400ms linear infinite;
            }

            .nprogress-custom-parent {
              overflow: hidden;
              position: relative;
            }

            .nprogress-custom-parent #nprogress .spinner,
            .nprogress-custom-parent #nprogress .bar {
              position: absolute;
            }

            @-webkit-keyframes nprogress-spinner {
              0%   { -webkit-transform: rotate(0deg); }
              100% { -webkit-transform: rotate(360deg); }
            }
            @keyframes nprogress-spinner {
              0%   { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <div key={`body`} id="___gatsby" dangerouslySetInnerHTML={{ __html: props.body }} />
        {props.postBodyComponents}
      </body>
    </html>
  )
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array
}
