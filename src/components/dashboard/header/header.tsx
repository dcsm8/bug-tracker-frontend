import { Avatar, AvatarGroup, Button } from "@chakra-ui/react";
import { Logo } from "../../common/logo/logo";

export const Header = (props: any) => (
  <div className="container p-10 flex justify-between">
    <div>
      <p className="text-base font-semibold mb-1">Workspace</p>
      <h1 className="text-4xl font-bold">Finance Mobile App</h1>
    </div>
    <div className="flex">
      <div className="mr-10">
        <p className="text-base font-semibold mb-1">Visibility</p>
        <a className="flex items-center mt-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-2xl font-bold">Private Board</span>
        </a>
      </div>
      <div className="">
        <p className="text-base font-semibold mb-1">Team</p>
        <div className="flex items-center">
          <AvatarGroup size="md" max={3} marginRight="3">
            <Avatar name="Ryan Florence" src="https://bit.ly/ryan-florence" />
            <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />
            <Avatar name="Kent Dodds" src="https://bit.ly/kent-c-dodds" />
            <Avatar
              name="Prosper Otemuyiwa"
              src="https://bit.ly/prosper-baba"
            />
            <Avatar name="Christian Nwamba" src="https://bit.ly/code-beast" />
          </AvatarGroup>
          <button className="flex rounded-full bg-blue-200 py-1 pl-2 pr-3 text-blue-600 font-semibold items-center hover:bg-blue-100">
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
            <span>Invite</span>
          </button>
        </div>
      </div>
    </div>
  </div>
);
