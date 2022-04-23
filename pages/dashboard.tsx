import type { NextPage } from "next";
import { getSession } from "next-auth/react";
import { Sidebar } from "../components/dashboard/sidebar/sidebar";

const Home: NextPage = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-grow"></div>
    </div>
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
