"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FaFacebook, FaGoogle } from "react-icons/fa6";
import Link from "next/link";

const registerSchema = z
  .object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email"),
    image: z.any().refine((file) => file?.length === 1, "Image is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("image", data.image[0]);

    console.log("Register Data:", data);
    // 👉 send formData to API
  };
  const commonCls = "mt-3 w-full border-0 outline-0 bg-teal-500/30";
  return (
    <div className="min-h-screen flex items-start justify-center pt-20">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-teal-900 p-6 rounded-xl shadow"
      >
        <h3 className="text-2xl font-semibold text-center mb-6">
          Create an Account
        </h3>

        {/* Name */}
        <input {...register("name")} placeholder="Name" className={commonCls} />
        {errors.name && <p className="error">{errors.name.message}</p>}

        {/* Email */}
        <input
          {...register("email")}
          placeholder="Email"
          className={commonCls}
        />
        {errors.email && <p className="error">{errors.email.message}</p>}

        {/* Image */}
        <input
          type="file"
          accept="image/*"
          {...register("image")}
          className={commonCls}
        />
        {errors.image && (
          <p className="error">{errors.image.message as string}</p>
        )}

        {/* Password */}
        <input
          type="password"
          {...register("password")}
          placeholder="Password"
          className={commonCls}
        />
        {errors.password && <p className="error">{errors.password.message}</p>}

        {/* Confirm Password */}
        <input
          type="password"
          {...register("confirmPassword")}
          placeholder="Confirm Password"
          className={commonCls}
        />
        {errors.confirmPassword && (
          <p className="error">{errors.confirmPassword.message}</p>
        )}

        <button
          disabled={isSubmitting}
          className="mt-5 w-full bg-teal-950 py-2 rounded-md cursor-pointer"
        >
          {isSubmitting ? "Registering..." : "Register"}
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
            className="mt-4 w-full cursor-pointer bg-red-600 py-2 rounded-md flex items-center justify-center gap-2"
          >
            <FaFacebook />
            Facebook
          </button>
        </div>
        <Link href="/login" className="mt-4 text-center text-sm block">
          Already have an account?{" "}
          <span className="text-teal-300 font-semibold">Login</span>
        </Link>
      </form>
    </div>
  );
};

export default RegisterPage;
