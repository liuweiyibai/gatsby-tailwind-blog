export const MenuListPaths = [
  {
    path: '',
    name: '日志',
  },
  {
    path: 'archive',
    name: '归档',
  },
  {
    path: 'tag',
    name: '标签',
  },
  {
    path: 'about',
    name: '关于我',
  },
];

export const CategoryListPaths = [
  {
    key: 'all',
    name: '全部',
  },
  {
    key: 'bian_chang_bi_note',
    name: '编程笔记',
  },
  {
    key: 'li_shi_ren_wen',
    name: '历史人文',
  },
  {
    key: 'du_shu_bi_ji',
    name: '读书笔记',
  },
];

export const getCategoryNameByKey = key =>
  CategoryListPaths.find(t => t.key === key).name;
