import Footer from "@/components/Footer";
import ReturnToHome from "@/components/ReturnToHome";
import Image from "next/image";

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
          <div className="sm:flex-1/2 w-0 sm:p-5 motion-safe:opacity-0 animate-fade-in">
            <nav className="d-navbar absolute">
              <ReturnToHome />
            </nav>
            <Image
              src="/auth_images/background_fucsia.webp"
              alt="Login image"
              width={2823}
              height={5006}
              className="shadow rounded-xl w-full h-full object-cover object-top-left"
            />
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
