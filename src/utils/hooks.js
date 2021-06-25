import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { SET_SCROLL_TO_TOP } from '@/store'

/**
 * @description: Hooks useDocumentTitle 改变标题钩子
 * @param {title} 	 string    标题名字
 * @demo  =>  useDocumentTitle('标题名字')
 */

export function useDocumentTitle(title) {
  const prevTitleRef = useRef(title)
  useEffect(() => {
    document.title = title
    return () => {
      document.title = prevTitleRef.current
    }
  }, [title])
}

export function useScrollToTop() {
  const scrollRef = useRef(null)
  const dispatch = useDispatch()
  const scrollToTop = useSelector(state => state.scrollToTop)
  const handleScrollToTop = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollToTop()
    }
  }

  useEffect(() => {
    if (scrollToTop) {
      handleScrollToTop()
      dispatch({
        type: SET_SCROLL_TO_TOP,
        payload: false
      })
    }
  }, [scrollToTop, dispatch])
  return scrollRef
}
