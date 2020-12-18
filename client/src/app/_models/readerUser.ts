import { History } from "./history";

export interface readerUser {
    id: string;
    username: string;
    intrests: string[];
    history: History[];
    photoUrl: string;
  }
