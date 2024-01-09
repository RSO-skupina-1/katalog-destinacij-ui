export class User {
    id: number;
    username: string;
    password: string;
    salt: string;
    visitedLocations: number[];
    admin: boolean;
}