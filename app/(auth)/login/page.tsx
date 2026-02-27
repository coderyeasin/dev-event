import dynamic from "next/dynamic";
import React, { Suspense } from "react";

const Login = dynamic(() => import("@/components/Login/Login"), { ssr: true });

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Login />
    </Suspense>
  );
}
