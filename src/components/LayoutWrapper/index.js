import React from 'react'
import classnames from 'classnames'
import { useCanvasBg } from '@/utils/useCanvasBg'

export default ({ children, className, style }) => {
  const classes = classnames('blog-layout__wrapper', className)
  useCanvasBg()
  return (
    <div className={classes} style={style ? { ...style } : {}}>
      <div style={{ zIndex: 2, background: `rgba(255,255,255,.7)` }}>{children}</div>
    </div>
  )
}
