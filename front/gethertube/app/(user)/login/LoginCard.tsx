import { TitleCard, LabelInput, FullButton } from "@/components";
import Link from "next/link";

const LoginCard = () => {
  return (
    <TitleCard title="Log In">
      <div className="flex flex-col gap-4">
        <LabelInput label="E-Mail" />
        <LabelInput label="Password" />
        <FullButton className="mt-2" type="primary">
          Log In
        </FullButton>
        <span className="text-xs-normal text-content-white">
          Not signed up?{" "}
          <Link href="/assign" className="text-primary cursor-pointer">
            Sign Up
          </Link>
        </span>
      </div>
    </TitleCard>
  );
};

export default LoginCard;
