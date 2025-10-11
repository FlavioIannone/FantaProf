import Footer from "@/components/server/Footer";
import Navbar from "@/components/server/Navbar";

export default function PrivacyLayout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return (
    <>
      <Navbar className="lg:px-20 md:px-15 sm:px-10 px-5" showReturnToHome />
      {children}
      <Footer className="lg:px-20 md:px-15 sm:px-10 px-5" />
    </>
  );
}
