const accessToken = '3bce751480e580';

async function getMyIP() {
  const url = `https://ipinfo.io/json?token=${accessToken}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    displayInfo(data, "myInfo");
  } catch (err) {
    document.getElementById("myInfo").innerText = "Failed to fetch your IP info.";
  }
}

async function lookupIP() {
  const ip = document.getElementById("customIp").value.trim();
  if (!ip) return alert("Please enter an IP address.");
  const url = `https://ipinfo.io/${ip}?token=${accessToken}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data && !data.error) {
      displayInfo(data, "customInfo");
    } else {
      document.getElementById("customInfo").innerText = "Invalid or private IP.";
    }
  } catch (err) {
    document.getElementById("customInfo").innerText = "Error fetching IP info.";
  }
}

function displayInfo(data, elementId) {
  const timeZone = data.timezone;
  const localTime = timeZone ? new Date().toLocaleString("en-US", { timeZone }) : "N/A";
  const box = document.getElementById(elementId);
  box.classList.remove("hidden");
  box.innerHTML = `
    <p><strong> Your Info is:</strong></p>
    <p><strong>IP:</strong> ${data.ip || "N/A"}</p>
    <p><strong>City:</strong> ${data.city || "N/A"}</p>
    <p><strong>Region:</strong> ${data.region || "N/A"}</p>
    <p><strong>Country:</strong> ${data.country || "N/A"}</p>
    <p><strong>Location:</strong> ${data.loc || "N/A"}</p>
    <p><strong>ISP:</strong> ${data.org || "N/A"}</p>
    <p><strong>Timezone:</strong> ${data.timezone || "N/A"}</p>
    <p><strong>Local Time:</strong> ${localTime}</p>
  `;
}

document.addEventListener("click", function (event) {
  const myInfoWrapper = document.getElementById("myInfoWrapper");
  const customInfoWrapper = document.getElementById("customInfoWrapper");

  if (!myInfoWrapper.contains(event.target)) {
    document.getElementById("myInfo").classList.add("hidden");
  }

  if (!customInfoWrapper.contains(event.target)) {
    document.getElementById("customInfo").classList.add("hidden");
  }
});
