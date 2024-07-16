import { Card } from "../index";
import { TypeCardProps } from "../types";

interface TypeTitleCardProps extends TypeCardProps {
  title: string;
}

const TitleCard = ({ title, children }: TypeTitleCardProps) => {
  return (
    <Card>
      <span className="flex-center text-2xl-strong text-content-white">
        {title}
      </span>
      {children}
    </Card>
  );
};

export default TitleCard;
