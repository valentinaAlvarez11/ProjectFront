"use client";

import { useRouter } from 'next/navigation';
import useLoginForm from "@/hooks/useLoginForm";
import FormField from "./FormField";
import PasswordField from "./PasswordField";
import SocialButton from "./SocialButton";
import Button from "../atoms/ButtonAuth";
import TextLink from "../atoms/TextLink";
import Separator from "../atoms/Separator";

export default function LoginComponent() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    submit,
    serverError,
    successMessage,
  } = useLoginForm({
    onSuccess: () => {
      router.push('/');
    },
  });

  const onSubmit = handleSubmit(submit);

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <FormField
        label="Email"
        register={register("email")}
        error={errors.email}
        type="email"
        id="email"
        placeholder="mail@example.com"
      />
      
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm font-medium text-white">
            Password
          </label>
          <TextLink href="/forgot-password" className="text-sm text-white hover:text-[#b6a253]">
            Forgot your password?
          </TextLink>
      </div>
        <PasswordField
          label=""
          register={register("password")}
          error={errors.password}
          id="password"
          placeholder="Password"
        />
      </div>

      {serverError && (
        <p className="text-sm text-red-400 text-center">{serverError}</p>
      )}

      {successMessage && (
        <p className="text-sm text-green-400 text-center">{successMessage}</p>
      )}

      <Button
        type="submit"
        variant="light"
        className="mt-4"
      >
        Login
      </Button>

      <Separator />

      <SocialButton />
    </form>
  );
}