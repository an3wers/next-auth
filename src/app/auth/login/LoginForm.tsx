"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { loginAction } from "@/server-actions/auth-forms";
import { Label } from "@radix-ui/react-label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, null);

  const router = useRouter();

  useEffect(() => {
    if (state?.success) { 
      router.push("/")
    }

  }, [state?.success, router])

  return (
    <form action={formAction}>
      <div className='flex flex-col gap-6'>
        <div className='grid gap-2'>
          <Label htmlFor='email'>Email</Label>
          <Input id='email' name='email' type='email' placeholder='m@example.com' required disabled={isPending} />
          {state?.errors?.email && <p className='text-sm text-red-500'>{state?.errors?.email}</p>}
        </div>
        <div className='grid gap-2'>
          <div className='flex items-center'>
            <Label htmlFor='password'>Password</Label>
            <Link
              href='#'
              className={cn(
                "ml-auto inline-block text-sm underline-offset-4 hover:underline"
              )}
            >
              Forgot your password?
            </Link>
          </div>
          <Input id='password' name='password' type='password' required disabled={isPending} />
          {state?.errors?.password && <p className='text-sm text-red-500'>{state?.errors?.password}</p>}
        </div>
        <div className='flex items-center'>
          <Button type='submit' className='w-full' disabled={isPending}>
            Login
          </Button>
        </div>
        {state?.success && <p className='text-sm'>Login successful</p>}
      </div>
    </form>
  );
}
