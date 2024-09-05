export interface TypeCardProps {
  className: string;
  children: React.ReactNode;
}

const Card = ({ className, children }: TypeCardProps) => {
  return (
    <div
      className={`max-w-screen-sm bg-card-back-color rounded-lg p-5 min-w-80 ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
