import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SET_CATEGORY_FILTER_KEYWORD } from '@/store';
import { MdClose } from 'react-icons/md';
import { getCategoryNameByKey } from '@/utils/config';

import IconButton from '../IconButton';

export default () => {
  const dispatch = useDispatch();
  const handleClear = () => {
    dispatch({
      type: SET_CATEGORY_FILTER_KEYWORD,
      payload: 'all',
    });
  };
  const categoryFilterKeyword = useSelector(
    state => state.categoryFilterKeyword
  );

  return categoryFilterKeyword !== 'all' ? (
    <div className='blog-posts-list__filter'>
      <small>Active category filter:</small>
      <strong>{getCategoryNameByKey(categoryFilterKeyword)}</strong>
      <IconButton onClick={handleClear}>
        <MdClose />
      </IconButton>
    </div>
  ) : null;
};
