# VS Extensions for hamu house

RUN code --install-extension esbenp.prettier-vscode

# firebase for hamu house

RUN npm install -g firebase-tools

firebase login

firebase init hosting

yarn build

firebase deploy
