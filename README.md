# casino-wallet-sim

Create this app your way and a better way: Certainly! Here is a simplified step-by-step guide to set up the wallet app for simulation, targeted at users with minimal technical knowledge.

### Step-by-Step Guide

#### Step 1: Set Up Your Development Environment

1. **Install Node.js and npm**:
   - Download and install Node.js from [Node.js official website](https://nodejs.org/).
   - npm is included with Node.js, so installing Node.js will also install npm.

2. **Install Python**:
   - Download and install Python from [Python official website](https://www.python.org/).

#### Step 2: Create the Project Directory

1. **Open Command Prompt (Windows) or Terminal (Mac/Linux)**.
2. **Create and navigate to the project directory**:
   ```sh
   mkdir casino-wallet-simulation
   cd casino-wallet-simulation
   ```

#### Step 3: Initialize a Node.js Project

1. **Initialize the project**:
   ```sh
   npm init -y
   ```

2. **Install required packages**:
   ```sh
   npm install express axios body-parser
   ```

#### Step 4: Create the Token Service

1. **Create a file named `token_service.py`** in the project directory.
2. **Copy and paste the following code into `token_service.py`**:

   ```python
   import base64

   ACCOUNT_NUMBER = '8XXXXXX'
   CLIENT_KEY = '2tHA35v%Lgf7'
   SECRET_KEY = 'n3xusT3c#'

   def encrypt(string, key=SECRET_KEY):
       result = ''
       for i in range(len(string)):
           char = string[i]
           keychar = key[(i % len(key)) - 1]
           char = chr(ord(char) + ord(keychar))
           result += char
       return base64.b64encode(result.encode()).decode()

   def generate_token():
       string_to_encrypt = f'{ACCOUNT_NUMBER}-nexus-key-{CLIENT_KEY}'
       return encrypt(string_to_encrypt)

   if __name__ == '__main__':
       token = generate_token()
       print(f'Token: {token}')
   ```

#### Step 5: Create the Main Application

1. **Create a file named `app.js`** in the project directory.
2. **Copy and paste the following code into `app.js`**:

   ```javascript
   const express = require('express');
   const bodyParser = require('body-parser');
   const { exec } = require('child_process');
   const axios = require('axios');

   const app = express();
   app.use(bodyParser.json());

   function generateToken(callback) {
       exec('python3 token_service.py', (error, stdout, stderr) => {
           if (error) {
               console.error(`Error generating token: ${error}`);
               callback(null);
               return;
           }
           const token = stdout.trim();
           callback(token);
       });
   }

   async function makeRequest(url, payload, headers) {
       try {
           const response = await axios.post(url, payload, { headers });
           console.log(`Status Code: ${response.status}`);
           console.log(`Response Text: ${JSON.stringify(response.data)}`);
           return response.data;
       } catch (error) {
           if (error.response) {
               console.error(`HTTP error occurred: ${error.response.status} - ${error.response.statusText}`);
           } else if (error.request) {
               console.error(`No response received: ${error.request}`);
           } else {
               console.error(`Error in request: ${error.message}`);
           }
       }
   }

   app.post('/payin', (req, res) => {
       generateToken((token) => {
           if (!token) {
               res.status(500).send('Token generation failed');
               return;
           }
           const url = 'https://api.nexuspay.cloud/hook/process';
           const headers = {
               'Authorization': `Bearer ${token}`,
               'Content-Type': 'application/json'
           };
           makeRequest(url, req.body, headers)
               .then(response => res.json(response))
               .catch(error => res.status(500).send(error.message));
       });
   });

   app.post('/payout', (req, res) => {
       generateToken((token) => {
           if (!token) {
               res.status(500).send('Token generation failed');
               return;
           }
           const url = 'https://api.nexuspay.cloud/hook/process';
           const headers = {
               'Authorization': `Bearer ${token}`,
               'Content-Type': 'text/plain'
           };
           makeRequest(url, req.body, headers)
               .then(response => res.json(response))
               .catch(error => res.status(500).send(error.message));
       });
   });

   app.listen(3000, () => {
       console.log('Server is running on port 3000');
   });
   ```

#### Step 6: Create the User Interface

1. **Create a file named `index.html`** in the project directory.
2. **Copy and paste the following code into `index.html`**:

   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <title>Casino Wallet Simulation</title>
       <script>
           async function submitTransaction(endpoint) {
               const data = {
                   name: document.getElementById('name').value,
                   email: document.getElementById('email').value,
                   amount: document.getElementById('amount').value,
                   mobilenumber: document.getElementById('mobilenumber').value,
                   address: document.getElementById('address').value,
                   pay_method: document.getElementById('pay_method').value,
                   remarks: document.getElementById('remarks').value,
                   webhook: "https://api.nexuspay.cloud/hook/icore.php"  // assuming this is a constant
               };

               const response = await fetch(endpoint, {
                   method: 'POST',
                   headers: {
                       'Content-Type': 'application/json'
                   },
                   body: JSON.stringify(data)
               });

               const result = await response.json();
               document.getElementById('result').textContent = JSON.stringify(result, null, 2);
           }

           function processPayin() {
               submitTransaction('/payin');
           }

           function processPayout() {
               submitTransaction('/payout');
           }
       </script>
   </head>
   <body>
       <h1>Casino Wallet Simulation</h1>
       <form>
           <label>Name: <input type="text" id="name" required></label><br>
           <label>Email: <input type="email" id="email" required></label><br>
           <label>Amount: <input type="number" id="amount" required></label><br>
           <label>Mobile Number: <input type="text" id="mobilenumber" required></label><br>
           <label>Address: <input type="text" id="address" required></label><br>
           <label>Pay Method: <input type="text" id="pay_method" required></label><br>
           <label>Remarks: <input type="text" id="remarks" required></label><br>
           <button type="button" onclick="processPayin()">Deposit</button>
           <button type="button" onclick="processPayout()">Withdraw</button>
       </form>
       <pre id="result"></pre>
   </body>
   </html>
   ```

#### Step 7: Running the Application

1. **Start the Node.js server**:
   - Open Command Prompt (Windows) or Terminal (Mac/Linux).
   - Navigate to your project directory if not already there.
   - Run the following command:
     ```sh
     node app.js
     ```

   You should see a message: `Server is running on port 3000`.

2. **Open the User Interface**:
   - Open a web browser.
   - Navigate to the location of `index.html` file by using the browser's file open feature or dragging the file into the browser window.

3. **Interact with the Application**:
   - Fill in the form with the required details.
   - Click "Deposit" to simulate a payin transaction.
   - Click "Withdraw" to simulate a payout transaction.
   - The results will be displayed in the `result` section below the form.

### Troubleshooting

1. **If the server does not start**, ensure Node.js and Python are correctly installed and added to your system's PATH.
2. **If you encounter errors** while running the scripts, check the console or terminal output for error messages and verify the code for typos or syntax errors.
3. **If the user interface does not display results**, ensure the server is running and the file paths in the HTML are correct.

By following these steps, you should be able to set up and run the wallet app simulation. If you encounter any issues or need further assistance, feel free to ask!

## Collaborate with GPT Engineer

This is a [gptengineer.app](https://gptengineer.app)-synced repository 🌟🤖

Changes made via gptengineer.app will be committed to this repo.

If you clone this repo and push changes, you will have them reflected in the GPT Engineer UI.

## Tech stack

This project is built with React with shadcn-ui and Tailwind CSS.

- Vite
- React
- shadcn-ui
- Tailwind CSS

## Setup

```sh
git clone https://github.com/GPT-Engineer-App/casino-wallet-sim.git
cd casino-wallet-sim
npm i
```

```sh
npm run dev
```

This will run a dev server with auto reloading and an instant preview.

## Requirements

- Node.js & npm - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
