import { tittleFont } from "@/config/font";
import { RegisterForm } from "./ui/RegisterForm";

export default function Page() {
  return (
    <main className="flex flex-col min-h-screen pt-32 sm:pt-52">
      <h1 className={`${tittleFont.className} text-4xl mb-5`}>Crear Cuenta</h1>
      <RegisterForm />
    </main>
  );
}
