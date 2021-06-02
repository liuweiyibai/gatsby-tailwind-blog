import { createStore } from 'redux';
import produce from 'immer';
import { isWideScreen as setIsWideScreen } from '@/utils/helpers';

/**
 * action types
 */
export const SET_NAVIGATION_POSTS_IS_OPEN = 'SET_NAVIGATION_POSTS_IS_OPEN';
export const SET_SCROLL_TO_TOP = 'SET_SCROLL_TO_TOP';
export const SET_CATEGORY_FILTER_KEYWORD = 'SET_CATEGORY_FILTER_KEYWORD';
export const SET_IS_WIDE_SCREEN = 'SET_IS_WIDE_SCREEN';
export const SET_CATEGORY_FILTER_SHOW = 'SET_CATEGORY_FILTER_SHOW';
export const SET_NAVIGATOR_EXPAND_POSTS_LIST =
  'SET_NAVIGATOR_EXPAND_POSTS_LIST';

export const SET_ASIDER_SHOW = 'SET_ASIDER_SHOW';

const initialState = {
  // 导航栏是否显示文章列表
  // 当主页显示非文章列表是需显示
  navigatorPostsIsOpen: false,

  // 导航栏显示文章列表是否需要展开 默认不展开
  navigatorExpandPostsList: false,

  // 文章分类过滤
  categoryFilterKeyword: 'all',

  // 是否返回顶部
  scrollToTop: false,

  // 屏幕宽度是否大于 1024
  isWideScreen: setIsWideScreen(),

  // 是否显示分类过滤
  // 当主页显示文章里列表时，过滤器显示
  // 当侧边栏显示文章列表是，过滤器显示
  // 当处于非文章列表时，需要显示
  categoryFilterShow: false,

  // 是否显示侧边栏
  asiderShow: true,
};

const appReducer = (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case SET_NAVIGATION_POSTS_IS_OPEN:
        draft.navigatorPostsIsOpen = action.payload;
        break;
      case SET_NAVIGATOR_EXPAND_POSTS_LIST:
        draft.navigatorExpandPostsList = action.payload;
        break;
      case SET_CATEGORY_FILTER_KEYWORD:
        draft.categoryFilterKeyword = action.payload;
        break;
      case SET_SCROLL_TO_TOP:
        draft.scrollToTop = action.payload;
        break;
      case SET_IS_WIDE_SCREEN:
        draft.isWideScreen = action.payload;
        break;
      case SET_CATEGORY_FILTER_SHOW:
        draft.categoryFilterShow = action.payload;
        break;
      case SET_ASIDER_SHOW:
        draft.asiderShow = action.payload;
        break;
      default:
        break;
    }
  });
};

export default createStore(appReducer);
