import { Metadata, NextPage } from "next";

import { AuthForm } from "@/components/AuthForm";

export const metadata: Metadata = {
  title: "Регистрация",
  icons: {
    icon: "/logo.svg",
  },
};

const Register: NextPage = () => {
  return (
    <main className="container">
      <AuthForm type="register" />
    </main>
  );
};

export default Register;
