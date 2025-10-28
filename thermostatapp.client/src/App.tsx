import ReadingForm from './components/ReadingForm';
import ReadingList from './components/ReadingList';
import { useState } from 'react';
import './index.css';


function App() {
    const [reloadFlag, setReloadFlag] = useState(false);

    const triggerReload = () => setReloadFlag(prev => !prev);

    return (
        <div className="bg-gray-100 p-6 thermostat-wrap">
            <h1 className="text-2xl font-bold text-center text-blue-700 mb-6">Thermostat Readings</h1>
            <ReadingForm onCreated={triggerReload} />
            <ReadingList key={reloadFlag.toString()} />
        </div>
    );
}

export default App;