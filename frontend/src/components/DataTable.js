import React from 'react';

function DataTable({ data }) {
  return (
    <div className="mx-auto my-5 w-4/5 mt-12">
      <table className="table-auto w-full border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Title</th>
            <th className="px-4 py-2 border">Description</th>
            <th className="px-4 py-2 border">Calculated Field</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item._id} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
              <td className="px-4 py-2 border">{item.title}</td>
              <td className="px-4 py-2 border">{item.description}</td>
              <td className="px-4 py-2 border">{item.calculatedField || 'Processing...'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
