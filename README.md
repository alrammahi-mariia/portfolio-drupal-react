# Personal Portfolio Website (React + Drupal)

This is a fully decoupled personal portfolio website built with **React 18** and **React Bootstrap** for the front end, while the content is managed and hosted on **Drupal**. The site fetches data from Drupal using its **JSON:API** web service to dynamically display content. This project was developed as a final assignment for the **Drupal course** at **Business College Helsinki**, under the guidance of **[Santosh Kalwar](https://github.com/kalwar)**.

## Table of Contents

1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Screenshots](#screenshots)
4. [Demo](#demo)
5. [Project Structure](#project-structure)
6. [Getting Started](#getting-started)
7. [Usage](#usage)
8. [License](#license)

## Features

- **Fully Decoupled Architecture**: The front end and back end are completely separate, allowing for independent development.
- **Dynamic Content**: Fetches data from the Drupal backend using the JSON:API module, ensuring that content updates are reflected on the site without redeployment.
- **Responsive Design**: Built with Bootstrap 5 to ensure the website is mobile-friendly and adapts to different screen sizes.
- **Modern Front-end Stack**: Utilizes React 18's latest features for an efficient, component-based architecture.

## Technologies Used

- **Frontend**: React 18, React Bootstrap, vanilla Bootstrap 5
- **Backend**: Drupal 11 with JSON:API module enabled
- **Hosting**: To host the site locally, follow the [installation](#installation) instructions provided below.

## Screenshots

![Homepage](/screenshots/image.png)
![Projects](/screenshots/image-1.png)
![SKills-responsive](/screenshots/image-2.png)
![Contact-responsive](/screenshots/image-4.png)

## Demo

View demo walkthrough **[here](https://businesscollege-my.sharepoint.com/:v:/g/personal/s2200113_edu_bc_fi/EXd_xnhXGxlIuNq4XOXSZ6EB4ckarUIgwZYfI52qmrXHNA?nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJTdHJlYW1XZWJBcHAiLCJyZWZlcnJhbFZpZXciOiJTaGFyZURpYWxvZy1MaW5rIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXcifX0%3D&e=kG6ccc)**

## Getting Started

### Prerequisites

Ensure you have the following installed on your system:

- **Node.js** (version 16 or later)
- **npm**
- **Drupal 10 or 11** with the JSON:API module enabled

### Installation

1. **Clone the repository**:

   ```
   git clone https://github.com/alrammahi-mariia/portfolio-drupal-react.git
   cd portfolio-drupal-react
   ```

2. **Install dependencies**:

   ```
   npm install
   ```

3. **Set up the Drupal backend**:

   Make sure you have a running Drupal 10 or 11 site with the JSON:API module enabled and properly configured. You may need to adjust CORS settings and configure permissions for anonymous users to access and edit content.

4. **Configure the API URL**:

   Update the API base URL in the fetch requests to match your Drupal backend's JSON:API endpoint.

5. **Run the development server**:

   ```
   npm run dev
   ```

   The portfolio website should now be running at `http://localhost:5173`.

## Usage

- The front end fetches content from the Drupal backend. You can manage and update the portfolio's content directly from Drupal's admin interface.
- To add new projects or skills, add a new respective content type in Drupal, and the changes will be reflected on the website.
- The contact form allows users to send messages, which are submitted via a POST request and saved in Drupal as a new content item of the "Message" content type.

## License

This project is licensed under the MIT License.
