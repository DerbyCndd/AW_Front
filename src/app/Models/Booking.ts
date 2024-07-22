import { BookingService } from "./BookingService";
import { User } from "./User";

export interface Booking{
    BookingId : number,
    Price : number,
    Status : string,
    ActivationDate : string,
    User : User,
    UserId : number,
    Services : BookingService[],
  
}
