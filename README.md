# Surveillance Dashboard Components

This repository contains a collection of components and charts built using [React](https://react.dev/) and [D3.js](https://d3js.org/) for creating dashboard visualizations. The components are designed to showcase various data visualizations commonly used in the Teknoir Dashboard.

## Getting Started

To run the components locally, follow these steps:

1. Clone the repository
2. Navigate to the project directory
3. Install dependencies:
```bash
   npm install
```
4. Run the development server:
```bash
   npm run dev
```
5. Open your browser and go to [http://localhost:5173](http://localhost:5173) to see the components in action

## Storybook

This project also includes a Storybook environment for isolated component development and documentation. To run Storybook:

1. Run the Storybook server:
```bash
   npm run storybook
```
2. Open your browser and go to [http://localhost:6006](http://localhost:6006) to access Storybook. 

## Documentation

If you feel a little bit lost, check this article about [React + D3.js](https://2019.wattenberger.com/blog/react-and-d3) by Amelia Wattenberger.


## Triggers

The following triggers are configured in GCP:
- push to (main|dev) branch to build and deploy to the corresponding environments
- push to any branch to build an image and push to GCR


## Build an image & deploy to Teknoir DEV cloud

Run the following command from the root of the repo:

> The only params that can be modified are **SHORT_SHA**, **BRANCH_NAME** and **BASENAME**.

```
gcloud --project=teknoir-mgmt builds submit . \
--config=cloudbuild.yaml \
--timeout=3600 \
--substitutions=\
SHORT_SHA="test",\
BRANCH_NAME="dev"
```

## Build an image & deploy to Teknoir cloud

Run the following command from the root of the repo:

> The only params that can be modified are **SHORT_SHA**, **BRANCH_NAME** and **BASENAME**.

```
gcloud --project=teknoir-mgmt builds submit . \
--config=cloudbuild.yaml \
--timeout=3600 \
--substitutions=\
SHORT_SHA="1.0.0",\
BRANCH_NAME="main"
```

