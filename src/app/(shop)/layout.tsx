
import { Footer, SideBar } from "@/components";
import TopMenu from "@/components/ui/top-menu/TopMenu";







export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen md:px-5">
      <TopMenu />
      <SideBar  />
      {children}
      <Footer/>
    </main>
  );
}
