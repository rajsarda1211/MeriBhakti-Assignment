import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import DataTable from '../components/DataTable';
import GenerateDataModal from '../components/GenerateDataModal';
import { fetchData, generateData } from '../services/apiService';

const ENDPOINT = 'https://meribhakti-backend.onrender.com' || 'http://localhost:5000';

const socket = io(ENDPOINT);  

function HomePage() {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const fetchedData = await fetchData();
      setData(fetchedData);
    };
    
    
    loadData();

    socket.on('dataUpdated', (updatedData) => {
      setData((prevData) =>
        prevData.map((item) => (item._id === updatedData._id ? updatedData : item))
      );
    });

    return () => {
      socket.off('dataUpdated');
    };
  }, []);

  const handleGenerateData = async (formData) => {
    try {
      const newData = await generateData(formData);
      setData((prev) => [...prev, newData]);
    } catch (error) {
      throw error;  
    }
  };

  return (
    <div className="relative p-8">
      <button
        className="absolute top-0 right-0 mt-4 mr-4 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => setIsModalOpen(true)}
      >
        Generate Data
      </button>

      <GenerateDataModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleGenerateData}
      />

      <DataTable data={data} />
    </div>
  );
}

export default HomePage;
