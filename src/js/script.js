console.log("hello, world!");

// $(document).ready(function() {
//  $('.hamburger').click(function() {
//    $('.nav-links').slideToggle(); // This will toggle the visibility with a nice slide effect!
    // Alternatively, you could use .toggle() for a simple show/hide
    // $('.nav-links').toggle();
//  });
// });

//COPYRIGHT
    const copyrightYearSpan = document.getElementById('copyright-year');
    const currentYear = new Date().getFullYear();
    copyrightYearSpan.textContent = currentYear;

//BACK TO TOP BUTTON
// Get the button:
let mybutton = document.getElementById("back-to-top-bttn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function backToTop() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

//RANDOM POST BUTTON 
  const randomPostButton = document.getElementById('random-post-button');

if (randomPostButton) {
	randomPostButton.addEventListener('click', async () => {
    try {
      // Fetch the list of posts
      const response = await fetch('/posts.json');
      const data = await response.json();
      const allPosts = data;

      if (allPosts && allPosts.length > 0) {
        // Pick a random post
        const randomIndex = Math.floor(Math.random() * allPosts.length);
        const randomPost = allPosts[randomIndex];

        // Go to the random post's URL
        window.location.href = randomPost.url;
      } else {
        console.error('Oops, no posts were found!');
      }
    } catch (error) {
      console.error('Oh no, something went wrong!', error);
    }
  });
}
  
// In js/collapsible-search.js

document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM Loaded. Starting collapsible search script...");

  const searchContainer = document.querySelector('.collapsible-search-container');
  const searchToggleBtn = document.getElementById('search-toggle-btn');

  // ✨ --- DETECTIVE LOGS! --- ✨
  // These will tell us if the elements were found.
  console.log("Looking for searchContainer (.collapsible-search-container):", searchContainer);
  console.log("Looking for searchToggleBtn (#search-toggle-btn):", searchToggleBtn);
  // ✨ ----------------------- ✨

  if (searchContainer && searchToggleBtn) {
    console.log("SUCCESS: Both elements found! Attaching click listener.");
    searchToggleBtn.addEventListener('click', () => {
      // (This is your existing click logic)
      if (searchContainer.classList.contains('active')) {
        const searchInput = searchContainer.querySelector('.pagefind-ui__search-input');
        if (searchInput) {
          searchInput.value = '';
          searchInput.dispatchEvent(new Event('input', { bubbles: true }));
        }
      }
      searchContainer.classList.toggle('active');
    });
  } else {
    console.error("FAILURE: Search container or toggle button is missing! Click listener NOT attached.");
  }
});