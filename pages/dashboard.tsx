import { Button } from "@chakra-ui/react";
import type { NextPage } from "next";
import { getSession, signOut } from "next-auth/react";
import { Logo } from "../components/common/logo/logo";

const Home: NextPage = () => {
  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <Logo />
          <span className="ml-3 text-xl">Bug Tracker</span>
        </a>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center"></nav>
        <Button
          type="submit"
          _hover={{ bg: "#3b82f6" }}
          backgroundColor="#2563eb"
          textColor="#fff"
          colorScheme="blue"
          spinnerPlacement="start"
          onClick={() => signOut({ callbackUrl: "/login" })}
        >
          Log out
        </Button>
      </div>
    </header>
  );
};

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default Home;
