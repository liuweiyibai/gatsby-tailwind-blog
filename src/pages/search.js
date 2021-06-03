import React from 'react';
import { graphql, Link } from 'gatsby';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  SearchBox,
  Hits,
  Stats,
  Pagination,
} from 'react-instantsearch-dom';

import SpringScrollbars from '@/components/SpringScrollbars';
import AlgoliaFull from '@/assets/svgs/algolia-full.svg';

const Hit = ({ hit }) => {
  return (
    <Link className="li-a" to={hit.slug}>
      {hit.title}
    </Link>
  );
};

export default ({ navigate, location, uri, ...props }) => {
  const { data } = props;
  const algolia = data.site.siteMetadata.algolia;
  const searchClient = algoliasearch(algolia.appId, algolia.searchOnlyApiKey);

  return (
    <SpringScrollbars>
      <article className="blog-search_wrapper">
        <div className="blog-search__header">
          <h1>Search by</h1>
          <a
            href="https://www.algolia.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            <AlgoliaFull />
          </a>
        </div>
        {algolia && algolia.appId && (
          <InstantSearch
            searchClient={searchClient}
            indexName={algolia.indexName}
          >
            <SearchBox translations={{ placeholder: '搜索...' }} />
            <Stats />
            <Hits hitComponent={Hit} />
            <Pagination />
          </InstantSearch>
        )}
      </article>
    </SpringScrollbars>
  );
};

//eslint-disable-next-line no-undef
export const query = graphql`
  query AlgoliaQuery {
    site {
      siteMetadata {
        algolia {
          appId
          searchOnlyApiKey
          indexName
        }
      }
    }
  }
`;
