import { Link } from "react-router-dom";

export function LoginForm() {
  return (
    <div className="flex flex-col gap-2 justify-end">
      <form className="flex flex-col gap-4">
        <input className="border-2 p-2" type="text" placeholder="Username" />
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
  );
}
