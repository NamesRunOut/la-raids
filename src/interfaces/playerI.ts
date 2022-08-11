import { characterI } from "./characterI";

export interface playerI {
    name: string,
    characters: Array<characterI>
}