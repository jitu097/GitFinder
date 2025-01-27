// Select DOM Elements
const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('searchInput');
const profileBox = document.getElementById('profileBox');
const avatarImg = document.getElementById('avatar');
const nameElement = document.getElementById('name');
const usernameElement = document.getElementById('username');
const bioElement = document.getElementById('bio');
const followersElement = document.getElementById('followers');
const followingElement = document.getElementById('following');
const checkProfileBtn = document.getElementById('checkProfile-btn');

// Variable to Store GitHub Profile URL
let githubProfileURL = '';

// Event Listener for Search Button
searchBtn.addEventListener('click', () => {
    const username = searchInput.value.trim();
    if (username === '') {
        alert('Please enter a GitHub username');
        return;
    }
    fetchProfile(username);
});

// Event Listener for Check Profile Button
checkProfileBtn.addEventListener('click', () => {
    if (githubProfileURL) {
        window.open(githubProfileURL, '_blank');
    } else {
        alert('GitHub profile URL is not available');
    }
});

// Function to Fetch Profile Data from GitHub API
const fetchProfile = async (username) => {
    try {
        // Show profile box with loading state
        profileBox.style.display = 'flex';
        avatarImg.src = ''; // Clear previous avatar
        nameElement.textContent = 'Loading...';
        usernameElement.textContent = '@';
        bioElement.textContent = 'Loading...';
        followersElement.textContent = 'Loading...';
        followingElement.textContent = 'Loading...';
        checkProfileBtn.disabled = true; // Disable button while loading

        const response = await fetch(`https://api.github.com/users/${username}`);
        if (!response.ok) {
            throw new Error('User not found');
        }
        const profile = await response.json();
        displayProfile(profile);
    } catch (error) {
        alert(error.message);
        profileBox.style.display = 'none'; // Hide profile box on error
    }
};

// Function to Display Profile Data
const displayProfile = (profile) => {
    avatarImg.src = profile.avatar_url;
    nameElement.textContent = profile.name || 'Name not available';
    usernameElement.textContent = `@${profile.login}`;
    bioElement.textContent = profile.bio || 'Bio not available';
    followersElement.textContent = profile.followers;
    followingElement.textContent = profile.following;
    githubProfileURL = profile.html_url; // Store GitHub profile URL
    checkProfileBtn.disabled = false; // Enable button after loading
};