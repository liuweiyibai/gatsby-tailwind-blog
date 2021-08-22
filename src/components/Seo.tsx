import React from 'react';
import Helmet from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

interface SeoProps {
  description?: string;
  lang?: string;
  meta?: Array<{ name: string; content: string }>;
  title: string;
}

const Seo: React.FC<SeoProps> = ({ title }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            lang
            author {
              name
              description
            }
          }
        }
      }
    `,
  );

  const {
    siteMetadata: {
      author: { name: author, description },
      lang,
    },
  } = site;

  const _title = title || site.siteMetadata.title;
  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={_title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: description,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: description,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: description,
        },
        {
          name: 'author',
          content: author,
        },
        {
          name: 'apple-mobile-web-app-capable',
          content: 'yes',
        },
        {
          name: 'viewport',
          content:
            'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no,shrink-to-fit=no',
        },
      ]}
    />
  );
};

export default Seo;
