import { SignUpForm } from "@/components/auth/signup-form"
import Link from "next/link"

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4">
      <div className="w-full max-w-md space-y-4">
        <SignUpForm />
        <p className="text-center text-sm text-slate-400">
          Already have an account?{" "}
          <Link href="/signin" className="text-cyan-400 hover:text-cyan-300 underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
