import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./userform.css";
import { ReactComponent as SpinnerIcon } from "./spinner.svg";

const UserForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [decodedUrl, setDecodedUrl] = useState("");
  const [originalBitly, setOriginalBitly] = useState("");
  const [status, setStatus] = useState("");

  const validationSchema = Yup.object().shape({
    path: Yup.string().required("The rest of the Bitly path is required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setIsLoading(true);
    setIsSubmitted(true);
    setResult("");
    setError("");
    setDecodedUrl("");
    setOriginalBitly(values.path);

    try {
      const bitlyUrl = `https://www.bit.ly/${values.path}`;
      console.log("Testing URL:", bitlyUrl);

      const response = await axios.get(`http://localhost:5000/decode?url=${encodeURIComponent(bitlyUrl)}`);
      console.log("Response:", response);

      const { originalUrl, status: responseStatus, message } = response.data;

      setStatus(responseStatus);

      if (responseStatus === "green") {
        console.log("Original URL (green):", originalUrl);
        setResult(originalUrl);
      } else if (responseStatus === "red") {
        console.log("Original URL (red):", originalUrl);
        setError(`This is an expired URL: ${originalUrl}`);
        setDecodedUrl(originalUrl);
      } else if (responseStatus === "yellow") {
        console.log("Original URL (yellow):", originalUrl);
        setError(`This URL does not exist: ${originalUrl}`);
        setDecodedUrl(originalUrl);
      } else if (responseStatus === "dangerous") {
        console.log("Dangerous URL:", originalUrl);
        setError(message);
        setDecodedUrl(originalUrl);
      } else if (responseStatus === "forbidden") {
        console.log("Forbidden URL:", originalUrl);
        setError("Access to this URL is forbidden.");
        setDecodedUrl(originalUrl);
      } else {
        console.log("Unexpected status:", responseStatus);
        setError(`Unexpected status for URL: ${originalUrl}`);
        setDecodedUrl(originalUrl);
      }

      resetForm();
    } catch (error) {
      console.log("Error:", error.message);
      let errorMessage = error.message;
      if (error.message === "Request failed with status code 500") {
        errorMessage = "Internal server error";
      } else if (error.message.includes("Network Error")) {
        errorMessage = "Network error, please try again later";
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
      setIsSubmitted(false);
      setSubmitting(false);
    }
  };

  return (
    <Formik initialValues={{ path: "" }} validationSchema={validationSchema} onSubmit={handleSubmit}>
      {({ isSubmitting }) => (
        <Form className="user-form">
          <div className="form-group">
            <label htmlFor="path">https://www.bit.ly/</label>
            <Field type="text" name="path" id="path" placeholder="Enter the Last Part!" />
            <ErrorMessage name="path" component="div" className="error" />
          </div>

          {!isLoading && !isSubmitted && (
            <button type="submit" disabled={isSubmitting} className="submit-btn">
              Decode URL
            </button>
          )}

          {isLoading && (
            <div className="spinner-container">
              <SpinnerIcon className="spinner" />
              <span className="status-message">Decoding...</span>
            </div>
          )}

          {result && (
            <div className={`result ${status === "green" ? "result-green" : "result-red"}`}>
              <span className="result-label spanTextColor">The original URL for your bit.ly ({originalBitly}) is: </span>
              <span className="result-link">
                <a href={result} target="_blank" rel="noopener noreferrer" className="result-link">
                  {result}
                </a>
              </span>
            </div>
          )}

          {error && (
            <div className="error">
              <span className="error-message">{error}</span>
              {decodedUrl && (
                <span className="decoded-url">
                  <a href={decodedUrl} target="_blank" rel="noopener noreferrer" className="result-link">
                    {decodedUrl}
                  </a>
                </span>
              )}
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default UserForm;
