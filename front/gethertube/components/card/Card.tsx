export interface TypeCardProps {
  children: React.ReactNode;
}

const Card = ({ children }: TypeCardProps) => {
  return (
    <div className="max-w-screen-sm bg-card-back-color rounded-lg p-5 min-w-80">
      {children}
    </div>
  );
};

export default Card;
