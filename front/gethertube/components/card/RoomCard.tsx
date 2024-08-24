import { TypeUserRooms } from "@/api/types";

interface RoomCardProps {
  room: TypeUserRooms;
}

const RoomCard = ({ room }: RoomCardProps) => {
  const { roomId, roomMembers } = room;
  return (
    <div className="w-full h-20 rounded-md bg-slate-600">
      room: {roomId} roomMember: {roomMembers.map((d) => d.nickName).join(",")}
    </div>
  );
};

export default RoomCard;
