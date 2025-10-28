import { useEffect, useState } from 'react';
import { getReadings } from '../api/readings';
import type { Reading } from '../types/reading';

export default function ReadingList() {
    const [readings, setReadings] = useState<Reading[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Load readings from API
    const loadReadings = async () => {
        try {
            setLoading(true);
            const data = await getReadings(20);
            console.log('Fetched readings:', data);
            setReadings(data);
        } catch (err) {
            console.error('Error loading readings:', err);
            setError('Failed to load readings.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadReadings();
    }, []);

    return (
        <div className="max-w-2xl mx-auto mt-6">
            <h2 className="text-xl font-semibold mb-4">Latest Readings</h2>

            {loading && <p>Loading...</p>}
            {error && <p className="text-red-600">{error}</p>}

            {!loading && readings.length === 0 && !error && (
                <p className="text-gray-500">No readings found.</p>
            )}

            <ul className="space-y-3">
                {readings.map(r => (
                    <li key={r.id} className="border rounded p-3 shadow-sm bg-white">
                        <div className="text-lg font-medium">
                            {r.temperatureC.toFixed(1)}°C
                        </div>
                        {r.location && (
                            <div className="text-sm text-gray-600"> {r.location}</div>
                        )}
                        {r.notes && (
                            <div className="text-sm text-gray-700 mt-1">{r.notes}</div>
                        )}
                        <div className="text-xs text-gray-400 mt-1">
                            {new Date(r.createdAtUtc).toLocaleString()}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
