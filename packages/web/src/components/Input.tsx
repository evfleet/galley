import { forwardRef, ComponentProps } from "react";

type InputProps = ComponentProps<"input"> & {
  label: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, type = "text", ...props }, ref) => {
    return (
      <div className="border-2 p-2">
        <label htmlFor={props.name}>{label}</label>
        <input id={props.name} type={type} ref={ref} {...props} />
      </div>
    );
  },
);
