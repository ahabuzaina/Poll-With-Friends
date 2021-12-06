# INSTALLATION
This project uses Ganache, truffle and metamask. NPM will also be needed.

Truffle installation - npm install -g truffle

Ganache download - http://trufflesuite.com/ganache/

MetaMask chrome extension - https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en 


# How to run the project

- Open Ganache and choose quickstart (keep open)

- Navigate in terminal to where project is located

- Run command $truffle migrate --reset 

- Run command $npm run dev 

The project should now open and run in your main browser (google chrome)

- Open metamask and connect your account to your local host that ganache is running on 

MetaMask should now be connected to ganache. You can now run the project.

# Help
- Double check the ID at the bottom left of the page. If it reads null, Metamask is not connected properly to your local host network.