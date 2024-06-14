// Function to connect with MetaMask
async function connect() {
    try {
        // Request access to MetaMask accounts
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0]; // Get the first account
        document.getElementById('account').textContent = account;

        // Fetch and display account balance
        const balance = await ethereum.request({ method: 'eth_getBalance', params: [account] });
        document.getElementById('balance').textContent = (balance / 1e18).toFixed(5); // Convert wei to ETH
    } catch (error) {
        console.error(error);
        alert('MetaMask connection failed. Please make sure MetaMask is installed and unlocked.');
    }
}

// Function to send ETH
async function sendEth() {
    const recipient = document.getElementById('recipient').value.trim();
    const amount = document.getElementById('amount').value.trim();
    const hexValue = document.getElementById('hexValue').value.trim();

    if (!recipient || !amount || isNaN(amount) || parseFloat(amount) <= 0 || !hexValue) {
        alert('Please enter valid recipient address, amount, and hex value.');
        return;
    }

    try {
        const txHash = await ethereum.request({
            method: 'eth_sendTransaction',
            params: [{
                from: ethereum.selectedAddress,
                to: recipient,
                value: '0x' + (parseFloat(amount) * 1e18).toString(16), // Convert ETH to wei
                data: hexValue  // Include hexadecimal data in the transaction
            }]
        });
        alert('Transaction sent: ' + txHash);
    } catch (error) {
        console.error(error);
        alert('Transaction failed.');
    }
}
