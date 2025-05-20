import React, { useState } from 'react';
import AssetForm from './AssetForm'; // adjust path if needed

function AdminPanel() {
  const [showAssetForm, setShowAssetForm] = useState(false);

  const handleToggle = () => {
    setShowAssetForm(prev => !prev);
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <div style={{ paddingBottom: '60px' }}>
        {showAssetForm ? (
          <AssetForm />
        ) : (
          <iframe
            src="http://localhost:3001/admin"
            style={{ width: '100%', height: '90vh', border: 'none' }}
            title="Admin Panel"
          />
        )}
      </div>

      {/* Button at the bottom */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
          backgroundColor: '#f8f9fa',
          borderTop: '1px solid #ddd',
          padding: '10px',
          textAlign: 'center',
        }}
      >
        <button
          onClick={handleToggle}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
          }}
        >
          {showAssetForm ? 'Back to Admin Panel' : 'Add Asset'}
        </button>
      </div>
    </div>
  );
}

export default AdminPanel;
