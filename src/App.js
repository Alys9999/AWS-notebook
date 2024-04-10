import React, { useRef, useState } from 'react';
import axios from 'axios';

function App() {
  const formRef = useRef(null);
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

    const getPresignedUrl = async (fileName, fileType) => {
      try {
        const response = await axios.post('https://1ie9pc397c.execute-api.us-east-1.amazonaws.com/prod/get-presigned-url', {
          fileName: fileName,
          fileType: fileType,
        });
        return response.data.url; 
      } catch (error) {
        throw new Error('Failed to get presigned URL: ' + error.message);
      }
    };

    const uploadFileToS3 = async (presignedUrl, file) => {
      try {
        await axios.put(presignedUrl, file, {
          headers: {
            'Content-Type': file.type,
          },
        });
        alert('File successfully uploaded!');
      } catch (error) {
        throw new Error('Upload failed: ' + error.message);
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!file) {
        alert('Please select a file first.');
        return;
      }

      try {
        const url = await getPresignedUrl(file.name, file.type);
        console.log(url);
        console.log(file.type);
        await uploadFileToS3(url, file);
      } catch (error) {
        console.error(error.message);
        alert(error.message);
      }
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
          <input onChange={handleFileChange} type="file" id="fileInput" name="fileInput" required style={{ width: '100%' }} />
        </div>
        <button type="submit" style={{ cursor: 'pointer' }}>Submit</button>
      </form>
    </div>
  );
}

export default App;
