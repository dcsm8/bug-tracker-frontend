import type { NextPage } from "next";
import { Box, Center, Flex, Spacer, Square, Container } from "@chakra-ui/react";
import Image from "next/image";
import AuthForm from "../modules/auth/LoginForm";
import styles from "../styles/Home.module.css";

const Login: NextPage = () => {
  return (
    <section className="text-gray-600 body-font">
      <div className="h-screen container mx-auto flex flex-wrap items-center justify-center">
        <AuthForm />
      </div>
    </section>
  );
};

export default Login;
