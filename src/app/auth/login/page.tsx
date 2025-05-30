import LoginForm from "@/components/client/LoginForm";
import Footer from "@/components/Footer";
import ReturnToHome from "@/components/ReturnToHome";

export const metadata = {
  title: "Login",
  description: "Login page",
};

export default function Login() {
  return (
    <>
      <main className="w-full h-dvh">
        <div className="w-full h-full flex sm:p-0 p-5">
          <nav className="lg:px-5 px-1.5 d-navbar fixed">
            <ReturnToHome />
          </nav>
          <div className="sm:flex-1/2 w-0">
            <div className="w-full h-full login-form-image shadow"></div>
          </div>
          <div className="sm:flex-1/2 flex flex-col justify-center items-center w-full">
            <LoginForm></LoginForm>
          </div>
        </div>
      </main>
      <Footer className="lg:px-20 md:px-15 sm:px-10 px-5"></Footer>
    </>
  );
}
