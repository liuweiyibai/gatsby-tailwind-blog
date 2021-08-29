import * as React from 'react';
import Seo from '@/components/Seo';
import AppLayout from '@/Layout/AppLayout';

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

      <div className="flex items-center justify-center">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 py-8">
          {[...new Array(10)].map((t, i) => {
            return (
              <div key={i} className="relative bg-white py-4 px-4 rounded-3xl w-64 my-4 shadow-xl">
                <img
                  className="hover:shadow-md"
                  src="https://clearlywind.oss-cn-beijing.aliyuncs.com/blog-images/%E4%BD%A0%E4%B8%8D%E7%9F%A5%E9%81%93%E7%9A%84JavaScript%EF%BC%88%E4%B8%8A%E5%8D%B7%EF%BC%89.png"
                  alt=""
                />
                <div className="mt-4">
                  <div className="border-t-2" />
                  <div className="mt-2">
                    <a
                      className="font-semibold text-base text-gray-800"
                      href="//clearlywind.com/pdf/数据结构与算法JavaScript描述.pdf"
                      target="_blank"
                    >
                      《数据结构与算法JavaScript描述》
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </AppLayout>
);

export default SecondPage;
