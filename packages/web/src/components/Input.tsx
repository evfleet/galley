import { forwardRef, ComponentProps } from "react";
import { FieldError } from "react-hook-form";

type InputProps = ComponentProps<"input"> & {
  label: string;
  error?: FieldError;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, type = "text", error, ...props }, ref) => {
    return (
      <div className="border-2 p-2">
        <label htmlFor={props.name}>{label}</label>
        <input id={props.name} type={type} ref={ref} {...props} />
        {error?.message}
      </div>
    );
  },
);
