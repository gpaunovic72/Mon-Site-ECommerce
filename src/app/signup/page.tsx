"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { SignupFormData, SignupFormSchema } from "./schemas/schemas";

export default function Signup() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignupFormData>({
    resolver: zodResolver(SignupFormSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      console.log("Form submitted:", data);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      alert("Inscription réussie!");
      reset();
      router.push("/login");
    } catch (error) {
      console.error("Erreur :", error);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div
        className="
        bg-white
        p-6
        rounded-lg
        shadow-md
        w-full
        max-w-md"
      >
        <h1 className="text-2xl font-bold text-center mb-6">Inscription</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Nom
            </label>
            <input
              id="name"
              type="text"
              {...register("name")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-[#F85F00] focus:border-[#F85F00]"
              placeholder="Entrez votre nom"
              autoComplete="family_name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="firstname"
              className="block text-sm font-medium text-gray-700"
            >
              Prénom
            </label>
            <input
              id="firstname"
              type="text"
              {...register("firstname")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-[#F85F00] focus:border-[#F85F00]"
              placeholder="Entrez votre prénom"
              autoComplete="given_name"
            />
            {errors.firstname && (
              <p className="text-red-500 text-sm mt-1">
                {errors.firstname.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="text"
              {...register("email")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-[#F85F00] focus:border-[#F85F00]"
              placeholder="Entrez votre email"
              autoComplete="email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              {...register("password")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-[#F85F00] focus:border-[#F85F00]"
              placeholder="Entrez votre mot de passe"
              autoComplete="new_password"
            />
            {errors.password?.message && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password?.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="confirmpassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirmer votre mot de passe
            </label>
            <input
              id="confirmpassword"
              type="password"
              {...register("confirmPassword")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-[#F85F00] focus:border-[#F85F00]"
              placeholder="Confirmez votre mot de passe"
              autoComplete="new_password"
            />
            {errors.confirmPassword?.message && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword?.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="cursor-pointer w-full bg-[#F85F00] text-white font-bold text-xl py-2 px-4 rounded-md hover:bg-[#e04e00] focus:outline-none focus:ring-2 focus:ring-[#F85F00] focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Inscription en cours..." : "Inscription"}
          </button>
        </form>
      </div>
    </div>
  );
}
