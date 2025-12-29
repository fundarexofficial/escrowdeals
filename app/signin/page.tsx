import { SignInForm } from "@/components/auth/signin-form"
import Link from "next/link"

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4">
      <div className="w-full max-w-md space-y-4">
        <SignInForm />
        <p className="text-center text-sm text-slate-400">
          Don't have an account?{" "}
          <Link href="/signup" className="text-cyan-400 hover:text-cyan-300 underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
