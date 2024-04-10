import React, { useRef, useState } from 'react';
import axios from 'axios';

function App() {
  const formRef = useRef(null);
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
        alert('Please select a file first.');
        return;
    }
s
    try {
        const presignResponse = await axios.post('https://1ie9pc397c.execute-api.us-east-1.amazonaws.com/prod/', {
            fileName: file.name,
            fileType: file.type,
        });

        const { url } = presignResponse.data;

        await axios.put(url, file, {
            headers: {
                'Content-Type': file.type,
            },
        });

        alert('File successfully uploaded!');
    } catch (error) {
        console.error('Upload failed:', error);
        alert('Upload failed. Please try again.');
    }
};

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); 
};
  
  
  
  
  
  const centerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    flexDirection: 'column',
  };

  return (
    <div style={centerStyle}>
      <form ref={formRef} onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '400px' }}>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="textInput" style={{ display: 'block', marginBottom: '5px' }}>Text Input:</label>
          <input type="text" id="textInput" name="textInput" required style={{ width: '100%' }} />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="fileInput" style={{ display: 'block', marginBottom: '5px' }}>File Input:</label>
          <input value={file} onChange={handleFileChange} type="file" id="fileInput" name="fileInput" required style={{ width: '100%' }} />
        </div>
        <button type="submit" style={{ cursor: 'pointer' }}>Submit</button>
      </form>
    </div>
  );
}

export default App;
