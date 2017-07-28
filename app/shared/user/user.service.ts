import { Injectable } from "@angular/core";
import { User } from "./user";

@Injectable()
export class UserService {
    register(user: User): void{
        alert(`About to register: ${user.email}`);
    }
}