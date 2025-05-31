import LoginForm from "@/components/client/LoginForm";
import RegistrationForm from "@/components/client/RegistrationForm";
import Footer from "@/components/Footer";
import ReturnToHome from "@/components/ReturnToHome";

export const metadata = {
  title: "Signin",
  description: "Signin page",
};

export default function Signin() {
  return (
    <>
      <main className="w-full h-dvh">
        <div className="w-full h-full flex sm:p-0 p-5">
          <div className="sm:flex-1/2 w-0 p-5">
            <nav className="lg:px-5 px-1.5 d-navbar fixed">
              <ReturnToHome />
            </nav>
            <div className="w-full h-full login-form-image shadow rounded-xl"></div>
          </div>
          <div className="sm:flex-1/2 flex flex-col justify-center items-center w-full">
            <RegistrationForm></RegistrationForm>
          </div>
        </div>
      </main>
      <Footer className="lg:px-20 md:px-15 sm:px-10 px-5"></Footer>
    </>
  );
}
