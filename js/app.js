// Function to toggle betwwen light and dark mode

function toggleMode(){
    var themeLink = document.getElementById('theme-link');
    if(themeLink.getAttribute('href') === 'light.css'){
        themeLink.setAttribute('href', 'dark.css');
    } else {
        themeLink.setAttribute('href', 'light.css');
    }
}

function getUserProfile(event){
    event.preventDefault; //Prevent form submission

    const username = document.getElementById('username').value;

    fetch(`https://api.github.com/users/${username}`)
        // .then(response => response.json())
        // .then(data => {
        //     if (data.message === 'Not Found'){
        //         showErrorMessage('Not found')
        //     }
        //     else {
        //         showUserProfile(data);
        //     }
        // }).catch(error => {
        //     showErrorMessage('No result');
        //     console.error(error);
        // });
        .then(response => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error('User not found');
            }
          })
          .then(data => {
            showUserProfile(data);
            hideNoResult();
          })
          .catch(error => {
            showNoResult();
            console.error(error);
          });
}

function showUserProfile(user) {
    const fullNameDiv = document.getElementById('full-name');
    const usernameDiv = document.getElementById('username');
    const dateJoinedDiv = document.getElementById('date-joined');
    const bioDiv = document.getElementById('bio');
    const avatarDiv = document.getElementById('avatar');
    const repoCountDiv = document.getElementById('repo-count');
    const followersCountDiv = document.getElementById('followers-count');
    const followingCountDiv = document.getElementById('following-count');
    const companyDiv = document.getElementById('company');
    const websiteDiv = document.getElementById('website');
    const locationDiv = document.getElementById('location');
    const twitterDiv = document.getElementById('twitter');
    
    fullNameDiv.textContent = user.name || 'not available';
    usernameDiv.textContent = `${user.login}`;
    // dateJoinedDiv.textContent = `${user.created_at}`;

    // Format the "Date Joined"
    const joinedDate = new Date(user.created_at);
    const options = {month: 'long', year: 'numeric' };
    const formattedDate = joinedDate.toLocaleDateString('en-US', options);
    const dateOrdinal = getOrdinalSuffix(joinedDate.getDate()); // Get the ordinal suffix for the day

    dateJoinedDiv.textContent = `Joined ${dateOrdinal} ${formattedDate}`;

    bioDiv.textContent = `${user.bio || 'not available'}`;
  
    const avatarImage = document.createElement('img');
    avatarImage.src = user.avatar_url;
    avatarImage.alt = 'Avatar';
    avatarImage.style.width = '70px'; // Set the desired width
    avatarImage.style.height = '70px'; // Set the desired height
    
    avatarDiv.innerHTML = '';
    avatarDiv.appendChild(avatarImage);

    repoCountDiv.textContent = `${user.public_repos}`;
  followersCountDiv.textContent = `${user.followers}`;
  followingCountDiv.textContent = `${user.following}`;
  companyDiv.textContent = `${user.company || 'not available'}`;
  websiteDiv.innerHTML = `<a href="${user.blog}" target="_blank">${user.blog || 'not available'}</a>`;
  locationDiv.textContent = `${user.location || 'not available'}`;
  twitterDiv.innerHTML = `<a href="https://twitter.com/${user.twitter_username}" target="_blank">${user.twitter_username || 'not available'}</a>`;

  }

//   function showErrorMessage(message) {
//     const errorMessageDiv = document.getElementById('error-message');
//     errorMessageDiv.textContent = message;
//   }

  // Function to get the ordinal suffix for a number (e.g., 1st, 2nd, 3rd)
function getOrdinalSuffix(number) {
    const suffixes = ['th', 'st', 'nd', 'rd'];
    const remainder = number % 100;
    const suffix = suffixes[(remainder - 20) % 10] || suffixes[remainder] || suffixes[0];
    return number + suffix;
  }
  
  function showNoResult() {
    const noResultDiv = document.getElementById('no-result');
    noResultDiv.style.display = 'inline';
  }
  
  function hideNoResult() {
    const noResultDiv = document.getElementById('no-result');
    noResultDiv.style.display = 'none';
  }
  
   