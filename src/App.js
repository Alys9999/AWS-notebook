import React, { useRef } from 'react';

function App() {
  const formRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
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
          <input type="file" id="fileInput" name="fileInput" required style={{ width: '100%' }} />
        </div>
        <button type="submit" style={{ cursor: 'pointer' }}>Submit</button>
      </form>
    </div>
  );
}

export default App;
