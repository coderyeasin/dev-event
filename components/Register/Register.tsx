"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FaGoogle } from "react-icons/fa6";

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-teal-900/30">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-teal-900 p-6 rounded-xl shadow"
      >
        <h3 className="text-2xl font-semibold text-center mb-6">
          Create Account
        </h3>

        {/* Name */}
        <input {...register("name")} placeholder="Name" className="input" />
        {errors.name && <p className="error">{errors.name.message}</p>}

        {/* Email */}
        <input
          {...register("email")}
          placeholder="Email"
          className="input mt-3"
        />
        {errors.email && <p className="error">{errors.email.message}</p>}

        {/* Image */}
        <input
          type="file"
          accept="image/*"
          {...register("image")}
          className="mt-3"
        />
        {errors.image && (
          <p className="error">{errors.image.message as string}</p>
        )}

        {/* Password */}
        <input
          type="password"
          {...register("password")}
          placeholder="Password"
          className="input mt-3"
        />
        {errors.password && <p className="error">{errors.password.message}</p>}

        {/* Confirm Password */}
        <input
          type="password"
          {...register("confirmPassword")}
          placeholder="Confirm Password"
          className="input mt-3"
        />
        {errors.confirmPassword && (
          <p className="error">{errors.confirmPassword.message}</p>
        )}

        <button disabled={isSubmitting} className="btn-primary mt-5 w-full">
          {isSubmitting ? "Registering..." : "Register"}
        </button>

        <FaGoogle />
      </form>
    </div>
  );
};

export default RegisterPage;
