import React from 'react';
import { graphql } from 'gatsby';
import AppLayout from '../Layout/AppLayout';
import BlogListLayout from '@/Layout/BlogListLayout';

function MapObject(obj: any) {
  return {
    ...obj.frontmatter,
    ...obj.fields,
    ...obj,
    frontmatter: null,
    fields: null,
  };
}

const SigleTagPageTemplate: React.FC = ({ pageContext, data }) => {
  const result = data.allMarkdownRemark.nodes;

  const posts = result.map(MapObject);

  return (
    <AppLayout>
      <BlogListLayout posts={posts} pagination={null} title={pageContext.tag} />
    </AppLayout>
  );
};

export default SigleTagPageTemplate;

export const pageQuery = graphql`
  query ($tag: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      nodes {
        fields {
          slug
        }
        frontmatter {
          date(formatString: "YYYY-MM-DD")
          title
          tags
          thumbnail {
            childImageSharp {
              gatsbyImageData(width: 80, height: 80)
            }
          }
        }
        timeToRead
        excerpt(pruneLength: 60, truncate: true)
      }
    }
  }
`;
