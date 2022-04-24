import Image from "next/image";

export const TopMenu = (props: any) => (
  <div>
    <div className="container flex items-center justify-between h-16 px-10">
      <div className="flex items-center flex-1">
        <nav className="text-gray-500 font-bold text-xs space-x-4 flex">
          <a className="text-blue-700 border-current cursor-pointer block h-16 leading-[4rem] border-b-4 border-transparent hover:text-blue-700 hover:border-current align-middle">
            <svg
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-5 w-5 mb-1 inline-flex"
            >
              <path d="M 20 2 L 4 2 C 2.894531 2 2 2.894531 2 4 L 2 20 C 2 21.105469 2.894531 22 4 22 L 20 22 C 21.105469 22 22 21.105469 22 20 L 22 4 C 22 2.894531 21.105469 2 20 2 Z M 11 18 C 11 18.550781 10.550781 19 10 19 L 5 19 C 4.445313 19 4 18.550781 4 18 L 4 5 C 4 4.449219 4.445313 4 5 4 L 10 4 C 10.550781 4 11 4.449219 11 5 Z M 20 11.996094 C 20 12.550781 19.550781 13 18.996094 13 L 14.003906 13 C 13.449219 13 13 12.550781 13 11.996094 L 13 5.003906 C 13 4.449219 13.449219 4 14.003906 4 L 18.996094 4 C 19.550781 4 20 4.449219 20 5.003906 Z" />
            </svg>
            <span className="mx-1 text-base font-semibold">By Severity</span>
          </a>
          <a className="cursor-pointer block h-16 leading-[4rem] border-b-4 border-transparent hover:text-blue-700 hover:border-current align-middle">
            <svg
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-5 w-5 mb-1 inline-flex"
            >
              <path d="M 20 2 L 4 2 C 2.894531 2 2 2.894531 2 4 L 2 20 C 2 21.105469 2.894531 22 4 22 L 20 22 C 21.105469 22 22 21.105469 22 20 L 22 4 C 22 2.894531 21.105469 2 20 2 Z M 11 18 C 11 18.550781 10.550781 19 10 19 L 5 19 C 4.445313 19 4 18.550781 4 18 L 4 5 C 4 4.449219 4.445313 4 5 4 L 10 4 C 10.550781 4 11 4.449219 11 5 Z M 20 11.996094 C 20 12.550781 19.550781 13 18.996094 13 L 14.003906 13 C 13.449219 13 13 12.550781 13 11.996094 L 13 5.003906 C 13 4.449219 13.449219 4 14.003906 4 L 18.996094 4 C 19.550781 4 20 4.449219 20 5.003906 Z" />
            </svg>
            <span className="mx-1 text-base font-semibold">By Assignee</span>
          </a>
          <a className="cursor-pointer block h-16 leading-[4rem] border-b-4 border-transparent hover:text-blue-700 hover:border-current align-middle">
            <svg
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-5 w-5 mb-1 inline-flex"
            >
              <path d="M 20 2 L 4 2 C 2.894531 2 2 2.894531 2 4 L 2 20 C 2 21.105469 2.894531 22 4 22 L 20 22 C 21.105469 22 22 21.105469 22 20 L 22 4 C 22 2.894531 21.105469 2 20 2 Z M 11 18 C 11 18.550781 10.550781 19 10 19 L 5 19 C 4.445313 19 4 18.550781 4 18 L 4 5 C 4 4.449219 4.445313 4 5 4 L 10 4 C 10.550781 4 11 4.449219 11 5 Z M 20 11.996094 C 20 12.550781 19.550781 13 18.996094 13 L 14.003906 13 C 13.449219 13 13 12.550781 13 11.996094 L 13 5.003906 C 13 4.449219 13.449219 4 14.003906 4 L 18.996094 4 C 19.550781 4 20 4.449219 20 5.003906 Z" />
            </svg>
            <span className="mx-1 text-base font-semibold">My Tasks</span>
          </a>
          <a className="cursor-pointer block h-16 leading-[4rem] border-b-4 border-transparent hover:text-blue-700 hover:border-current align-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mb-1 inline-flex"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"
              />
            </svg>
            <span className="mx-1 text-base font-semibold">Due Tasks</span>
          </a>
        </nav>
      </div>
      <div className="flex items-center justify-end flex-1">
        <button className="flex rounded-md bg-blue-600 py-2 pl-2 pr-3 text-white font-semibold items-center hover:bg-blue-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          <span>Submit Bug</span>
        </button>
      </div>
    </div>

    <div className="border-t border-gray-300"></div>
  </div>
);
