import Footer from "@/components/Footer";
import ReturnToHome from "@/components/ReturnToHome";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="w-full h-dvh">
        <div className="w-full h-full flex sm:p-0 p-5">
          {/**Image */}
          <div className="sm:flex-1/2 w-0 sm:p-5 opacity-0 animate-fade-in">
            <nav className="d-navbar absolute">
              <ReturnToHome />
            </nav>
            <div className="w-full h-full login-form-image shadow rounded-xl"></div>
          </div>
          <div className="sm:flex-1/2 flex flex-col justify-center items-center w-full">
            {children}
          </div>
        </div>
      </main>
      <Footer className="lg:px-20 md:px-15 sm:px-10 px-5"></Footer>
    </>
  );
}
