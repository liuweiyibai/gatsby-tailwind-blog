import React, { Fragment } from 'react'
import classnames from 'classnames'

// import { useCanvasBg } from '@/utils/useCanvasBg'

export default ({ children, className, style }) => {
  const classes = classnames('blog-layout__wrapper', className)
  // useCanvasBg()
  return (
    <Fragment>
      <div className={classes} style={style ? { ...style } : {}}>
        <div style={{ zIndex: 2, background: `rgba(255,255,255,.9)` }}>{children}</div>
      </div>
    </Fragment>
  )
}
