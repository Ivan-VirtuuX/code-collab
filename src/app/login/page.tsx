import { Metadata, NextPage } from "next";
import { AuthForm } from "@/components/AuthForm";

export const metadata: Metadata = {
  title: "Авторизация",
  icons: {
    icon: "/logo.svg",
  },
};

const Register: NextPage = () => {
  return (
    <main className="container">
      <AuthForm type="login" />
    </main>
  );
};

export default Register;
