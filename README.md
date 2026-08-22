# intellect.kpi.ua

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![Docker Image Version (latest by date)](https://img.shields.io/docker/v/kpiua/intellect.kpi.ua)](https://hub.docker.com/r/kpiua/intellect.kpi.ua)

Spearheaded by Igor Sikorsky Kyiv Polytechnic Institute, this project unites a diverse group of university professionals, including scientists, teachers, engineers, and post-graduate students. The project is centered around fundamental and applied research, practical implementation of results, and educational activities.

## Run & debug

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Docker

### Build

```bash
docker build ./ --file ./Dockerfile --tag intellect.kpi.ua:test
```

### Run

```bash
docker run --rm -it -p 3000:3000 intellect.kpi.ua:test
```

### Debug

#### Build the Docker image for development

```bash
docker build -f debug.dockerfile -t intellect.kpi.ua:debug .
```

#### Run the Docker container with volume mapping for live updates

```bash
docker run --rm -it -p 3000:3000 -v $(pwd):/usr/src/app -v /usr/src/app/node_modules intellect.kpi.ua:debug
```

Now you can open website locally at http://localhost:3000/

## License

Starting from commit `4b2c90443657` / version `1.0.1` (`2026-08-22`), this project is licensed under the Mozilla Public License 2.0 (see [LICENSE](LICENSE)). Code contributed before that point remains available under the Apache License 2.0 (see [LICENSE-Apache-2.0](LICENSE-Apache-2.0)). The last commit under the previous license is tagged `apache-2.0-final`.
