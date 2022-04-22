import type { NextPage } from "next";
import Image from "next/image";
import LoginForm from "../components/auth/login-form/login-form";

const LoginPage: NextPage = () => {
  return (
    <section className="relative flex flex-wrap lg:h-screen lg:items-center">
      <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
        <div className="max-w-lg mx-auto">
          <h1 className="text-2xl font-bold text-center text-blue-600 sm:text-3xl">
            Bug Tracker
          </h1>
          <p className="max-w-md mx-auto mt-4 text-center text-gray-500">
            Record, report, and monitor the bugs in a software development
            project
          </p>
          <LoginForm />
        </div>
      </div>

      <div className="relative w-full h-64 sm:h-96 lg:w-1/2 lg:h-full">
        <Image
          alt="Mountains"
          src="https://images.unsplash.com/photo-1512273222628-4daea6e55abb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
          layout="fill"
          objectFit="cover"
        />
      </div>
    </section>
  );
};

export default LoginPage;
