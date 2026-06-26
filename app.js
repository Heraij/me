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
    // Updated key to match your new Vercel domain perfectly!
    const siteKey = "me-flax-ten-vercel-app";
    
    fetch(`https://api.moe-counter.workers.dev/counter?page=${siteKey}`)
        .then(response => {
            if (!response.ok) throw new Error('Network error');
            return response.json();
        })
        .then(data => {
            const countElement = document.getElementById('view-count');
            if (countElement && data.views) {
                countElement.innerText = data.views.toLocaleString();
            }
        })
        .catch(error => {
            console.error("Counter Error:", error);
            document.getElementById('view-count').innerText = "000404";
        });
}
