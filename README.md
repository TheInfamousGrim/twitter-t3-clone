# Twitter T3 Clone

A twitter clone made using the awesome t3 stack!

[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](code_of_conduct.md)
![Last Commit to Current Repo](https://img.shields.io/github/last-commit/TheInfamousGrim/twitter-t3-clone)
![Commits a month](https://img.shields.io/github/commit-activity/m/TheInfamousGrim/twitter-t3-clone)

## Table of Contents 📃

1. [Description](#description)
2. [Screenshot](#screenshots)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Technology](#technology)
6. [Features](#features)
7. [Credits](#credits)
8. [License](#license)
9. [Contribution Guidelines](#contribution-guidelines)
10. [Feedback](#feedback)
11. [Socials](#socials)

## Description

This app was made as I wanted to explore making apps using the T3 stack. It's a CLI app builder that sets up the skeleton of a fully typesafe next js application. I also wanted to play around with using some other integrations like upstash for all the redis stuff like rate limiting, clerk for managing auth and much more!

You can tweet and view your profile and tweets. Will implement likes and comments when I get the time.

[Link to application](https://twitter-t3-clone.vercel.app/)

### What did I Learn 🏫

Main takeaways were learning to use the prisma ORM, tRPC to create typesafe APIs, Clerk for user auth and more!

I also learned how to use:

- Learned more about using NextJS
  - slugs for variable routes for tweets and user profiles
  - How to make a 404 page
  - Using getStaticProps and generateStaticPaths to generate a static page
- Using upstash to implement a redis database for rate limiting
- How to use Planetscale to create and manage a deployed database
- Using create T3 app to scaffold an application
- React Hook Form

## Screenshots

### Web App Screenshot

![Home page for GrimFunky's portfolio](./readme-assets/twooter-screenshot.png)

## Installation

In order to run my site locally then please follow these steps:

1. Ensure that you have node and npm installed

   - [Download Node](https://nodejs.org/en/download/)

   - For detailed instructions on installing node please follow [this link](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) for instructions

2. Ensure that you know the basics of the nextjs page router

   - Otherwise please follow [this link](https://nextjs.org/docs) and follow the docs for editing any of the pages.

3. Clone this repository into your local repository.

   - `git clone git@github.com:TheInfamousGrim/nextjs-personal-site.git`.

4. Install the dependencies

   - `npm install`

If you've followed these steps correctly then the application should be good to go 😁

## Usage

Link to live application: [Click here](https://twitter-t3-clone.vercel.app/)

Please follow these steps to use the application locally

1. Spin up a developer server using webpack.

   - `npm run dev`

   - this will spin up a server and allow you to hot replace anything if you want to develop on my site further.

2. open a new tab in your browser using the following URL or the one supplied in the terminal

   - `http://localhost:3000/`

## Technology

The technologies used for the development of this app were:

[![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)](https://www.javascript.com/)

[![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/docs/)

[![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/en/)

[![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://reactjs.org/)

[![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)

[![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)](https://www.prisma.io/)

[![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)

[![tRPC](https://img.shields.io/badge/trpc-%232596BE?style=for-the-badge&logo=trpc&logoColor=white)](https://trpc.io/)

[![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

[![daisyui](https://img.shields.io/badge/daisyui-5A0EF8?style=for-the-badge&logo=daisyui&logoColor=white)](https://daisyui.com/)

[![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

[![Framer Motion](https://img.shields.io/badge/Framer-black?style=for-the-badge&logo=framer&logoColor=blue)](https://www.framer.com/motion/)

- [Create T3 App](https://create.t3.gg/)

## Features

- SSR & SSG.
- Built using nextjs.
- Tailwind classes so there's no conflicting css.
- Rate limiting thanks to Upstash
- Auth thanks to Clerk
- React Hook Forms to create easy validation and state management.
- Fully animated with the help of Framer Motion.
- Deployed using Vercel.

## Credits

🙏 Made with the help of:

- [Create T3 App](https://create.t3.gg/)

## License

![License: MIT](https://img.shields.io/github/license/TheInfamousGrim/george-fincher-react-portfolio?color=yellow)

[MIT License](/LICENSE)

## Contribution Guidelines

I'm open to have anyone jump in and contribute just message me on [twitter](https://twitter.com/GrimFunk69)

Please follow the contribution guidelines!
[Guidelines for contributing](/code_of_conduct.md)

## Feedback

![Ask Me Anything](https://img.shields.io/badge/Ask%20me-anything-1abc9c.svg)
[![Gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:george@grimfunky.dev)

<img src="https://avatars.githubusercontent.com/u/89855075?v=4" alt="TheInfamousGrim portrait">

Any feedback please email [George Fincher](mailto:george@grimfunky.dev)

## Socials

[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/TheInfamousGrim)

[![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/george-fincher-aa7869214/)

[![Twitter](https://img.shields.io/badge/Twitter-%231DA1F2.svg?style=for-the-badge&logo=Twitter&logoColor=white)](https://twitter.com/GrimFunk69)

## Learn More About Create T3 App

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy a T3 App?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.
