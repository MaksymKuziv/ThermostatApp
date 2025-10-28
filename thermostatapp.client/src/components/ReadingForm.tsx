import { useState } from 'react';
import { createReading } from '../api/readings';
import type { ReadingCreateDto } from '../types/reading';

export default function ReadingForm({ onCreated }: { onCreated?: () => void }) {
    // Form state
    const [form, setForm] = useState<ReadingCreateDto>({
        temperatureC: 0,
        location: '',
        notes: ''
    });

    // UI states
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: name === 'temperatureC' ? parseFloat(value) : value
        }));
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            await createReading(form);
            setSuccess(true);
            setForm({ temperatureC: 0, location: '', notes: '' });
            onCreated?.(); // trigger reload in parent
        } catch {
            setError('Failed to save reading. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-4 bg-white shadow rounded">
            <div>
                <label className="block font-medium">Temperature (℃)</label>
                <input
                    type="number"
                    name="temperatureC"
                    value={form.temperatureC}
                    onChange={handleChange}
                    required
                    className="w-full border px-3 py-2 rounded"
                />
            </div>

            <div>
                <label className="block font-medium">Location</label>
                <input
                    type="text"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded"
                />
            </div>

            <div>
                <label className="block font-medium">Notes</label>
                <textarea
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                    rows={3}
                    className="w-full border px-3 py-2 rounded"
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
                {loading ? 'Saving...' : 'Save'}
            </button>

            {success && <p className="text-green-600 mt-2">Reading saved successfully.</p>}
            {error && <p className="text-red-600 mt-2">{error}</p>}
        </form>
    );
}
