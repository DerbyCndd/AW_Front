import { Category } from "./Category";
import { Time } from "./Time";

export interface Professional{ 
    ProfessionalId : number,
    FirstName : string,
    LastName : string,
    EmailAddress : string,
    PhotoUrl : string,
    IdCard : string,
    PhoneNumber :number,
    Category : Category,
    Times : Time[],
}