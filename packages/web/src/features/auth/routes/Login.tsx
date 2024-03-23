export function LoginPage() {
  return (
    <div className="flex flex-col min-w-screen min-h-screen gap-4 p-8">
      <h1 className="text-4xl font-bold text-center">Login</h1>

      <form className="flex flex-col gap-4 flex-1 justify-end">
        <input className="border-2 p-2" type="text" placeholder="Username" />
        <input
          className="border-2 p-2"
          type="password"
          placeholder="Password"
        />
        <button className="border-2 p-2 bg-blue-400">Login</button>
      </form>

      <div className="flex flex-col gap-2 items-center">
        <p>Or sign in with</p>

        <div className="flex flex-col gap-2">
          <button className="border-2 p-2">Sign in with Google</button>
          <button className="border-2 p-2">Sign in with Facebook</button>
        </div>
      </div>

      <span className="text-center">
        Don't have an account? <a href="#">Sign up</a>
      </span>
    </div>
  );
}
