import { auth } from "@/auth.config"
import { redirect } from "next/navigation"
import Image from "next/image"

export default async function ProfilePage() {
  const session = await auth()

  if (!session?.user) {
    redirect("/")
  }

  const { name, email, role, image, id, emailVerified } = session.user

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Perfil</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center space-x-6 mb-4">
            <div className="relative w-20 h-20 rounded-full overflow-hidden">
              {image ? (
                <Image src={image || "/placeholder.svg"} alt={name || ""} layout="fill" objectFit="cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-500 text-2xl font-bold">
                  {name?.charAt(0) || "U"}
                </div>
              )}
            </div>
            <div>
              <h2 className="text-2xl font-semibold">{name}</h2>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mt-2">
                {role}
              </span>
            </div>
          </div>
          <dl className="grid grid-cols-1 gap-4 text-sm">
            <div>
              <dt className="font-medium text-gray-500">Email</dt>
              <dd className="mt-1">{email}</dd>
            </div>
            <div>
              <dt className="font-medium text-gray-500">Email Verificado</dt>
              <dd className="mt-1">{emailVerified ? "Sí" : "No"}</dd>
            </div>
            <div>
              <dt className="font-medium text-gray-500">ID</dt>
              <dd className="mt-1 truncate">{id}</dd>
            </div>
          </dl>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Actividad Reciente</h3>
          <p className="text-sm text-gray-500">No hay actividad reciente para mostrar.</p>
        </div>
      </div>
    </div>
  )
}

