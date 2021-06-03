import React, { Fragment } from 'react';
import { graphql } from 'gatsby';
import Page404 from '@/assets/svgs/page-404.svg';

import Seo from '@/components/Seo';

const NotFoundPage = ({ data }) => {
  // const siteTitle = data.site.siteMetadata.title;

  return (
    <div className="post-detail__wrapper">
      <Seo title="404: Not Found" />
      <div className="page-404-container">
        <Page404 />
      </div>
    </div>
  );
};

export default NotFoundPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
