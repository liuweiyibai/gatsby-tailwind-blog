import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from '@reach/router'
import LazyLoad from 'react-lazyload'
import SpringScrollbars from '@/components/SpringScrollbars'
import PostListHeader from '@/components/PostListHeader'
import { useScrollToTop } from '@/utils/hooks'
import PlaceholderComponent from '@/components/Placeholder'
import PostItem from '@/components/PostItem'
import { SET_NAVIGATION_POSTS_IS_OPEN } from '@/store'
import { getCategoryNameByKey } from '@/utils/config'

/**
 * 显示所有的文章，通过 template 重复渲染生成
 */

export default ({ pageContext }) => {
  const dispatch = useDispatch()
  const location = useLocation()
  const scrollRef = useScrollToTop()
  const { posts } = pageContext
  const _posts = posts.map(t => {
    return {
      ...t.node.frontmatter,
      ...t.node.fields,
      timeToRead: t.node.timeToRead,
      excerpt: t.node.excerpt
    }
  })
  const [allPosts, setAllPosts] = useState(_posts)

  useEffect(() => {
    dispatch({
      type: SET_NAVIGATION_POSTS_IS_OPEN,
      payload: false
    })
  }, [dispatch])

  const [list, setList] = useState([])

  const [hasMore, setHasMore] = useState(false)

  const [loadMore, setLoadMore] = useState(false)

  const handleLoadMore = () => setLoadMore(true)

  const categoryFilterKeyword = useSelector(state => state.categoryFilterKeyword)

  useEffect(() => {
    if (loadMore && hasMore) {
      const currentLength = list.length
      const isMore = currentLength < allPosts.length
      const nextResults = isMore ? allPosts.slice(currentLength, currentLength + 10) : []
      setList([...list, ...nextResults])
      setLoadMore(false)
    }
  }, [loadMore, hasMore])

  useEffect(() => {
    const isMore = list.length < allPosts.length
    setHasMore(isMore)
  }, [list, allPosts])

  useEffect(() => {
    if (categoryFilterKeyword !== 'all') {
      const name = getCategoryNameByKey(categoryFilterKeyword)
      const hasCcategory = _posts.filter(t => t.category && t.category.includes(name))
      setAllPosts(hasCcategory)
    } else {
      if (allPosts.length !== _posts.length) {
        setAllPosts(_posts)
      }
    }
  }, [categoryFilterKeyword])

  useEffect(() => {
    setList([...allPosts.slice(0, 10)])
    setHasMore(allPosts.length > 10)
  }, [allPosts])

  return (
    <SpringScrollbars forceCheckOnScroll ref={scrollRef}>
      <section className="blog-posts_list">
        <PostListHeader />
        <ul style={{ padding: 0 }}>
          {list.map(
            (t, i) =>
              t.slug && (
                <LazyLoad key={i} once height={86} debounce={300} offset={100} overflow placeholder={<PlaceholderComponent />}>
                  <PostItem {...t} hideDate={false} location={location} />
                </LazyLoad>
              )
          )}
        </ul>
        <div className="load-more">{hasMore ? <button onClick={handleLoadMore}>加 载 更 多</button> : null}</div>
      </section>
    </SpringScrollbars>
  )
}
