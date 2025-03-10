


import TittlePage from "@/components/ui/top-menu/tittle/Tittle";
import { AdressForm } from "./ui/AdressForm";
import { getCountries } from "@/actions/country/get-countries";
import { auth } from "@/auth.config";
import { redirect } from "next/navigation";
import { getUserAddress } from "@/actions/address/get-user-address";


export default async function DirecciónPage() {


  const countries = await getCountries()
  const session = await auth()

  if(!session?.user) {
    redirect("/auth/login")
  }

  const userAddress = await getUserAddress(session!.user.id) ?? undefined

  return (
    <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0">
      <div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">
        <TittlePage tittle="Dirección" subtitle="Dirección de entrega" />

        <AdressForm countries={countries} userStoredAddress={userAddress}/>
        
      </div>
    </div>
  );
}
