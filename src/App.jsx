import { useEffect, useRef, useState } from "react";
import { uploadFile } from "./Services/api";
import { ClockLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import { Copy } from 'lucide-react';
import "react-toastify/dist/ReactToastify.css";
import "./App.css"; // Importing the CSS file

function App() {
  const fileInputRef = useRef();
  const [file, setFile] = useState("");
  const [result, setResult] = useState("");
  const [loader, setLoader] = useState(false);

  const success = () => toast.success("Link Converted Successfully!");
  const fail = () => toast.error("Link Failed!");

  const onUpload = () => {
    fileInputRef.current.click();
  };

  const copyURL=()=>{
      if (result) {
        navigator.clipboard.writeText(result)
          .then(() => toast.success("Link copied to clipboard!"))
          .catch(() => toast.error("Failed to copy link!"));
      }
    };
    // document.execCommand("Copy");
  

  useEffect(() => {
    try {
      const getImage = async () => {
        setLoader(true);
        if (file) {
          const data = new FormData();
          data.append("filename", file.name);
          data.append("file", file);
          let response = await uploadFile(data);
          setResult(response.path);
          success();
        }
        setLoader(false);        
      };
      getImage();
    } catch (err) {
      console.error(err.message);
      setLoader(true);
      fail();
    }
  }, [file]);

  return (
    <div className="app-container">
      <h1>Upload Your File</h1>
      <h2>Choose a file</h2>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button className="upload-button" onClick={onUpload}>
        {loader === true ? (
          <ClockLoader color="white" size={30} className="clock-loader" />
        ) : (
          <p>Upload</p>
        )}
      </button>
           
      {result && (
        <div className="result-container">
        <a
          href={result}
          target="_blank"
          rel="noopener noreferrer"
          className="result-link"
        >
          {result}
        </a>
        <button className="copy-btn" onClick={copyURL} disabled={!result}>
          <Copy />
        </button>
      </div>
      
      )}

      <ToastContainer
        position="bottom-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition:Bounce
      />
    </div>
  );
}

export default App;
