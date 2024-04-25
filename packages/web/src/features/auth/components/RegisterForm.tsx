import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { registerSchema, Register } from "@galley/common";
import { Input } from "@/components/Input";
import { useRegister } from "../api/register";

export function RegisterForm() {
  const { mutate } = useRegister();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Register>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = handleSubmit((data) => {
    mutate(data);
  });

  return (
    <div className="flex flex-col gap-2 justify-end">
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <Input label="Email" error={errors["email"]} {...register("email")} />
        <Input
          label="Password"
          type="password"
          error={errors["password"]}
          {...register("password")}
        />

        <button className="border-2 p-2 bg-blue-400">Register</button>
      </form>
    </div>
  );
}
