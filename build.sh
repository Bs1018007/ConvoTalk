#!/bin/bash

# Build frontend
echo "Building frontend..."
cd frontend
npm install
npm run build
cd ..

# Prepare backend
echo "Preparing backend..."
cd backend
npm install
cd .. 