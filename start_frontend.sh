#!/bin/bash

### Script for MacOS Setup ###

# Setup + install latest dependencies
which brew || (echo "brew is not installed, may ask for sudo access" && \
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)")
which node || (echo "node is not installed, may ask for sudo access" && \
    curl "https://nodejs.org/dist/latest/node-${VERSION:-$(wget -qO- https://nodejs.org/dist/latest/ | sed -nE \
    's|.*>node-(.*)\.pkg</a>.*|\1|p')}.pkg" > "$HOME/Downloads/node-latest.pkg" && \
    sudo installer -store -pkg "$HOME/Downloads/node-latest.pkg" -target "/")
brew list envoy || (echo "envoy is not installed, may ask for sudo access" && brew install envoy)
npm install

# Start envoy proxy + frontend service
envoy -c envoy.yaml & npm start