import connectToDatabase from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    // DB Connection
    await connectToDatabase();
    const body = await req.json();
    const { name, email, password, confirmPassword, image } = body;

    return new Response(
      JSON.stringify({
        message: "User registered successfully",
        user: { name, email },
      }),
      { status: 201 },
    );
  } catch (error) {
    console.error("Error registering user:", error);
    return new Response(
      JSON.stringify({
        message: "Internal Server Error",
      }),
      { status: 500 },
    );
  }
}
