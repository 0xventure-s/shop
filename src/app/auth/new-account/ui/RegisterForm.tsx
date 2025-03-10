"use client";

import { login } from "@/actions/auth/login";
import { registerUser } from "@/actions/auth/register";
import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type formInputs = {
  name: string;
  email: string;
  password: string;
};

export const RegisterForm = () => {

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const {register,handleSubmit,formState: { errors }} = useForm<formInputs>();

  const onSubmit: SubmitHandler<formInputs> = async (data) => {
    setError("");
    setLoading(true);
    const { name, email, password } = data;

    // Verificar que los datos no sean nulos
    if (!name || !email || !password) {
      setError("Todos los campos son obligatorios");
      setLoading(false);
      return;
    }

    console.log(data); // Verifica los datos antes de enviarlos
    const resp = await registerUser(name, email, password);

    if (!resp.ok) {
      setError(resp.message || "Error desconocido");
      setLoading(false);
      return;
    }

    await login(email.toLocaleLowerCase(), password);
    window.location.replace("/");
  };



  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      {/* {
            errors.name?.type === "required" && (
                <span className="text-red-500"> El nombre es obligatorio papi</span>
            )

        } */}
      <label htmlFor="email">Nombre</label>
      <input
        className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5", {
          "border-red-500": !!errors.name,
        })}
        type="text"
        {...register("name", { required: true })}
      />
      <span className="text-red-500">{error}</span>

      <label htmlFor="email">Correo electrónico</label>
      <input
        className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5", {
          "border-red-500": !!errors.email,
        })}
        type="email"
        {...register("email", {
          required: true,
          pattern: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
        })}
      />

      <label htmlFor="password">Contraseña</label>
      <input
        className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5", {
          "border-red-500": !!errors.password,
        })}
        type="password"
        {...register("password", { required: true, minLength: 6 })}
      />

      <button className="btn-primary" disabled={loading}>
        {loading ? "Creando usuario" : "Crear mi cuenta"}
      </button>

      {/* divisor l ine */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link href="/auth/login" className="btn-secondary text-center">
        Tengo una cuenta
      </Link>
    </form>
  );
};
