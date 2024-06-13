import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./style.css"
import NavBar from '../navBar/NavBar';

const PdfList = () => {
  const [pdfs, setPdfs] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchPdfs = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/pdf');
        setPdfs(response.data.pdf);
      } catch (error) {
        setMessage('Failed to fetch PDFs');
      }
    };

    fetchPdfs();
  }, []);

  return (
    <div>
      <NavBar/>
    <div id="pdfListContainer"> 
      <h2>PDF List</h2>
      {message && <p id="errorMessage">{message}</p>} 
      <ul id="pdfList">
        {pdfs.map((pdf) => (
          <li key={pdf._id}>
            <a href={`http://localhost:8000/api/pdf/${pdf._id}`} target="_blank" rel="noopener noreferrer">
              {pdf.Name}
            </a>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default PdfList;
