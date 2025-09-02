async function loadLine(line) {
  const response = await fetch(`data/${line}.json`);
  const data = await response.json();

  document.getElementById("schedule").classList.remove("hidden");
  document.getElementById("line-title").textContent = `Linia ${data.line}`;

  const dirA = document.getElementById("dirA");
  const dirB = document.getElementById("dirB");
  dirA.innerHTML = "";
  dirB.innerHTML = "";

  data.dirA.forEach(time => {
    const li = document.createElement("li");
    li.textContent = time;
    dirA.appendChild(li);
  });

  data.dirB.forEach(time => {
    const li = document.createElement("li");
    li.textContent = time;
    dirB.appendChild(li);
  });

  showNextDeparture(data);
}

function showNextDeparture(data) {
  const now = new Date();
  const currentTime = now.getHours() * 60 + now.getMinutes();

  const departures = [...data.dirA, ...data.dirB].map(t => {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
  }).filter(t => t >= currentTime);

  if (departures.length === 0) {
    document.getElementById("next-departure").classList.add("hidden");
    return;
  }

  const next = departures[0];
  const h = Math.floor(next / 60);
  const m = next % 60;

  document.getElementById("next-departure").classList.remove("hidden");
  document.getElementById("next-time").textContent = `${h}:${m.toString().padStart(2,"0")}`;
}
