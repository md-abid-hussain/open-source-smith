# Open Source Smith

Open Source Smith is a CLI tool designed to help you quickly set up various types of starter kits for your projects, including backend, frontend, and full-stack configurations.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Commands](#commands)
- [Contributing](#contributing)
- [License](#license)

## Installation

To install Open Source Smith, you need to have Node.js and npm installed on your machine. Then, you can install the package globally using:

```sh
npm install -g open-source-smith
```

## Usage

After installation, you can use the CLI tool to generate different types of starter kits. For example:

```sh
open-source-smith init
```

## Commands

- `forge` : Initialize a new open-source project

### Project Types

1. FrontendKit
   - React
   - Vite
   - NextJS
2. BackendKit
   - Express with TypeScript
3. FullStackKit
   - Express as backend
   - NextJS Full Stack

```sh
Usage: open-source-smith [options] [command]

A CLI tool for managing open-source projects

Options:
  -V, --version   output the version number
  -h, --help      display help for command

Commands:
  forge            Initialize a new open-source project
  help [command]  display help for command
```

## Contributing

Contributions are always welcome! Please read the [contribution guidelines](CONTRIBUTING.md) first.

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.
