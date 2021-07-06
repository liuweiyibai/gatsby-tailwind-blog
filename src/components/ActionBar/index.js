import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import screenfull from 'screenfull'
import { SET_SCROLL_TO_TOP, SET_ASIDER_SHOW } from '@/store'
import IconBtn from '../IconButton'
import CategoryFilter from './CategoryFilter'
import { MdHome, MdSearch, MdFullscreen, MdFullscreenExit, MdArrowUpward, MdDashboard } from 'react-icons/md'

// >1024 时显示在右侧，<1024 时在底部
export default ({ uri, navigate }) => {
  const dispatch = useDispatch()
  const [fullscreen, setFullscreen] = useState(false)
  const categoryFilterShow = useSelector(state => state.categoryFilterShow)
  const asiderShow = useSelector(state => state.asiderShow)

  const handleHomeClick = () => {
    navigate('/')
  }

  const handleScrollToTop = () => {
    dispatch({
      type: SET_SCROLL_TO_TOP,
      payload: true
    })
  }

  const handleToggleFullScreen = () => {
    if (screenfull.isEnabled) {
      screenfull.toggle()
    }
  }

  const handleSetAsider = () => {
    dispatch({
      type: SET_ASIDER_SHOW,
      payload: !asiderShow
    })
  }

  useEffect(() => {
    if (screenfull.isEnabled) {
      screenfull.on('change', () => {
        setFullscreen(screenfull.isFullscreen)
      })
    }
    return () => {
      if (screenfull.isEnabled) {
        screenfull.off('change')
      }
    }
  }, [])

  const styles = () => {
    if (asiderShow) {
      return { transform: 'rotate(90deg)' }
    }
  }
  return (
    <div className="action-bar__wrapper">
      <div className="action-bar__content">
        <IconBtn aria-label="返回文章列表" title="返回文章列表" onClick={handleHomeClick}>
          <MdHome />
        </IconBtn>

        {((categoryFilterShow && asiderShow) || uri === '/') && <CategoryFilter />}

        <IconBtn onClick={() => navigate('/search')}>
          <MdSearch />
        </IconBtn>

        <IconBtn
          className="hide-icon-button"
          onClick={handleSetAsider}
          style={{
            ...styles()
          }}
        >
          <MdDashboard />
        </IconBtn>
      </div>
      <div className="action-bar__content">
        {/* 缺少一个字体大小调节 */}
        <IconBtn onClick={handleToggleFullScreen}>{fullscreen ? <MdFullscreenExit /> : <MdFullscreen />}</IconBtn>
        <IconBtn aria-label="返回顶部" onClick={handleScrollToTop} title="返回顶部">
          <MdArrowUpward />
        </IconBtn>
      </div>
    </div>
  )
}
