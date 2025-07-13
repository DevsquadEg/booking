export interface AddsProps {
  _id: string;
  isActive: boolean;
  room?: {
    _id: string;
    roomNumber?: string;
    price?: number;
    capacity?: number;
    discount?: number;
    facilities?: string[]; // Array of facility IDs
    createdBy?: string; // User ID
    images?: string[]; // Image URLs
    createdAt: string; // ISO date
    updatedAt: string; // ISO date
  };
  createdBy?: {
    _id: string;
    userName: string;
  } | string;
  createdAt: string; // ISO date
  updatedAt: string; // ISO date
}





export interface RoomRow {
  _id: string;
  roomNumber?: string;
  roomId?:string;
  price?: number;
  capacity?: number;
  discount?: number;
  facilities?:string[];
  isActive?:boolean;
  images?:string;
   createdBy?: {
    _id: string;
    userName: string;
  } | string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}


 export interface RoomDetailsProps {
  open: boolean;
  onClose: () => void;
  room: RoomRow | null;
}


 export interface CreateNewAddProps {
  open: boolean;
  onClose: () => void;
  title: string | null;
  handleCreateNewAdd:(data:CreateAddProps)=>Promise<void>;
  handleUpdateCurrentAdd:(data:CreateAddProps,addId:string)=>Promise<void>;
  error:string | null;
  selectedAdd:RoomRow
}







export  interface AddsRoom {
roomNumber:string;
_id:string;
}


export interface CreateAddProps {
    room: string,
    discount: number,
    isActive: string 
}






