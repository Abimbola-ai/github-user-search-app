//Script for darkmode toggle
document.addEventListener("DOMContentLoaded", function () {
    const toggleLink = document.getElementById("toggleLink");
    const toggleIcon = document.getElementById("toggleIcon");
    const toggleText = document.getElementById("toggleText");
    const contentSections = document.querySelectorAll(".content-sections");
  
    // Function to toggle dark and light mode classes for content sections
    function toggleContentSectionMode() {
      contentSections.forEach((section) => {
        section.classList.toggle("dark-mode");
        section.classList.toggle("light-mode");
      });
    }
  
    // Function to toggle the toggle icon and text based on the current mode
    function updateToggleIconAndText() {
      const isDarkMode = document.body.classList.contains("dark-mode");
      if (isDarkMode) {
        toggleIcon.src = "assets/icon-sun.svg";
        toggleText.textContent = "Light";
      } else {
        toggleIcon.src = "assets/icon-moon.svg";
        toggleText.textContent = "Dark";
      }
    }
  
    // Add event listener to the toggle link (image) to toggle mode for content sections
    toggleLink.addEventListener("click", function () {
      document.body.classList.toggle("dark-mode");
      document.body.classList.toggle("light-mode");
      toggleContentSectionMode();
      updateToggleIconAndText();
    });
  
    // Toggle mode for content sections and update the toggle icon and text when the page loads
    toggleContentSectionMode();
    updateToggleIconAndText();
  });
  