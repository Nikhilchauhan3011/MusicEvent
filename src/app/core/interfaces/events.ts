import { TicketType } from "./ticketTypes";

export interface Event{

    id: number;
    name: string;
    time: string;
    endTime: string;
    language: string;
    genre: string;
    image: string;
    ticketTypes: TicketType[];
    capacity: number;
    location: string;
    description: string;
}
