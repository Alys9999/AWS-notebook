import React, { useRef, useState } from 'react';
import axios from 'axios';

function App() {
  const formRef = useRef(null);
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleTextChane = (e) =>{
    setText(e.target.value);
  }

    const getPresignedUrl = async (fileName, fileType) => {
      try {
        const response = await axios.post('https://1ie9pc397c.execute-api.us-east-1.amazonaws.com/prod/get-presigned-url', {
          fileName: fileName,
          fileType: fileType,
        },{headers:{'Content-Type': 'application/json',}});
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
        console.log(error);
        throw new Error('Upload failed: ' + error);
      }
    };

    const sendDataToDynamoDB = async (fileName, text) => {
      try {
        console.log('sending data to dynamodb')
        await axios.post('https://1ie9pc397c.execute-api.us-east-1.amazonaws.com/prod/data', {
          fileName,
          inputText: text,
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        alert('Data successfully saved to DynamoDB!');
      } catch (error) {
        console.error('Failed to save data to DynamoDB:', error);
        throw new Error('Failed to save data to DynamoDB: ' + error.message);
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
        await uploadFileToS3(url, file);
        await sendDataToDynamoDB(file.name, text);
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
          <input value={text} onChange={handleTextChane} type="text" id="textInput" name="textInput" required style={{ width: '100%' }} />
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
