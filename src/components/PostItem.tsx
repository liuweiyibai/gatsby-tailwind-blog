import * as React from "react"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
// import styled from "styled-components"
import { getFixed } from "../utils"
import Tag from "../components/Tag"

export interface PropsPostItem {
  slug: string
  date: string
  tags: Array<string>
  title: string
  excerpt: string
  thumbnail?: any
}

// const StyledLi = styled.li.attrs(props => ({
//   className: props.hiddenMore ? "py-8" : "py-4",
// }))``

const PostItem: React.FC<PropsPostItem> = ({
  slug,
  title,
  date,
  tags,
  excerpt,
  thumbnail,
}) => {
  const image = getFixed(thumbnail)
  return (
    <li className="py-8">
      <article>
        <div className="space-y-2 xl:grid xl:grid-cols-4 xl:space-y-0 xl:items-center">
          <div className="hidden lg:grid justify-items-center">
            <GatsbyImage image={image} className="opacity-70" alt={title} />
          </div>
          <div className="space-y-5 xl:col-span-3">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold leading-8 tracking-tight">
                  <Link
                    to={`${slug}`}
                    className="text-gray-900 dark:text-gray-100 hover:text-gray-900"
                  >
                    {title}
                  </Link>
                </h2>
                <div className="flex flex-wrap">
                  {Array.isArray(tags) && tags.map(tag => <Tag text={tag} />)}
                  <time className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                    {date}
                  </time>
                </div>
              </div>
              <div className="prose text-gray-500 max-w-none dark:text-gray-400">
                {excerpt}
              </div>
            </div>
            <div className="text-base font-medium leading-6">
              <Link
                to={`${slug}`}
                className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                aria-label={`Read "${title}"`}
              >
                Read more &rarr;
              </Link>
            </div>
          </div>
        </div>
      </article>
    </li>
  )
}

export default PostItem
