export function RegisterForm() {
  return (
    <div className="flex flex-col gap-2 justify-end">
      <form className="flex flex-col gap-4">
        <input className="border-2 p-2" type="text" placeholder="Username" />
        <input
          className="border-2 p-2"
          type="password"
          placeholder="Password"
        />
        <button className="border-2 p-2 bg-blue-400">Register</button>
      </form>
    </div>
  );
}
