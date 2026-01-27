"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaFacebook, FaGoogle } from "react-icons/fa6";
import Link from "next/link";

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    console.log("Login Data:", data);
    // 👉 call login API
  };
  const commonCls = "mt-3 w-full border-0 outline-0 bg-teal-500/30";
  return (
    <div className=" min-h-screen flex items-start justify-center pt-20 ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-md bg-teal-900 p-6 rounded-xl shadow"
      >
        <h3 className="text-2xl font-semibold text-center mb-6">Login</h3>

        <input
          {...register("email")}
          placeholder="Email"
          className={commonCls}
        />
        {errors.email && <p className="error">{errors.email.message}</p>}

        <input
          type="password"
          {...register("password")}
          placeholder="Password"
          className={commonCls}
        />
        {errors.password && <p className="error">{errors.password.message}</p>}

        <button
          disabled={isSubmitting}
          className="mt-5 w-full cursor-pointer bg-teal-950 py-2 rounded-md"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>

        <p className="mt-4 text-center text-2xl font-bold">OR</p>

        <div className="flex flex-col lg:flex-row items-center gap-5">
          <button
            type="button"
            className="mt-4 w-full cursor-pointer bg-red-600 py-2 rounded-md flex items-center justify-center gap-2"
          >
            <FaGoogle />
            Google
          </button>
          <button
            type="button"
            className=" mt-4 w-full cursor-pointer bg-red-600 py-2 rounded-md flex items-center justify-center gap-2"
          >
            <FaFacebook />
            Facebook
          </button>
        </div>
        <Link href="/register" className="mt-4 text-center text-sm block">
          Don't have an account?{" "}
          <span className="text-teal-300 font-semibold">Register</span>
        </Link>
      </form>
    </div>
  );
};

export default LoginPage;
