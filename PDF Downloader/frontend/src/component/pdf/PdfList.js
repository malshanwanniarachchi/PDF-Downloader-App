import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./style.css";
import NavBar from '../navBar/NavBar';
import Swal from 'sweetalert2';

const PdfList = () => {
  const [pdfs, setPdfs] = useState([]);
  const [message, setMessage] = useState('');

  const removePdf = async (pdfId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("User not authenticated. Redirecting to login page.");
        return;
      }

      const isConfirmed = await Swal.fire({
        title: 'Are you sure?',
        text: 'You want to delete this PDF?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      });

      if (isConfirmed.isConfirmed) {
        const finalURL = `http://localhost:8000/api/pdf/${pdfId}`;
        await axios.delete(finalURL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        Swal.fire(
          'Deleted!',
          'The PDF has been deleted.',
          'success'
        ).then(() => {
          // Reload the page to reflect changes
          window.location.reload(false);
        });
      }
    } catch (error) {
      console.log("Error deleting pdf:", error);
      Swal.fire(
        'Error!',
        'Failed to delete the PDF.',
        'error'
      );
    }
  };

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
      <NavBar />
      <div id="pdfListContainer"> 
        <h2 className="pageTitle"><b>Uploaded PDF List</b></h2>
        {message && <p id="errorMessage">{message}</p>} 
        <ul id="pdfList">
          {pdfs.map((pdf, index) => (
            <li key={pdf._id} className="pdfItem">
              <div className="pdfInfo">
                <a href={`http://localhost:8000/api/pdf/${pdf._id}`} target="_blank" rel="noopener noreferrer">
                  {index + 1}. {pdf.Name} 
                </a> 
              </div>
              <div>
                <button className="deleteButton" onClick={() => removePdf(pdf._id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PdfList;
