import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { RegisterSchema } from "@/lib/validators/register.schema";
import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/models/User.model";
import { v2 as cloudinary } from "cloudinary";

export async function POST(req: Request) {
  try {
    // Accept multipart/form-data
    const contentType = req.headers.get("content-type") || "";
    if (!contentType.includes("multipart/form-data")) {
      return NextResponse.json(
        { error: "Content-Type must be multipart/form-data" },
        { status: 400 },
      );
    }

    const formData = await req.formData();
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");
    const profileImg = formData.get("profileImg");

    // Validate using Zod
    const data = RegisterSchema.parse({
      name,
      email,
      password,
      confirmPassword,
      profileImg: profileImg,
    });

    await connectToDatabase();

    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email already in use" },
        { status: 400 },
      );
    }

    // Upload image to Cloudinary
    let imageUrl = undefined;
    if (profileImg && typeof profileImg !== "string") {
      const arrayBuffer = await profileImg.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              resource_type: "image",
              folder: "dev-event/users",
            },
            (error, result) => {
              if (error) return reject(error);
              resolve(result);
            },
          )
          .end(buffer);
      });
      imageUrl = (uploadResult as { secure_url: string }).secure_url;
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await User.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      profileImg: imageUrl,
    });

    return NextResponse.json(
      {
        id: user._id,
        name: user.name,
        email: user.email,
        profileImg: user.profileImg,
      },
      { status: 201 },
    );
  } catch (error: any) {
    if (error.name === "ZodError") {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 },
    );
  }
}
