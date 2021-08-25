import React from 'react';
import { Link } from 'gatsby';
import { kebabCase } from 'lodash-es';

interface Props {
  text: string;
}

const Tag: React.FC<Props> = ({ text }) => {
  return (
    <Link to={`/tag/${kebabCase(text)}`}>
      <span className="mr-3 text-sm font-medium text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
        {text}
      </span>
    </Link>
  );
};

export default Tag;
