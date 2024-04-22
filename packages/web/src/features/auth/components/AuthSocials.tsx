import { ReactElement } from "react";

type AuthSocialsProps = {
  children: ReactElement | ReactElement[];
  text: string;
};

export function AuthSocials({ children, text }: AuthSocialsProps) {
  return (
    <div className="flex flex-col gap-2 justify-center items-center">
      <p className="text-sm">{text}</p>

      <div className="flex flex-col gap-4">{children}</div>
    </div>
  );
}
