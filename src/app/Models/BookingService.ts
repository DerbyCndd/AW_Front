import { Time } from "@angular/common";
import { Professional } from "./Professional";
import { Service } from "./Service";

export interface BookingService{
    Service : Service,
    Professional : Professional,
    Time : Time,
    Date : string,
}