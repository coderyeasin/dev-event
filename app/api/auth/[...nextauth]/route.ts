import connectToDatabase from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    // DB Connection
    await connectToDatabase();
    const body = await req.json();
    const { name, email, password, confirmPassword, image } = body;

    // Here, you would typically add logic to save the user to your database.
    // For demonstration purposes, we'll just return the received data.

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
