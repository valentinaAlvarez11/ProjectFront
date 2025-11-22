"use client";

import { FcGoogle } from "react-icons/fc";
import Button from "../atoms/ButtonAuth";

export default function SocialButton() {
  return (
    <Button type="button" variant="github" className="w-full flex items-center justify-center gap-2" disabled>
      <FcGoogle size={20} />
      Login with Google
    </Button>
  );
}

