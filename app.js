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
