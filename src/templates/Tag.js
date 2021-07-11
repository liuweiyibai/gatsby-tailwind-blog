import React, { useEffect } from 'react'
import SpringScrollbars from '@/components/SpringScrollbars'
import Tag from '@/components/Tag/index'
import { useDispatch } from 'react-redux'
import { SET_NAVIGATION_POSTS_IS_OPEN } from '@/store'
import { useScrollToTop } from '@/utils/hooks'

export default ({ pageContext }) => {
  const { tags } = pageContext
  const dispatch = useDispatch()
  const scrollRef = useScrollToTop()

  useEffect(() => {
    dispatch({
      type: SET_NAVIGATION_POSTS_IS_OPEN,
      payload: true
    })
  }, [dispatch])
  return (
    <SpringScrollbars ref={scrollRef}>
      <section className="blog-tag_wrapper">
        <div className="tag-card">
          <div className="tag-card-content">
            <div className="tag-card-title">
              <span>总计 {tags.length} 个标签</span>
            </div>
            <div className="tag-card-body">
              {tags.map((tag, index) => (
                <Tag key={index} to={tag.tag} count={tag.count} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </SpringScrollbars>
  )
}
