// Generate 100 placeholder beats
const beatNames = ["CYBER", "DRAIN", "VENOM", "GLITCH", "ROUGE", "ONYX", "GHOST", "PULSE"];
const beats = [];

for (let i = 1; i <= 100; i++) {
    const randomName = beatNames[Math.floor(Math.random() * beatNames.length)];
    beats.push({
        id: i,
        title: `${randomName} #${i}`,
        bpm: 120 + (i % 40),
        price: "$49.99",
        sold: i === 2 || i === 5 
    });
}

const grid = document.getElementById('beatGrid');
const searchInput = document.getElementById('beatSearch');

function render(filter = "") {
    grid.innerHTML = "";
    const filteredBeats = beats.filter(b => b.title.toLowerCase().includes(filter.toLowerCase()));

    filteredBeats.forEach(beat => {
        const card = document.createElement('div');
        card.className = `beat-card ${beat.sold ? 'sold' : ''}`;
        card.innerHTML = `
            <button class="play-btn" onclick="playPreview('${beat.title}')">▶</button>
            <div class="beat-info">
                <h3>${beat.title} ${beat.sold ? '<span class="sold-label">SOLD</span>' : ''}</h3>
                <p>${beat.bpm} BPM</p>
            </div>
            <div class="price">${beat.price}</div>
            <button class="buy-btn" onclick="buy(${beat.id})">BUY</button>
        `;
        grid.appendChild(card);
    });
}

let previewInterval;
function playPreview(title) {
    const bar = document.getElementById('playerBar');
    const fill = document.getElementById('progress-fill');
    const titleEl = document.getElementById('nowPlayingTitle');
    
    bar.style.display = "block";
    titleEl.innerText = "PREVIEW: " + title;
    
    let progress = 0;
    clearInterval(previewInterval);
    previewInterval = setInterval(() => {
        progress += 0.22; 
        fill.style.width = progress + "%";
        if (progress >= 100) {
            clearInterval(previewInterval);
            alert("Preview Ended. Purchase to unlock.");
        }
    }, 100);
}

// UPDATED BUY FUNCTION
function buy(id) {
    const beat = beats.find(b => b.id === id);
    
    // 1. Ask for confirmation
    if(confirm(`Purchase ${beat.title}?`)) {
        
        // 2. Prepare Email Details
        const email = "mpakatihazel@gmail.com";
        const subject = encodeURIComponent(`Purchase Inquiry: ${beat.title}`);
        const body = encodeURIComponent(`Hi Prod MnM,\n\nI would like to purchase the beat: ${beat.title}.\n\nPlease let me know the next steps for payment.\n\nThanks!`);
        
        // 3. Open Email App
        window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;

        // 4. Mark as sold on the site
        beat.sold = true;
        render(searchInput.value);
    }
}

searchInput.addEventListener('input', (e) => render(e.target.value));

// Initial Start
render();