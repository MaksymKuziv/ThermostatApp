export interface Reading {
    id: number;
    temperatureC: number;
    location?: string;
    notes?: string;
    createdAtUtc: string;
}
export interface ReadingCreateDto {
    temperatureC: number;
    location?: string;
    notes?: string;
}