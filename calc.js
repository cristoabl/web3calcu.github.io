const CHAIN_ID = "0x5";
const CHAIN_NAME = "Goerli";
const CONTRACT_ADDRESS = "0x989171080E61dED4fca34555656c4221969c5210";

const form = document.getElementById("form");
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    let num1 = document.getElementById("num1");
    console.log("num1: ", num1)
    num1 = num1.value;
    if (isNaN(num1)) {
        alert("first input was not a number");
        return;
    } 
    num1 = Number(num1);

    let num2 = document.getElementById("num2");
    console.log("num2: ", num2)
    num2 = num2.value;
    
    if (isNaN(num2)) {
        alert("second input was not a number");
        return;
    }
    num2 = Number(num2);

    const operations = ["add", "sub", "mul", "div"];
    let operationToDo;
    for (let i = 0; i < operations.length; i++) {
        let operation = document.getElementById(operations[i]);
        console.log(i,operation)
        if (operation.checked === true) {
            operationToDo = operations[i];
        }
    }
    console.log("operationToDo: ", operationToDo)

    let result;
    let fName;
        // const let var types of variables
    if (operationToDo === "add") {
        fName = "adder"
        result = adder(num1, num2);
    } else if (operationToDo === "sub") {
        fName = "subtracter"
        result = subtracter(num1, num2);
    } else if (operationToDo === "mul") {
        fName = "multiplier"
        result = multiplier(num1, num2);
    } else if (operationToDo === "div") {
        fName = "divider"
        result = divider(num1, num2);
    } else {
        alert("select an operation");
        return;
    }
    let CONTRACT_ABI = await fetch("./abi.json");
    CONTRACT_ABI = await CONTRACT_ABI.json();
    console.log(CONTRACT_ABI);

    const iface = new ethers.utils.Interface(CONTRACT_ABI);
    const encodedData = iface.encodeFunctionData(fName, [
        num1, num2
    ])
    try {
        const result = await window.ethereum.request({
            method: "eth_sendTransaction",
            params: [{
                from: window.ethereum.selectedAddress,
                to: CONTRACT_ADDRESS,
                data: encodedData
            }]
        })
        console.log(result);

    } catch (error) {
        console.log(eror)
        alert("something went wrong with ur tx");
        return;
    }
    const new ethers.providers.Web3Provider(window.ethereum);
    console.log(provider);
    //alert("result: " + String(result));
})

function adder(num1, num2) {
    return num1 + num2;
}
function subtracter(num1, num2) {
    return num1 - num2;
}
function multiplier(num1, num2) {
    return num1 * num2;
}
function divider(num1, num2) {
    return num1 / num2;
}

async function connectWallet() {
    if (!window.ethereum) {
        alert("No injected provider found. Install Metamask.");
    } else {
        try {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            const account = accounts[0];

            const chainId = await window.ethereum.request({
                method: "eth_chainId",
            });

            if (chainId !== CHAIN_ID) {
                alert("Connected to wrong chain! Please change to " + CHAIN_NAME)
            } else {
                alert("Connected to account: " + String(account) + " and chainID: " + String(chainId));
            }

        } catch {
            alert("Something went wrong connecting. Refresh and try again.");
        }
    }
}