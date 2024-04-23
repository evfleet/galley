import { Link } from "react-router-dom";

import { AuthLayout } from "../components/AuthLayout";
import { AuthFormLayout } from "../components/AuthFormLayout";
import { AuthHeader } from "../components/AuthHeader";
import { AuthFooter } from "../components/AuthFooter";
import { ResetPasswordForm } from "../components/ResetPasswordForm";

export function ResetPasswordPage() {
  return (
    <AuthLayout>
      <AuthFormLayout
        header={<AuthHeader text="Reset Password" />}
        form={<ResetPasswordForm />}
        footer={
          <AuthFooter
            text="Return to"
            link={
              <Link className="text-blue-500" to="/auth/login">
                Sign in
              </Link>
            }
          />
        }
      />

      <p>Reset</p>
    </AuthLayout>
  );
}
