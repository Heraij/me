document.addEventListener("DOMContentLoaded", () => {
    // Fetch data from your local json file
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            renderVideo(data.featuredVideoId);
            renderGoals(data.goals);
        })
        .catch(error => {
            console.error("Error loading site data:", error);
            document.getElementById('video-container').innerHTML = "<p>Failed to load video.</p>";
            document.getElementById('goals-list').innerHTML = "<li>Failed to load goals.</li>";
        });
});

function renderVideo(videoId) {
    const container = document.getElementById('video-container');
    // Responsive YouTube Embed Structure
    container.innerHTML = `
        <iframe 
            src="https://www.youtube.com/embed/${videoId}" 
            title="Featured Showcase" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
        </iframe>
    `;
}

function renderGoals(goalsArray) {
    const list = document.getElementById('goals-list');
    list.innerHTML = ""; // Clear loading state

    goalsArray.forEach(goal => {
        const li = document.createElement('li');
        li.className = goal.completed ? 'goal-item completed' : 'goal-item pending';
        
        // Use a cool checkmark or cross depending on state
        const statusIcon = goal.completed ? '✓' : '⟳';
        
        li.innerHTML = `
            <span class="goal-icon">${statusIcon}</span>
            <span class="goal-text">${goal.text}</span>
        `;
        list.appendChild(li);
    });
}
document.addEventListener("DOMContentLoaded", () => {
    // Keep your existing fetch('data.json') logic here...
    
    // Call the counter function
    updateViewCounter();
});

function updateViewCounter() {
    const countElement = document.getElementById('view-count');
    if (!countElement) return;

    // 1. Check if the browser already has a saved count
    let localHits = localStorage.getItem('creatorplus_views');
    
    // 2. If it's a new visitor, start at a baseline (e.g., 142), otherwise add 1
    if (!localHits) {
        localHits = 142; 
    } else {
        localHits = parseInt(localHits) + 1;
    }

    // 3. Save it back to the browser
    localStorage.setItem('creatorplus_views', localHits);

    // 4. Update the screen instantly
    countElement.innerText = localHits.toLocaleString();
}
document.addEventListener("DOMContentLoaded", () => {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            renderVideo(data.featuredVideoId);
            renderGoals(data.goals);
            renderDemons(data.demons);
            drawPieChart(data.skillsets);
        })
        .catch(error => console.error("Error:", error));
    
    updateViewCounter();
});

// Render the Top 5 grid elements
function renderDemons(demonsArray) {
    const container = document.getElementById('demons-container');
    container.innerHTML = "";

    demonsArray.slice(0, 5).forEach((demon, index) => {
        const card = document.createElement('div');
        card.className = 'demon-card';
        card.innerHTML = `<h3>#${index + 1} ${demon.name}</h3><p>${demon.difficulty}</p>`;
        
        // Open the detailed subpage on click
        card.addEventListener('click', () => openSubpage(demon));
        container.appendChild(card);
    });
}

// Generate the subpage data overlay dynamically
function openSubpage(demon) {
    const modal = document.getElementById('subpage-modal');
    const dataBox = document.getElementById('subpage-data');
    
    dataBox.innerHTML = `
        <h1 class="glow-header">${demon.name}</h1>
        <div class="video-wrapper">
            <iframe src="https://www.youtube.com/embed/${demon.videoId}" frameborder="0" allowfullscreen></iframe>
        </div>
        <div class="stats-bar">
            <div><strong>ID:</strong> ${demon.id}</div>
            <div><strong>Enjoyment:</strong> ${demon.enjoyment}</div>
            <div><strong>Skillset:</strong> ${demon.skillset}</div>
            <div><strong>Difficulty:</strong> ${demon.difficulty}</div>
        </div>
        <div class="thoughts-box">
            <h4>Thoughts:</h4>
            <p>${demon.thoughts}</p>
        </div>
    `;
    modal.style.display = "flex";
}

function closeSubpage() {
    document.getElementById('subpage-modal').style.display = "none";
}

// Draw a pure CSS/Canvas pie chart matching the site colors
function drawPieChart(skillsetData) {
    const canvas = document.getElementById('skillsetChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Set internal resolution sizes
    canvas.width = 300;
    canvas.height = 300;
    
    const colors = ['#a370f7', '#4caf50', '#e57373', '#2196f3'];
    const total = Object.values(skillsetData).reduce((a, b) => a + b, 0);
    
    let startAngle = 0;
    let colorIdx = 0;

    Object.entries(skillsetData).forEach(([skill, val]) => {
        const sliceAngle = (val / total) * 2 * Math.PI;
        
        // Draw slice
        ctx.beginPath();
        ctx.fillStyle = colors[colorIdx % colors.length];
        ctx.moveTo(150, 150);
        ctx.arc(150, 150, 120, startAngle, startAngle + sliceAngle);
        ctx.closePath();
        ctx.fill();
        
        startAngle += sliceAngle;
        colorIdx++;
    });
}
