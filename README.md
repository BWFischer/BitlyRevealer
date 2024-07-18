# Bitly Revealer

Bitly Revealer is a simple web application that allows users to decode shortened Bitly URLs and retrieve their original URLs. The application provides a user-friendly interface to input the shortened URL path and get detailed information about the original URL.

## Features

- **Decode Bitly URLs:** Input the last part of a Bitly URL and decode it to find the original URL.
- **Status Indicators:** Displays different status messages based on the URL's validity (e.g., valid, expired, non-existent, dangerous, forbidden).
- **Loading Spinner:** Shows a spinner animation while the URL is being decoded.
- **Error Handling:** Provides clear error messages for various error states, including network issues and server errors.

## Getting Started

### Prerequisites

- **Node.js:** Make sure you have Node.js installed. You can download it from [Node.js](https://nodejs.org/).

### Installation

1. **Clone the repository:**

    ```sh
    git clone https://github.com/your-username/bitly-revealer.git
    ```

2. **Navigate to the project directory:**

    ```sh
    cd bitly-revealer
    ```

3. **Install the dependencies:**

    ```sh
    npm install
    ```

### Running the Application

1. **Start the development server:**

    ```sh
    npm start
    ```

2. **Open your browser and go to** `http://localhost:3000` **to see the application in action.**
3. **Make sure that you are running your node.js server on `http://localhost:5000`**

## Usage

1. Enter the last part of the Bitly URL in the input field (e.g., if the URL is `https://bit.ly/abc123`, enter `abc123`).
2. Click the "Decode URL" button.
3. The application will display the original URL or an appropriate error message.

## Code Structure

- **App Component (App.js):** The main component that sets up the layout of the application.
- **UserForm Component (UserForm.js):** Handles the form submission and decoding logic.
- **Styles (App.css, userform.css):** CSS files for styling the components.
- **Spinner (spinner.svg):** SVG for the loading spinner animation.

## Screenshots

![Screenshot of Bitly Revealer](bitlyRevealer.png)

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- **Formik:** Form handling in React.
- **Yup:** Validation schema for form inputs.
- **Axios:** HTTP client for making requests.

## Contact

If you have any questions or suggestions, feel free to contact me at [barnettfischer03@gmail.com](mailto:barnettfischer03@gmail.com).
