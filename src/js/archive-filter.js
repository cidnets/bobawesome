// In js/archive-filter.js
console.log("Archive Filter is working!")

document.addEventListener('DOMContentLoaded', () => {
  const postsPerPage = 10; // How many posts to show at a time.
  let currentFilter = 'all';
  let postsToShow = postsPerPage;

  const filterButtons = document.querySelectorAll('.filter-btn');
  const postItems = document.querySelectorAll('.post-item');
  const loadMoreBtn = document.getElementById('load-more-btn');

  // --- This is now our SINGLE function to update the view ---
  function updateView() {
    const allPostsArray = Array.from(postItems);
    
    // Get a list of posts that match the current filter
    const filteredPosts = allPostsArray.filter(item => {
      if (currentFilter === 'all') return true;
      return item.dataset.tags.includes(currentFilter);
    });

    let visibleCount = 0;
    // Loop through all the filtered posts to decide who to show
    filteredPosts.forEach((item, index) => {
      if (index < postsToShow) {
        item.classList.remove('hidden');
        visibleCount++;
      } else {
        item.classList.add('hidden');
      }
    });

    // Hide any posts that are NOT in the filtered list
    allPostsArray.forEach(item => {
      if (!filteredPosts.includes(item)) {
        item.classList.add('hidden');
      }
    });

    // Show or hide the "Load More" button
    if (visibleCount < filteredPosts.length) {
      loadMoreBtn.classList.remove('hidden');
    } else {
      loadMoreBtn.classList.add('hidden');
    }
  }

  // --- Event Listener for Filter Buttons ---
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      currentFilter = button.dataset.tag;
      postsToShow = postsPerPage; // Reset the page count on a new filter

      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      updateView();
    });
  });

  // --- Event Listener for "Load More" Button ---
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      postsToShow += postsPerPage; // Show more posts
      updateView();
    });
  }

  // --- NEW AND IMPROVED INITIAL LOAD LOGIC ---
  function initialLoad() {
    const tagFromURL = window.location.hash.substring(1);
    
    if (tagFromURL) {
      const matchingButton = document.querySelector(`.filter-btn[data-tag="${tagFromURL}"]`);
      if (matchingButton) {
        // If we find a matching button from the URL, "click" it
        matchingButton.click();
      } else {
        // If the URL hash doesn't match any button, just load the default view
        updateView();
      }
    } else {
      // If there's no hash at all, load the default view
      updateView();
    }
  }

  // Run the initial load logic!
  initialLoad();
});