import React from 'react';
import { graphql } from 'gatsby';
import AppLayout from '../Layout/AppLayout';
import BlogListLayout from '@/Layout/BlogListLayout';
import Seo from '@/components/Seo';

function MapObject(obj: any) {
  return {
    ...obj.frontmatter,
    ...obj.fields,
    ...obj,
    frontmatter: '',
  };
}

const BlogTemplate: React.FC = ({ data, pageContext }) => {
  const result = data.allMarkdownRemark.edges;

  const posts = result.map((t: any) => t.node).map(MapObject);

  return (
    <AppLayout>
      <Seo title="首页" />
      <BlogListLayout
        posts={posts}
        pagination={{
          ...pageContext,
        }}
      />
    </AppLayout>
  );
};

export default BlogTemplate;

export const blogListQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/posts/" } }
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "YYYY-MM-DD")
            category
            tags
            thumbnail {
              childImageSharp {
                gatsbyImageData(width: 80, height: 80)
              }
            }
          }
          timeToRead
          excerpt(pruneLength: 100, truncate: true)
        }
      }
    }
  }
`;
