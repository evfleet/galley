import { Link } from "react-router-dom";

import { AuthLayout } from "../components/AuthLayout";
import { AuthFormLayout } from "../components/AuthFormLayout";
import { AuthHeader } from "../components/AuthHeader";
import { AuthFooter } from "../components/AuthFooter";
import { AuthSocials } from "../components/AuthSocials";
import { LoginForm } from "../components/LoginForm";

export function LoginPage() {
  return (
    <AuthLayout>
      <AuthFormLayout
        header={<AuthHeader text="Login" />}
        form={<LoginForm />}
        social={
          <AuthSocials text="Or sign in with">
            <button className="border-2 p-2">Sign in with Google</button>
            <button className="border-2 p-2">Sign in with Facebook</button>
          </AuthSocials>
        }
        footer={
          <AuthFooter
            text="Don't have an account?"
            link={
              <Link className="text-blue-500" to="/auth/register">
                Sign up
              </Link>
            }
          />
        }
      />
    </AuthLayout>
  );
}
