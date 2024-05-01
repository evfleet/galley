export function ResetPasswordForm() {
  return (
    <div className="flex flex-col gap-2 justify-end">
      <form className="flex flex-col gap-4">
        <input className="border-2 p-2" type="text" placeholder="Email" />
        <button className="border-2 p-2 bg-blue-400">Reset Password</button>
      </form>
    </div>
  );
}
