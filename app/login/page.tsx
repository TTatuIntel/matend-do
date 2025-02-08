"use client";

import { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { usePatient } from "@/context/patient-context";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const { setPatientName } = usePatient();

  useEffect(() => {
    if (session?.user?.name) {
      setPatientName(session.user.name);
      router.push("/");
    }
  }, [session, router, setPatientName]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-6 shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
            Health Vitals Tracker
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to monitor your health vitals
          </p>
        </div>
        <div className="mt-8">
          <Button
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="w-full"
          >
            <svg
              className="mr-2 h-4 w-4"
              aria-hidden="true"
              focusable="false"
              data-prefix="fab"
              data-icon="google"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 488 512"
            >
              <path
                fill="currentColor"
                d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
              ></path>
            </svg>
            Sign in with Google
          </Button>
        </div>
      </div>
    </div>
  );
}
