<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->

<a name="readme-top"></a>

<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/Aryanpatel335/StockMatch">
    <img src="images/logo.png" alt="Logo" width="" height="80">
  </a>

<h3 align="center">StockMatch</h3>

  <p align="center">
    StockMatch is an app that offers tailored stock recommendations based on user preferences, simplifying the search for ideal investment opportunities.
    <br />
    <a href="https://github.com/Aryanpatel335/StockMatch"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://stockmatch.netlify.app/">View Demo</a>
    ·
    <a href="https://github.com/Aryanpatel335/StockMatch/issues">Report Bug</a>
    ·
    <a href="https://github.com/Aryanpatel335/StockMatch/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#demo-video">Demo Video</a></li>
        <li><a href="#demo-images">Demo Images</a></li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installations-and-setups">Installations and Setups</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

StockMatch is a project aimed at investors who prefer a straightforward and interactive approach to stock management and discovery. It's built to streamline the process of creating a personalized watchlist with an easy-to-use interface that responds to the user's investment preferences.

Utilizing real-time financial data from Finnhub and yFinance, StockMatch keeps users informed with the latest stock updates. The robust backend, built on Java Spring and supported by a Postgres database, ensures efficient data management.

The React-based frontend provides a clean and intuitive user experience, while Python and Go microservices fetch financial data, aiding users in their stock selection journey.

StockMatch is a tool for anyone interested in a hands-on approach to learning and enhancing their investment knowledge.

For a closer look at the project, visit: [StockMatch](https://stockmatch.netlify.app/)

#### Key Features:

- **Custom Investment Criteria**: Users can set parameters to align with their investment goals.
- **Personalized Stock Recommendations**: Our system analyzes market data to suggest stocks that match user preferences.
- **Real-Time Data**: Live stock information is sourced from reliable APIs, offering up-to-date market insights.
- **Engaging UI**: A sleek, modern interface that emphasizes usability and aesthetic appeal.

Discover how StockMatch can enhance your investment strategy by visiting our live site: [StockMatch](https://stockmatch.netlify.app/).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Demo Video

Watch the StockMatch application in action:

[![StockMatch Demo]

## Demo Images

Images here

### Built With

- [![Java][Java-pic]][Java-url]
- ![Spring](https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white)

- ![Go](https://img.shields.io/badge/go-%2300ADD8.svg?style=for-the-badge&logo=go&logoColor=white)
- [![React][React.js]][React-url]
- ![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
- ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Powered By

<img src="images/finnhubLogo.png" alt="Logo" width="" height="80">
<img src="images/Yahoo!_Finance_logo_2021.png" alt="Logo" width="150" height="90">

<!-- GETTING STARTED -->

## Getting Started

This guide will outline the steps necessary to set up StockMatch environment with Go, Python, Spring/Java backend, and a React frontend. Follow these instructions to prepare your local development environment.

### Prerequisites

Before you begin, ensure you have the following installed:

- **Go**: Download and install from the [official Go website](https://golang.org/dl/).

- **Python**: Download and install from the [official Python website](https://www.python.org/downloads/).

- **Node.js and npm**: npm is distributed with Node.js which means that when you download Node.js, you automatically get npm installed on your computer. Download Node.js and npm from the [official Node.js website](https://nodejs.org/en/).

<!-- INSTALLATIONS AND SETUPS -->

## Installations and Setups

#### Go Installation

1. Confirm Go installation by checking the version in your terminal:
   ```sh
   go version
   ```

#### Python Installation

1. Confirm Python installation by checking the version in your terminal:
   ```sh
   python --version
   # or for Python 3
   python3 --version
   ```

#### Spring / Java Setup

1. Download and install the Java Development Kit (JDK) from [Oracle](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html) or use an OpenJDK distribution.
2. Download and install Maven from the [official Apache Maven project website](https://maven.apache.org/download.cgi).
3. Configure environment variables for Java and Maven if needed.

### Project Installation

1. Clone the repositories:
   ```sh
   git clone https://github.com/Aryanpatel335/StockMatch.git
   ```
2. Install dependencies for the Spring/Java application:
   ```sh
   cd StockMatchBackend
   mvn install
   ```
3. Install NPM packages for the React frontend:
   ```sh
   cd frontend
   npm install
   ```

### Running the Application

1. Start the Spring/Java server:

   ```sh
   cd StockMatchBackend
   mvn spring-boot:run
   ```

   The server should be accessible at `http://localhost:8080`.

2. In a new terminal, launch the React frontend:
   ```sh
   cd frontend
   npm start
   ```
   The React app should now be available at `http://localhost:3000`.

You are now ready to run and contribute to StockMatch!

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

Try it out: [https://stockmatch.netlify.app/](https://stockmatch.netlify.app/)

<!-- ROADMAP -->

## Roadmap

See the [open issues](https://github.com/Aryanpatel335/StockMatch/issues) for a list of proposed features (and known issues).

<!-- CONTRIBUTING -->

## Contributing

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACTS -->

## Contacts

- Aryan Patel:
  - Personal: aryanp862002@gmail.com
  - School: patea156@mcmaster.ca

---

- Martin Ivanov:
  - Personal: martinivnv2002@gmail.com

---

- Areez Visram:
  - Personal: areez.visram@gmail.com

---

Project Link: [https://github.com/Aryanpatel335/StockMatch](https://github.com/Aryanpatel335/StockMatch)

Live Link: [https://stockmatch.netlify.app/](https://stockmatch.netlify.app/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/github_username/repo_name.svg?style=for-the-badge
[contributors-url]: https://github.com/Aryanpatel335/StockMatch/graphs/contributors
[license-shield]: https://img.shields.io/github/license/github_username/repo_name.svg?style=for-the-badge
[license-url]: https://github.com/Aryanpatel335/StockMatch/blob/main/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com
[Java-pic]: https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white
[Java-url]: https://www.java.com/en/
