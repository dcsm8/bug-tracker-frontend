import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { Alert, AlertIcon, Button } from "@chakra-ui/react";
import { authenticate } from "../../../services/auth";
import { ShowIf } from "../../common/show-if/show-if";
import { LoginDto, TokenResponse } from "./types";

function LoginForm() {
  const { register, handleSubmit } = useForm<LoginDto>();

  const { isError, isLoading, mutate } = useMutation(authenticate, {
    onSuccess: (data: TokenResponse) => {
      // TODO: SAVE TOKEN and change route
      console.log(data.accessToken);
    },
  });

  const onSubmit = async (data: LoginDto) => {
    mutate(data);
  };

  return (
    <form
      className="p-8 mt-6 mb-0 space-y-4 rounded-lg shadow-2xl"
      onSubmit={handleSubmit(onSubmit)}
    >
      <p className="text-lg font-medium">Log in to your account</p>
      <ShowIf condition={isError}>
        <Alert status="error">
          <AlertIcon />
          There was a problem with your login.
        </Alert>
      </ShowIf>

      <div>
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <div className="relative mt-1">
          <input
            type="email"
            id="email"
            className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
            placeholder="Enter email"
            {...register("username", { required: true })}
          />
          <span className="absolute inset-y-0 inline-flex items-center right-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              />
            </svg>
          </span>
        </div>
      </div>
      <div>
        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>
        <div className="relative mt-1">
          <input
            type="password"
            id="password"
            className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
            placeholder="Enter password"
            {...register("password", { required: true })}
          />
          <span className="absolute inset-y-0 inline-flex items-center right-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </span>
        </div>
      </div>
      <Button
        type="submit"
        _hover={{ bg: "#3b82f6" }}
        backgroundColor="#2563eb"
        textColor="#fff"
        isFullWidth
        isLoading={isLoading}
        colorScheme="blue"
        spinnerPlacement="start"
      >
        Log in
      </Button>
      <p className="text-sm text-center text-gray-500">
        No account?
        <a className="ml-2 underline">Sign up</a>
      </p>
    </form>
  );
}

export default LoginForm;
