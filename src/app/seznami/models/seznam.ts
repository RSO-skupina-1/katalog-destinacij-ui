import { Artikel } from './artikel';

export class NakupovalniSeznam {
    id: number;
    naziv: string;
    opis: string;
    ustvarjen: string;
    artikli: Artikel[];
}
