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

    // 1. Get the current visit count from localStorage, or default to 0 if it's their first time
    let localHits = localStorage.getItem('creatorplus_views');
    
    // If it doesn't exist yet, let's start it off at a realistic number so it doesn't look empty!
    if (!localHits) {
        localHits = 142; // Your starting view baseline
    } else {
        localHits = parseInt(localHits) + 1;
    }

    // 2. Save the updated count back to the browser storage
    localStorage.setItem('creatorplus_views', localHits);

    // 3. Display it beautifully in your panel with commas
    countElement.innerText = localHits.toLocaleString();
}
