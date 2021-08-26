import * as React from 'react';

import Seo from '../components/Seo';

import AppLayout from '../Layout/AppLayout';

const SecondPage = () => (
  <AppLayout>
    <Seo title="我的书架" />

    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="pt-6 pb-8 space-y-2 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          我的书架
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">自己正在看到书，技术相关书籍，🔥侵删...</p>
      </div>
      <ul className="pt-4 grid grid-cols-4 gap-4">
        {[...new Array(8)].map(t => {
          return (
            <li key={t} className="flex items-center justify-center">
              <img
                className="hover:shadow-md"
                style={{ height: '100%', width: '140px' }}
                src="http://i1274.photobucket.com/albums/y436/jabas1/aclockworkorange_zpsab4c6d1f.jpg"
                alt=""
              />
            </li>
          );
        })}
      </ul>
    </div>
  </AppLayout>
);

export default SecondPage;
