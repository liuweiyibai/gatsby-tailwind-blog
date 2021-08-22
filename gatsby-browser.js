import './src/styles/tailwindcss.css';
import { SideBarBtns } from './src/utils';

export const onRouteUpdate = () => {
  /** The SideBarBtns object is created */
  let sidebarbtns = new SideBarBtns();
  /** If the current page is an article page */
  if (document.getElementById('scroll-btn')) {
    /** The SideBarBtns object is initialized */
    sidebarbtns.Initialize();
  }
};
