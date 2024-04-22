import { ReactElement } from "react";

type AuthFooterProps = {
  children?: never;
  text: string;
  link: ReactElement;
};

export function AuthFooter({ text, link }: AuthFooterProps) {
  return (
    <div className="flex flex-col justify-end">
      <span className="text-center text-sm">
        {text} {link}
      </span>
    </div>
  );
}
