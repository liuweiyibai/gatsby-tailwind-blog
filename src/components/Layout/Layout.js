import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { throttle } from 'lodash'
import { useStaticQuery, graphql } from 'gatsby'

import { SET_IS_WIDE_SCREEN } from '@/store'
import { isWideScreen as setIsWideScreen } from '@/utils/helpers'
import LayoutWrapper from '@/components/LayoutWrapper'
import Seo from '@/components/Seo'

import Navigator from '../Navigator'
import Actionbar from '../ActionBar'
import Infobar from '../InfoBar'

const Layout = ({ children, title, ...props }) => {
  const { navigate, location, uri } = props
  const _props = { navigate, location, uri }
  const dispatch = useDispatch()
  const throttlerResize = throttle(() => {
    dispatch({
      type: SET_IS_WIDE_SCREEN,
      payload: setIsWideScreen()
    })
  }, 500)

  const posts = useStaticQuery(
    graphql`
      query Myblog {
        allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/posts/" } }, sort: { fields: [frontmatter___date], order: DESC }) {
          nodes {
            frontmatter {
              title
              category
              thumbnail {
                childImageSharp {
                  gatsbyImageData(width: 36, height: 36, layout: FIXED)
                }
              }
            }
            fields {
              slug
            }
          }
        }
      }
    `
  )

  const {
    allMarkdownRemark: { nodes }
  } = posts

  const allPosts = nodes.map(t => {
    return {
      ...t.frontmatter,
      ...t.fields
    }
  })

  useEffect(() => {
    window.addEventListener('resize', throttlerResize)
    return () => {
      window.removeEventListener('resize', throttlerResize)
    }
  }, [dispatch, throttlerResize])
  return (
    <LayoutWrapper>
      <Seo title={title || '博客'} />
      <Navigator {..._props} posts={allPosts} />
      <main className="blog-main__wrapper">
        <div>{children}</div>
      </main>
      <Actionbar {..._props} />
      <Infobar {..._props} />
    </LayoutWrapper>
  )
}

export default Layout
