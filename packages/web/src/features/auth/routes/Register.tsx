import { Link } from "react-router-dom";

import { AuthLayout } from "@/components/AuthLayout";
import { AuthFormLayout } from "../components/AuthFormLayout";
import { AuthHeader } from "../components/AuthHeader";
import { AuthFooter } from "../components/AuthFooter";
import { RegisterForm } from "../components/RegisterForm";

export function RegisterPage() {
  return (
    <AuthLayout>
      <AuthFormLayout
        header={<AuthHeader text="Register" />}
        form={<RegisterForm />}
        footer={
          <AuthFooter
            text="Have an account already?"
            link={
              <Link className="text-blue-500" to="/auth/login">
                Sign in
              </Link>
            }
          />
        }
      />

      <h1>Register</h1>
    </AuthLayout>
  );
}
