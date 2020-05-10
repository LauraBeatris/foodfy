<p align="center">
   <img src=".github/logo-chef.png" width="200"/>
</p>

# Foodfy





[![Author](https://img.shields.io/badge/author-LauraBeatris-D54F44?style=flat-square)](https://github.com/LauraBeatris)
[![Languages](https://img.shields.io/github/languages/count/LauraBeatris/foodfy?color=%23D54F44&style=flat-square)](#)
[![Stars](https://img.shields.io/github/stars/LauraBeatris/foodfy?color=D54F44&style=flat-square)](https://github.com/LauraBeatris/foodfy/stargazers)
[![Forks](https://img.shields.io/github/forks/LauraBeatris/foodfy?color=%23D54F44&style=flat-square)](https://github.com/LauraBeatris/foodfy/network/members)
[![Contributors](https://img.shields.io/github/contributors/LauraBeatris/foodfy?color=D54F44&style=flat-square)](https://github.com/LauraBeatris/foodfy/graphs/contributors)


> Take your culinary skills to the next level. Cook, explore & manage recipes.

<br />
<p align="center"><img src=".github/home.gif?raw=true"/></p>
<p align="center"><img src=".github/admin.jpg?raw=true"/></p>

---

# Table of Contents

* [Features](#features)
* [Installation](#installation)
* [Getting Started](#getting-started)
* [FAQ](#faq)
* [Contributing](#contributing)
* [Found a bug? Missing a specific feature?](#issues)
* [License](#license)


# Features

* 👩🏽‍🍳  Explore recipes and find amazing chefs .
*  🍕 Create an account to manage recipes, chefs and users.
* 📨  As an administrator of the platform, you're able to invite other users .
* 🌏  Multi language support - English and Portuguese .
* 🎨  A cool dark mode theme toggle.

# Installation

**You need to install [Node.js](https://nodejs.org/en/download/) and [Yarn](https://yarnpkg.com/) first, then clone the project using this command:**

```git clone https://github.com/LauraBeatris/foodfy.git```

SSH URLs provide access to a Git repository via SSH, a secure protocol. If you a SSH key registered in your Github account, clone the project using this command:

```git@github.com:LauraBeatris/foodfy.git```

**Install dependencies**

```yarn install```

Create your enviroment variables based on the examples of ```.env.example```

```cp .env.example .env```

After copying the examples, make sure to fill the variables with new values.

**Setup a database**

Install [Postgres]() to create a database or if you have [Docker]() in your machine, fill the environment values related to database configurations and the run the following commands in order to create a postgres container.

```docker-compose up```

Execute the [Database Queries](https://github.com/LauraBeatris/foodfy/blob/master/src/database/seeds.js) to create tables, relationships and procedures.

# Getting Started

To start, run the seeds provided in [Seeds](https://github.com/LauraBeatris/foodfy/blob/master/src/database/seeds.js) in order to populate the database with an initial data.

```yarn run:seeds```

Run the following command in order to start the application in a development environment:

```yarn dev```


# Issues

Feel free to **file a new issue** with a respective title and description on the the [Foodfy](https://github.com/LauraBeatris/foodfy/issues) repository. If you already found a solution to your problem, **we would love to review your pull request**! Have a look at our [contribution guidelines](https://github.com/LauraBeatris/foodfy/master/CONTRIBUTING.m) to find out about the coding standards.

# Contributing

Check out the [contributing](https://github.com/LauraBeatris/foodfy/master/CONTRIBUTING.md) page to see the best places to file issues, start discussions and begin contributing.

# License

Released in 2020.
This project is under the MIT license.

Made with love by [Laura Beatris](https://github.com/LauraBeatris) 💜🚀
