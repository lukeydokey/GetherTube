export interface TypeCardProps {
  children: React.ReactNode;
}

const Card = ({ children }: TypeCardProps) => {
  return (
    <div className="w-2/6 bg-card-back-color rounded-lg p-5">{children}</div>
  );
};

export default Card;
