function formatDate(dateString) {
  // Format the date to "day Month Year" format
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

// Function to fetch your user details from the GitHub API and use it as the default profile
async function setDefaultUserProfile() {
  try {
    const response = await fetch(`https://api.github.com/users/abimbola-ai`);
    if (response.ok) {
      const user = await response.json();
      showUserProfile(user);
    }
  } catch (error) {
    console.error(error);
  }
}

async function getUserProfile(event) {
  event.preventDefault();

  const username = document.getElementById("username").value.trim();

  if (username === "") {
    // Handle empty input field  - to be worked on
    return;
  }

  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) {
      showUserProfile(null); // Display default profile when no result is found
      return;
    }
    const user = await response.json();
    showUserProfile(user);
  } catch (error) {
    showUserProfile(null);
    console.error(error);
  }
}

function showUserProfile(user) {
  const usernameInput = document.getElementById("username");

  if (!user) {
    // If the user is not found, show the default profile
    usernameInput.value = ""; // Clear the input field
    usernameInput.placeholder = "No result"; // Set the placeholder text to "No result"
    usernameInput.classList.add("red-placeholder"); // Apply the red-placeholder class
    document.getElementById("no-result").style.display = "none"; // Hide the "No result" message
    document.getElementById("profile-container").style.display = "block"; // Show the profile container


    // Display the default profile information
    document.getElementById("avatar").innerHTML = `<img src="assets/Oval.png" alt="github octocat image">`;
    document.getElementById("full-name").textContent = "The Octocat";
    document.getElementById("user-name").textContent = "@octocat";
    document.getElementById("date-joined").textContent = "Joined 25th January 2011";
    document.getElementById("bio").textContent =
      "This is a default page, enter username in the search box above to view user info and stats. Thanks for using this application.";
    document.getElementById("repo-count").textContent = "8";
    document.getElementById("followers-count").textContent = "3938";
    document.getElementById("following-count").textContent = "9";
    document.getElementById("location").textContent = "San Francisco";
    document.getElementById("website").innerHTML =
      '<a href="#">https://github.blog</a>';
    document.getElementById("twitter").innerHTML =
      '<a href="#">not available</a>';
    document.getElementById("company").textContent = "@github";

    // Remove "not available" class from elements
    const notAvailableElements = document.querySelectorAll(
      ".not-available-text"
    );
    notAvailableElements.forEach((element) => {
      element.classList.remove("not-available-text");
    });
  } else {
      // If the user is found, show the user profile details
      usernameInput.value = ""; // Clear the input field
      usernameInput.placeholder = "Search GitHub username..."; // Restore the placeholder text
      usernameInput.classList.remove("red-placeholder"); // Apply the red-placeholder class
      document.getElementById("no-result").style.display = "none"; // Hide the "No result" message
      document.getElementById("profile-container").style.display = "block"; // Show the profile container

    // Update the profile information with the retrieved user data
    document.getElementById("avatar").innerHTML = `<img src="${user.avatar_url}" alt="github octocat image">`;
    document.getElementById("full-name").textContent = user.name || "not available";
    document.getElementById("user-name").textContent = `@${user.login}`;
    document.getElementById("date-joined").textContent = `Joined ${formatDate(user.created_at)}`;
    document.getElementById("bio").textContent = user.bio || "not available";
    document.getElementById("repo-count").textContent = user.public_repos;
    document.getElementById("followers-count").textContent = user.followers;
    document.getElementById("following-count").textContent = user.following;
    document.getElementById("location").textContent = user.location || "not available";
    document.getElementById("website").innerHTML = user.blog
      ? `<a href="${user.blog}" target="_blank">${user.blog}</a>`
      : "not available";
    document.getElementById("twitter").innerHTML = user.twitter_username
      ? `<a href="https://twitter.com/${user.twitter_username}" target="_blank">${user.twitter_username}</a>`
      : "not available";
    document.getElementById("company").textContent = user.company || "not available";

    // Check for "not available" elements and update their class
    const notAvailableElements = document.querySelectorAll(
      ".other-info *:not(a):not(p):not(button):not(img):not(h3):not(h1)"
    );
    notAvailableElements.forEach((element) => {
      if (element.textContent.trim().toLowerCase() === "not available") {
        element.classList.add("not-available-text");
      }
    });
  }
}


// Function to get the ordinal suffix for a number (e.g., 1st, 2nd, 3rd)
function getOrdinalSuffix(number) {
  const suffixes = ['th', 'st', 'nd', 'rd'];
  const remainder = number % 100;
  const suffix = suffixes[(remainder - 20) % 10] || suffixes[remainder] || suffixes[0];
  return number + suffix;
};  

function showNoResult() {
  const noResultDiv = document.getElementById('no-result');
  noResultDiv.style.display = 'inline';
};
  
function hideNoResult() {
  const noResultDiv = document.getElementById('no-result');
  noResultDiv.style.display = 'none';
}; 
  


//Script for darkmode toggle
document.addEventListener("DOMContentLoaded", function () {
  const toggleLink = document.getElementById("toggleLink");
  const toggleIcon = document.getElementById("toggleIcon");
  const toggleText = document.getElementById("toggleText");
  const searchDiv = document.querySelectorAll(".search");
  const profileDiv = document.querySelectorAll(".octocat-profile");
  const statsDiv = document.querySelectorAll(".stats");
  const inputElement = document.getElementById('username');

  // Function to toggle dark and light mode classes for the search area
  function toggleSearchDivMode() {
    searchDiv.forEach((section) => {
      section.classList.toggle("dark-mode");
      section.classList.toggle("light-mode");
    });
  }

   // Function to toggle dark and light mode classes for profile sections
   function toggleProfileDivMode() {
    profileDiv.forEach((section) => {
      section.classList.toggle("dark-mode");
      section.classList.toggle("light-mode");
    });
  }

  // Function to toggle dark and light mode classes for user stats sections
  function toggleStatsDivMode() {
    statsDiv.forEach((section) => {
      section.classList.toggle("dark-mode");
      section.classList.toggle("light-mode");
    });
  }

  //Function to toggle placeholder for light and dark mode
  function togglePlaceholderColor() {
    inputElement.classList.toggle('dark-mode');
    inputElement.classList.toggle('light-mode');
  }


  // Function to toggle the toggle icon and text based on the current mode
  function updateToggleIconAndText() {
    const isDarkMode = document.body.classList.contains("dark-mode");
    if (isDarkMode) {
      toggleIcon.src = "assets/icon-moon.svg";
      toggleText.textContent = "dark";
    } else {
      toggleIcon.src = "assets/icon-sun.svg";
      toggleText.textContent = "light";
    }
  }

  // Add event listener to the toggle link (image) to toggle mode for other sections
  toggleLink.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
    document.body.classList.toggle("light-mode");
    toggleSearchDivMode();
    toggleProfileDivMode();
    toggleStatsDivMode();
    updateToggleIconAndText();
    togglePlaceholderColor();
  });

  // Toggle mode for content sections and update the toggle icon and text when the page loads
  toggleSearchDivMode();
  toggleProfileDivMode();
  toggleStatsDivMode();
  updateToggleIconAndText();
  togglePlaceholderColor();
  setDefaultUserProfile();
});



   