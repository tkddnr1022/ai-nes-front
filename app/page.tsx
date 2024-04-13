const posts = [
  {
    id: 1,
    title: '기사 제목',
    href: '#',
    description:
      '기사내용',
    date: '2024년 4월 12일',
    datetime: '2024-04-12',
    category: { title: '정치', href: '#' },
    author: {
      name: '기자',
      role: '언론사',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    id: 2,
    title: '기사 제목',
    href: '#',
    description:
      '기사내용',
    date: '2024년 4월 12일',
    datetime: '2024-04-12',
    category: { title: '정치', href: '#' },
    author: {
      name: '기자',
      role: '언론사',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    id: 3,
    title: '기사 제목',
    href: '#',
    description:
      '기사내용',
    date: '2024년 4월 12일',
    datetime: '2024-04-12',
    category: { title: '정치', href: '#' },
    author: {
      name: '기자',
      role: '언론사',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
]

export default function Home() {
  return (
    <div>
    <div className="relative overflow-hidden bg-white">
      <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
        <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
          <div className="sm:max-w-lg">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              뉴스와 여론이 한 페이지에
            </h1>
            <p className="mt-4 text-xl text-gray-500">
              뉴스 기사의 내용을 보기 쉽게 요약하고 여론의 감정을 예측합니다. AI가 분석하는 뉴스를 만나보세요.
            </p>
          </div>
          <div>
            <div className="mt-10">
              {/* Decorative image grid */}
              <div
                aria-hidden="true"
                className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
              >
                <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                  <div className="flex items-center space-x-6 lg:space-x-8">
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                        <img
                          src="https://yt3.googleusercontent.com/w7ColCSgsKVMJuh6izq4oRlYn-ZkJ8roQuHQy1Nvc75ONCH7uzLmoUE5YMJtZqFCHb4ZFPxAOg=s900-c-k-c0x00ffffff-no-rj"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src="https://yt3.googleusercontent.com/ytc/AIdro_k63f49sv4QTvI0tZZMCUW5jHrpALVurb9S7xgzjFMIfzQ=s900-c-k-c0x00ffffff-no-rj"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src="https://yt3.googleusercontent.com/gsNDSfvzKpZT0OEjTBFH5PxokZ7WeZQU5PcsMWD8vJyBI6ts4uUDic_KsipnVbIUhtToblLaig=s900-c-k-c0x00ffffff-no-rj"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src="https://yt3.googleusercontent.com/27a9C8CL0rcNXGJ5UbsDJLMFOl0PIgc-5JEk65z9I2ZygKe-MUtw-Lwi5TD5q1UDLz3AqCyKUg=s900-c-k-c0x00ffffff-no-rj"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src="https://yt3.googleusercontent.com/paBTeoyDdKqHGtVyAo4xT1bceZza4uCEUVMS0ehH4-ditjIR6I5mvNtQ7InBH3-g6KhiahFL8Q=s900-c-k-c0x00ffffff-no-rj"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src="https://yt3.googleusercontent.com/gtQSx9jIZk45taCqDMEIGxVaNDLRZnEkMnAbHx0K5PSXWQyFGGBdEjQ7FMYJ2y7WeHC5EKFbng4=s176-c-k-c0x00ffffff-no-rj"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src="https://yt3.googleusercontent.com/ezG7fZAoI4puqxZvEHRY0Xfwl6CcR3bWRadwh-lg_-JSuBw9aK6hpJuR5wIlu1WHhsvseAWzfyA=s900-c-k-c0x00ffffff-no-rj"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <a
                href="#"
                className="inline-block rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-center font-medium text-white hover:bg-indigo-700"
              >
                분석 시작하기
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="bg-white py-24 sm:py-32">
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto max-w-2xl lg:mx-0">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">이슈 토픽</h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          지금 이슈가 되는 기사들을 분석해보세요.
        </p>
      </div>
      <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        {posts.map((post) => (
          <article key={post.id} className="flex max-w-xl flex-col items-start justify-between">
            <div className="flex items-center gap-x-4 text-xs">
              <time dateTime={post.datetime} className="text-gray-500">
                {post.date}
              </time>
              <a
                href={post.category.href}
                className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
              >
                {post.category.title}
              </a>
            </div>
            <div className="group relative">
              <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                <a href={post.href}>
                  <span className="absolute inset-0" />
                  {post.title}
                </a>
              </h3>
              <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{post.description}</p>
            </div>
            <div className="relative mt-8 flex items-center gap-x-4">
              <img src={post.author.imageUrl} alt="" className="h-10 w-10 rounded-full bg-gray-50" />
              <div className="text-sm leading-6">
                <p className="font-semibold text-gray-900">
                  <a href={post.author.href}>
                    <span className="absolute inset-0" />
                    {post.author.name}
                  </a>
                </p>
                <p className="text-gray-600">{post.author.role}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  </div>
  </div>
  )
}
