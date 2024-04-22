import { ReactElement } from "react";

type AuthFormLayoutProps = {
  children?: never;
  header: ReactElement;
  footer: ReactElement;
  form: ReactElement;
  social?: ReactElement;
};

export function AuthFormLayout({
  header,
  footer,
  form,
  social,
}: AuthFormLayoutProps) {
  return (
    <div className="grid grid-rows-[5fr_35fr_20fr_1fr] min-w-screen h-screen gap-4 p-8">
      {header}
      {form}
      {social}
      <div className="row-start-4">{footer}</div>
    </div>
  );
}
