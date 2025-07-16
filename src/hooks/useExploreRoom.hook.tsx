import { RoomContext } from "@/store/RoomsContext/Rooms.context";
import { useContext } from "react";

export default function useExploreRooms() {
  return useContext(RoomContext)!;
}
