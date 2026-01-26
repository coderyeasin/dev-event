"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaGoogle } from "react-icons/fa6";

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-teal-900/30">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-teal-900 p-6 rounded-xl shadow"
      >
        <h3 className="text-2xl font-semibold text-center mb-6">Login</h3>

        <input {...register("email")} placeholder="Email" className="input" />
        {errors.email && <p className="error">{errors.email.message}</p>}

        <input
          type="password"
          {...register("password")}
          placeholder="Password"
          className="input mt-3"
        />
        {errors.password && <p className="error">{errors.password.message}</p>}

        <button disabled={isSubmitting} className="btn-primary mt-5 w-full">
          {isSubmitting ? "Logging in..." : "Login"}
        </button>

        <FaGoogle />
      </form>
    </div>
  );
};

export default LoginPage;
