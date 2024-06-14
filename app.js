// Function to connect with MetaMask
async function connect() {
    try {
        // Request access to MetaMask accounts
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0]; // Get the first account
        document.getElementById('account').textContent = account;

        // Change button text to "Connected"
        document.getElementById('connectButton').textContent = 'Connected';

        // Fetch and display account balance
        const balance = await ethereum.request({ method: 'eth_getBalance', params: [account] });
        document.getElementById('balance').textContent = (balance / 1e18).toFixed(5); // Convert wei to ETH
    } catch (error) {
        console.error(error);
        showNotification('MetaMask connection failed. Please make sure MetaMask is installed and unlocked.', 'error');
    }
}

// Function to send ETH
async function sendEth() {
    const recipient = document.getElementById('recipient').value.trim();
    const amount = document.getElementById('amount').value.trim();
    const hexValue = document.getElementById('hexValue').value.trim();

    if (!recipient || isNaN(amount) || parseFloat(amount) < 0) {
        showNotification('Please enter a valid recipient address and a non-negative amount.', 'error');
        return;
    }

    try {
        let transactionParams = {
            from: ethereum.selectedAddress,
            to: recipient,
            value: '0x' + (parseFloat(amount) * 1e18).toString(16) // Convert ETH to wei
        };

        if (hexValue) {
            transactionParams.data = hexValue; // Include hexadecimal data in the transaction if provided
        }

        const txHash = await ethereum.request({
            method: 'eth_sendTransaction',
            params: [transactionParams]
        });

        showNotification('Transaction sent: ' + txHash, 'success');
    } catch (error) {
        console.error(error);
        showNotification('Transaction failed.', 'error');
    }
}

// Function to show notification
function showNotification(message, type) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = 'popup-notification ' + type;
    notification.style.display = 'block';

    setTimeout(() => {
        notification.style.display = 'none';
    }, 1000); // Hide notification after 1 second
}
