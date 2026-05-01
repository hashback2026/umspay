async function sendSTK() {
    const numbers = document.getElementById("numbers").value
        .split("\n")
        .map(n => n.trim())
        .filter(n => n);

    const amount = document.getElementById("amount").value;
    const reference = document.getElementById("reference").value;

    const res = await fetch("/send-stk", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ numbers, amount, reference })
    });

    const data = await res.json();
    document.getElementById("result").innerText = JSON.stringify(data, null, 2);
}