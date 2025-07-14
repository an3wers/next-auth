import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoginForm } from "./LoginForm";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  return (
    <div className='flex flex-col items-center justify-center p-6 min-h-screen'>
      <Card className='w-full max-w-md'>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <CardFooter>
          <p className='text-center text-sm w-full'>
            Don&apos;t have an account?{" "}
            <Link className={cn("hover:underline")} href='/auth/register'>
              Sign Up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
