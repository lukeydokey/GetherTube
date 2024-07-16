import { TitleCard, LabelInput, FullButton } from "@/components";
import Link from "next/link";

const AssignCard = () => {
  return (
    <TitleCard title="Sign Up">
      <div className="flex flex-col gap-4">
        <LabelInput label="E-Mail" />
        <LabelInput label="Password" />
        <LabelInput label="Confirm Password" />
        <FullButton className="mt-2" type="primary">
          Sign Up
        </FullButton>
        <span className="text-xs-normal text-content-white">
          Already signed up?{" "}
          <Link href="/login" className="text-primary cursor-pointer">
            Log In
          </Link>
        </span>
      </div>
    </TitleCard>
  );
};

export default AssignCard;
