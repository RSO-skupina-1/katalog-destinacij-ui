import { inflateRaw } from "zlib";

export class Destinacija {
    id: number;
    title: string;
    description: string;
    longitude: number;
    latitude: number;
    price: number;
    location: string;
    accessibility: string;
    infrastructure: string;
}