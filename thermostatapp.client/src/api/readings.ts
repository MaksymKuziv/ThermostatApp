import axios from 'axios';

import type { Reading, ReadingCreateDto } from '../types/reading';

const API_BASE = 'https://localhost:7232/api/readings';

export async function getReadings(take: number = 20): Promise<Reading[]> {
    const response = await axios.get<Reading[]>(`${API_BASE}?take=${take}`);
    return response.data;
}

export async function createReading(dto: ReadingCreateDto): Promise<Reading> {
    const response = await axios.post<Reading>(API_BASE, dto);
    return response.data;
}