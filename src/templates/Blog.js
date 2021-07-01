import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from '@reach/router'
import LazyLoad from 'react-lazyload'
import SpringScrollbars from '@/components/SpringScrollbars'
import PostListHeader from '@/components/PostListHeader'
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

  const [list, setList] = useState([...allPosts.slice(0, 10)])
  const [hasMore, setHasMore] = useState(allPosts.length > 10)
  const [loadMore, setLoadMore] = useState(false)

  const handleLoadMore = () => setLoadMore(true)

  const categoryFilterKeyword = useSelector(state => state.categoryFilterKeyword)

  useEffect(() => {
    console.log(3333)
    console.log(333)
    if (categoryFilterKeyword !== 'all') {
      const name = getCategoryNameByKey(categoryFilterKeyword)
      const hasCcategory = _posts.filter(t => t.category && t.category.includes(name))
      setAllPosts(hasCcategory)
    }
  }, [_posts, categoryFilterKeyword])

  useEffect(() => {
    if (loadMore && hasMore) {
      const currentLength = list.length
      const isMore = currentLength < allPosts.length
      const nextResults = isMore ? allPosts.slice(currentLength, currentLength + 10) : []
      setList([...list, ...nextResults])
      setLoadMore(false)
    }
  }, [loadMore, hasMore, allPosts])

  useEffect(() => {
    const isMore = list.length < allPosts.length
    setHasMore(isMore)
  }, [list, allPosts])

  return (
    <SpringScrollbars forceCheckOnScroll>
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
        {hasMore ? <button onClick={handleLoadMore}>Load More</button> : <p>No more results</p>}
      </section>
    </SpringScrollbars>
  )
}
