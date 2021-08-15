import * as React from "react"
import { graphql } from "gatsby"
import AppLayout from "@/Layout/AppLayout"
import DefaultPostLayout from "@/Layout/DefaultPostLayout"
import SimplePostLyout from "@/Layout/SimplePostLyout"

const MapToObject = (obj: any) => {
  return {
    ...obj.fields,
    ...obj.frontmatter,
    ...obj,
    fields: null,
    frontmatter: null,
  }
}

const PostPageTemplate = ({ data, pageContext }) => {
  const post = MapToObject(data.markdownRemark)
  return (
    <AppLayout>
      {post.layout && post.layout === "simple" ? (
        <SimplePostLyout {...post} {...pageContext} />
      ) : (
        <DefaultPostLayout {...post} {...pageContext} />
      )}
    </AppLayout>
  )
}

export default PostPageTemplate

export const pageQuery = graphql`
  query QueryPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      tableOfContents
      frontmatter {
        title
        slug
        # date(formatString: "YYYY年M月DD日")
        date
        tags
        layout
      }
      fields {
        slug
      }
    }
  }
`
