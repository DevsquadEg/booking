

export interface RoomFacility {
  _id: string;
  name: string;
}

export interface RoomCreatedBy {
  _id: string;
  userName: string;
}

export interface RoomExplore {
  _id: string;
  roomNumber: string;
  price: number;
  capacity: number;
  discount: number;
  facilities: RoomFacility[];
  createdBy: RoomCreatedBy;
  images: string[]; // Array of image URLs (can be empty)
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}





export interface RoomContextType {
    setStartDate:(sDate:string)=>void;
    setEndDate:(eDate:string)=>void;
    setCapacity:(c:number)=>void;
  startDate: string | null;
  endDate: string | null;
  capacity: number | null;
  isLoading:boolean;
  getAllExploreRooms: () => Promise<void>;
  exploreErrorMessage: string | null;
  exploreRoomsList:RoomExplore[] | null ;
  setExploreErrorMessage:(m:string | null)=>void;
}