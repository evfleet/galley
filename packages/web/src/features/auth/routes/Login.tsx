import { Link } from "react-router-dom";

import { AuthLayout } from "@/components/AuthLayout";

export function LoginPage() {
  return (
    <AuthLayout>
      <div className="grid grid-rows-[5fr_35fr_20fr_1fr] min-w-screen h-screen gap-4 p-8">
        <h1 className="text-4xl font-bold text-center">Login</h1>

        <div className="flex flex-col gap-2 justify-end">
          <form className="flex flex-col gap-4">
            <input
              className="border-2 p-2"
              type="text"
              placeholder="Username"
            />
            <input
              className="border-2 p-2"
              type="password"
              placeholder="Password"
            />
            <button className="border-2 p-2 bg-blue-400">Login</button>
          </form>

          <span className="text-right text-sm text-blue-500">
            <Link to="/auth/forgot-password">Forgot password?</Link>
          </span>
        </div>

        <div className="flex flex-col gap-2 justify-center items-center">
          <p className="text-sm">Or sign in with</p>

          <div className="flex flex-col gap-4">
            <button className="border-2 p-2">Sign in with Google</button>
            <button className="border-2 p-2">Sign in with Facebook</button>
          </div>
        </div>

        <div className="flex flex-col justify-end">
          <span className="text-center text-sm">
            Don't have an account?{" "}
            <Link className="text-blue-500" to="/auth/register">
              Sign up
            </Link>
          </span>
        </div>
      </div>
    </AuthLayout>
  );
}
