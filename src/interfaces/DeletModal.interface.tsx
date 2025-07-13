import { FacilitieRow } from "./Facilities.interface";
import { RoomProps } from "./Rooms.interface";

export interface DeletModelProps {

open:boolean;
onClose:()=>void;
currentData:RoomProps | FacilitieRow
facilitie?:FacilitieRow
message:string;
loading:boolean;
onDelete:(id:string)=>Promise<void>;
}
