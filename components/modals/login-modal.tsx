import Link from "next/link";
import { UserAuthForm } from "../user-auth-form";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { useAuth } from "@/hooks/use-auth";

export default function LoginModal() {
  const auth = useAuth();
  return (
    <Dialog open={auth.isOpen} onOpenChange={auth.onClose}>
      <DialogContent className="p-10">
        <div className="mx-auto flex h-full w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Log into the Portal
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your credentials below to log in
            </p>
          </div>
          <UserAuthForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            Our{" "}
            <Link
              href="https://moneyview.in/terms-and-conditions"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="https://moneyview.in/privacy-policy-loans"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
