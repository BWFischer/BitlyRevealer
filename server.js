const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const port = 5000;

app.use(cors());

app.get("/decode", async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).send("URL parameter is required");
  }

  console.log("Received URL for decoding:", url);

  if (url.includes("block") || url.includes("warn")) {
    return res.json({ originalUrl: url, status: "dangerous", message: "This URL has been deemed dangerous." });
  }

  try {
    const axiosConfig = {
      timeout: 10000,
      maxRedirects: 10,
      validateStatus: (status) => status < 500,
    };

    const response = await axios.head(url, axiosConfig);
    const finalUrl = response.request.res.responseUrl;
    const statusCode = response.status;

    if (finalUrl.includes("block") || finalUrl.includes("warn")) {
      return res.json({ originalUrl: finalUrl, status: "dangerous", message: "DO NOT VISIT! This URL has been deemed dangerous: " });
    }

    let status;
    if (statusCode === 200) {
      status = "green";
    } else if (statusCode === 404) {
      status = "yellow";
    } else if (statusCode === 403) {
      status = "forbidden";
    } else {
      status = "red";
    }

    res.json({ originalUrl: finalUrl, status });
  } catch (error) {
    console.error("Error decoding URL:", error.message);
    if (error.response) {
      console.error("Response status:", error.response.status);
      res.status(error.response.status).send(`Error: ${error.message}`);
    } else if (error.request) {
      console.error("No response received:", error.request);
      res.status(500).send(`Error: No response received from server`);
    } else {
      console.error("Request setup error:", error.message);
      res.status(500).send(`Error: ${error.message}`);
    }
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
