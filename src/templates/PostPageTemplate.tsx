import * as React from 'react';
import { graphql } from 'gatsby';
import AppLayout from 'Layout/AppLayout';
import DefaultPostLayout from 'Layout/DefaultPostLayout';
import SimplePostLyout from 'Layout/SimplePostLyout';
import Seo from 'components/Seo';

const MapToObject = (obj: markdownRemarkType): markdownRemarkType2 => {
  return {
    ...obj.fields,
    ...obj.frontmatter,
    ...obj,
    fields: null,
    frontmatter: null,
  };
};

interface markdownRemarkType2 {
  html: string;
  timeToRead: number;
  title: string;
  date: string;
  tags: any[];
  layout: string;
  slug: string;
  fields?: null;
  frontmatter?: null;
}

interface markdownRemarkType {
  html: string;
  timeToRead: number;
  frontmatter: {
    title: string;
    slug: string;
    date: string;
    tags: any[];
    layout: string;
  };
  fields: {
    slug: string;
  };
}
interface GraphqlPost {
  markdownRemark: markdownRemarkType;
}

interface PostPageTemplate {
  data: GraphqlPost;
  pageContext: any;
}

const PostPageTemplate: React.FC<PostPageTemplate> = ({ data, pageContext }) => {
  const post = MapToObject(data.markdownRemark);
  return (
    <AppLayout>
      <Seo title={post.title} />
      {post.layout && post.layout === 'simple' ? (
        <SimplePostLyout {...post} {...pageContext} />
      ) : (
        <DefaultPostLayout {...post} {...pageContext} />
      )}
    </AppLayout>
  );
};

export default PostPageTemplate;

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
`;
