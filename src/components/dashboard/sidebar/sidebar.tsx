import Image from "next/image";

export const Sidebar = (props: any) => (
  <div className="relative bg-[#f5f5f5] dark:bg-gray-800 inset-y-0 z-10 flex flex-col flex-shrink-0 w-80 max-h-screen overflow-hidden">
    <div className="flex flex-col sm:flex-row sm:justify-around">
      <div className="w-72 h-screen">
        <div className="w-full">
          <div className="mt-5 relative">
            <button
              type="button"
              className="relative w-full bg-[#f5f5f5] rounded-md mb-4 text-left cursor-default"
            >
              <span className="flex items-center">
                <Image
                  src="https://mir-s3-cdn-cf.behance.net/user/115/7a4f24821534633.6241090577275.png"
                  alt="person"
                  className="flex-shrink-0 rounded-md"
                  width={50}
                  height={50}
                />
                <div className="flex-col">
                  <span className="ml-3 block text-[#3a3a3a] font-bold text-lg">
                    Keitoto Studio
                  </span>
                  <p className="ml-3 text-[#3a3a3a] font-normal text-sm">
                    Workspace
                  </p>
                </div>
              </span>
              <span className="ml-3 absolute inset-y-0 right-0 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-[#3a3a3a]"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </span>
            </button>
          </div>

          <div className="mt-2 relative flex items-center w-full h-full group">
            <div className="absolute z-50 flex items-center justify-center w-auto h-12 p-4 pr-2 text-sm text-gray-500 uppercase cursor-pointer sm:hidden">
              <svg
                fill="none"
                className="relative w-5 h-5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <svg
              className="absolute left-0 z-20 hidden w-4 h-4 ml-4 text-gray-500 pointer-events-none fill-current group-hover:text-gray-400 sm:block"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"></path>
            </svg>
            <input
              type="text"
              className="block w-full py-2 pl-11 pr-4 leading-normal rounded-lg focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 ring-opacity-90 bg-white dark:bg-gray-800 text-gray-800 aa-input"
              placeholder="Quick find"
            />
          </div>
        </div>

        <nav className="my-5">
          <a
            className="text-gray-700 hover:text-white hover:bg-blue-500  flex items-center p-2 my-1 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200 dark:text-gray-400 rounded-lg "
            href="#"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clipRule="evenodd"
              />
            </svg>
            <span className="mx-4 text-base font-semibold">Activity</span>
            <span className="flex-grow text-right"></span>
          </a>
          <a
            className="text-gray-700 hover:text-white hover:bg-blue-500 flex items-center p-2 my-1 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200 dark:text-gray-400 rounded-lg "
            href="#"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                clipRule="evenodd"
              />
            </svg>
            <span className="mx-4 text-base font-semibold">All Updates</span>
            <span className="flex-grow text-right">
              <button
                type="button"
                className="w-7 h-6 text-sm  rounded-md text-white bg-[#e94f2d] font-bold"
              >
                <span className="p-1">7</span>
              </button>
            </span>
          </a>
          <a
            className="text-gray-700 hover:text-white hover:bg-blue-500  flex items-center p-2 my-1 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200   dark:text-gray-400 rounded-lg "
            href="#"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                clipRule="evenodd"
              />
            </svg>
            <span className="mx-4 text-base font-semibold">Settings</span>
            <span className="flex-grow text-right"></span>
          </a>
        </nav>

        <div className="border-t border-gray-300"></div>

        <nav>
          <div className="text-gray-400 flex items-center p-2 my-1 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200   dark:text-gray-400 rounded-lg ">
            <span className="mx-4 text-base font-semibold">Workspace</span>
            <span className="flex-grow text-right">
              <button
                type="button"
                className="w-6 h-6 text-base rounded-md text-white bg-gray-300 font-bold hover:bg-gray-200"
              >
                <span className="text-gray-500">+</span>
              </button>
            </span>
          </div>

          <a
            className="text-gray-700 hover:text-white hover:bg-blue-500  flex items-center p-2 my-1 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200   dark:text-gray-400 rounded-lg "
            href="#"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
            </svg>
            <span className="mx-4 text-base font-semibold">Daily Todos</span>
            <span className="flex-grow text-right"></span>
          </a>
          <a
            className="text-gray-700 hover:text-white hover:bg-blue-500  flex items-center p-2 my-1 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200   dark:text-gray-400 rounded-lg "
            href="#"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
            </svg>
            <span className="mx-4 text-base font-semibold">
              Finance Mobile App
            </span>
            <span className="flex-grow text-right"></span>
          </a>
          <a
            className="text-gray-700 hover:text-white hover:bg-blue-500  flex items-center p-2 my-1 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200 dark:text-gray-400 rounded-lg "
            href="#"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
            </svg>
            <span className="mx-4 text-base font-semibold">Agency Website</span>
            <span className="flex-grow text-right"></span>
          </a>
        </nav>
      </div>
    </div>
  </div>
);
