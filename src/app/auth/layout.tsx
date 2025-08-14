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
      <main className="size-full">
        <div className="size-full flex md:flex-row md:w-auto flex-col justify-center md:gap-2.5 p-5">
          {/**Image */}
          <div className="md:flex-1/2 flex-1/6 md:h-auto h-10 motion-safe:opacity-0 animate-fade-in">
            <nav className="d-navbar absolute z-30">
              <ReturnToHome textColor="text-primary-content" />
            </nav>
            <AuthImage />
          </div>
          <div className="md:flex-1/2 flex-2/3 flex flex-col justify-center items-center w-full">
            {children}
          </div>
        </div>
      </main>
      <Footer className="lg:px-20 md:px-15 sm:px-10 px-5"></Footer>
    </>
  );
}
