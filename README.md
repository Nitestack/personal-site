<div align="center">
<h1>
  🌐 Personal Site
</h1>

![Latest Commit](https://img.shields.io/github/last-commit/Nitestack/personal-site?style=for-the-badge)
![GitHub Repo Stars](https://img.shields.io/github/stars/Nitestack/personal-site?style=for-the-badge)
![Github Created At](https://img.shields.io/github/created-at/Nitestack/personal-site?style=for-the-badge)

[Features](#-features) • [Requirements](#️-requirements) • [Getting Started](#-getting-started) • [Configuration](#-configuration) • [License](#-license)

_This repository contains the source code for my personal website, built to showcase my work and share my experiences. It's developed with a modern tech stack including [Next.js](https://nextjs.org) and [Tailwind CSS](https://tailwindcss.com)._

<p>
  <strong>If you find this repository useful, please <a href="#" title="star">⭐️</a> or fork it!</strong>
</p>
</div>

## 🚀 Features

This project is built with a focus on performance, clean code, and a great developer experience.

- **Framework**: Built with [Next.js](https://nextjs.org), a powerful React framework.

- **Language**: Written in [TypeScript](https://typescriptlang.org) for type safety and improved code quality.

- **Styling**: Styled with [Tailwind CSS](https://tailwindcss.com), a utility-first CSS framework for rapid UI development.

- **Content Management**: Integrates with the [Notion API](https://developers.notion.com) to fetch blog posts and other content.

- **Linting & Formatting**: Enforces a consistent code style with [ESLint](https://eslint.org) and [Prettier](https://prettier.io).

- **Animations**: Smooth and beautiful animations powered by [Motion](https://motion.dev).

- **Internationalization**: Supports multiple languages using [next-intl](https://next-intl.dev).

## ⚙️ Requirements

To get this project up and running locally, you'll need:

1. [**Node.js**](https://nodejs.org): Make sure you have a recent version of Node.js installed.

2. [**pnpm**](https://pnpm.io): This project uses `pnpm` as its package manager. You can install it with `npm install -g pnpm`.

## 🏁 Getting Started

Follow these steps to set up the project on your local machine.

1. **Clone the repository**:

```sh
git clone https://git.npham.de/Nitestack/personal-site.git
cd personal-site
```

2. **Install dependencies**:

```sh
pnpm install
```

3. **Configure Environment Variables**: Follow the steps in the [Configuration](#-configuration) section below.

4. **Run the development server**:

```sh
pnpm dev
```

The site will be available at `http://localhost:3000`.

## 🛠️ Configuration

This project uses a combination of environment variables and a constants file for configuration.

### 1. Environment Variables (`.env`)

1. **Create a `.env` file**: Copy the example file to create your local configuration.

```sh
cp .env.example .env
```

2. **Fill in your secrets**: Open the `.env` file and add your credentials.

- `GITHUB_PERSONAL_ACCESS_TOKEN`: A personal access token for the GitHub API, used to fetch repository information.

- `NOTION_SECRET`: Your Notion API secret key.

- `NOTION_DATASOURCE_ID`: The ID of the Notion datasource where your blog posts are stored.

### 2. Global Constants (`src/constants.ts`)

Non-sensitive, static data that is used throughout the application is stored in `src/constants.ts`. This includes things like the site URL, author information, and navigation links. You can modify this file to change the site's branding and core settings.

## 📝 License

This project is licensed under the Apache-2.0 license.
