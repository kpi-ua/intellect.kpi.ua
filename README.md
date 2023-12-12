# intellect.kpi.ua

![example workflow](https://github.com/kpi-ua/intellect.kpi.ua/actions/workflows/workflow.yml/badge.svg)

Available at [Docker hub](https://hub.docker.com/r/kpiua/intellect.kpi.ua)

## Available Scripts

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
docker run --rm -it -p 8000:80 intellect.kpi.ua:test
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
