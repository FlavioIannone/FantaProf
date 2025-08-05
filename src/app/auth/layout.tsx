import Footer from "@/components/server/Footer";
import ReturnToHome from "@/components/server/BackToPathArrow";
import AuthImage from "./components/AuthImage";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="w-full h-dvh">
        <div className="w-full h-full flex sm:flex-row sm:w-auto flex-col justify-center sm:p-0 p-5">
          {/**Image */}
          <div className="sm:flex-1/2 flex-1/6 sm:h-auto h-10 sm:p-5 motion-safe:opacity-0 animate-fade-in">
            <nav className="d-navbar absolute z-30">
              <ReturnToHome textColor="text-primary-content" />
            </nav>
            <AuthImage />
          </div>
          <div className="sm:flex-1/2 flex-2/3 flex flex-col justify-center items-center w-full">
            {children}
          </div>
        </div>
      </main>
      <Footer className="lg:px-20 md:px-15 sm:px-10 px-5"></Footer>
    </>
  );
}
