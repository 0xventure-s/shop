import { tittleFont } from "@/config/font";
import { Loginform } from "./ui/Login-form";

export default function Page() {
  return (
    <main className="flex flex-col min-h-screen pt-32 sm:pt-52">
      <h1 className={`${tittleFont.className} text-4xl mb-5`}>Ingresar</h1>

      <Loginform />
    </main>
  );
}
