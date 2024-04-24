import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { registerSchema, Register } from "@galley/common";
import { Input } from "@/components/Input";

export function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Register>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = handleSubmit((data) => {
    console.log("data", data);
  });

  console.log("errors", errors);

  return (
    <div className="flex flex-col gap-2 justify-end">
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <Input label="Email" {...register("email")} />
        <Input label="Password" type="password" {...register("password")} />

        <button className="border-2 p-2 bg-blue-400">Register</button>
      </form>
    </div>
  );
}
