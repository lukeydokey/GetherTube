interface TypeParams {
  id: string;
}

interface TypeRoomIdProps {
  params: TypeParams;
}

const Page = ({ params }: TypeRoomIdProps) => {
  const { id } = params;
  return <>{id}번방</>;
};

export default Page;
