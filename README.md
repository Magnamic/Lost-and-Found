# School Lost & Found App

A web app to help students find and claim their lost items at school. Teachers or cleaners can upload photos of found items, which are auto-classified using a machine learning model.

## Features

- Teachers/Cleaners upload item images, model auto-detects item type.
- Assign item to a student (name tag).
- Students browse/filter lost items, view images, claim their items.
- Claimed items are removed from the unclaimed list.
- Instructions to visit lost and found department after claiming.

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Place the model files

Copy your `model.json`, `weights.bin`, and `metadata.json` into the `/src` folder.

### 3. Start the backend

```bash
npm run server
```

### 4. Start the frontend

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Notes

- Backend stores items in memory. For production, switch to a database.
- The student name list is hardcoded. In production, connect to a student database.
- The model runs in-browser using TensorFlow.js and TeachableMachine.
