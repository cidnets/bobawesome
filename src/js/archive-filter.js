// In js/archive-filter.js

document.addEventListener('DOMContentLoaded', () => {
  const postsPerPage = 5; // How many posts to show at a time. Change this number as you like!
  let currentFilter = 'all'; // Keep track of the currently active filter.
  let visiblePostCount = 0; // Keep track of how many posts are currently shown.

  const filterButtons = document.querySelectorAll('.filter-btn');
  const postItems = document.querySelectorAll('.post-item');
  const loadMoreBtn = document.getElementById('load-more-btn');

  // --- Main function to update which posts are visible ---
  function updateVisiblePosts() {
    // Convert NodeList to an Array to use .filter()
    const allPostsArray = Array.from(postItems);

    // First, get a list of posts that match the current filter
    const filteredPosts = allPostsArray.filter(item => {
      if (currentFilter === 'all') {
        return true; // Show all posts if filter is 'all'
      }
      return item.dataset.tags.includes(currentFilter);
    });

    // Reset the count of how many posts we've made visible
    visiblePostCount = 0;

    // Now, loop through ALL original posts to show/hide them
    postItems.forEach(item => {
      // Check if the current item is in our filtered list
      const shouldBeVisible = filteredPosts.includes(item);
      
      if (shouldBeVisible && visiblePostCount < postsPerPage) {
        // If it matches the filter AND we haven't hit our page limit...
        item.classList.remove('hidden');
        visiblePostCount++;
      } else {
        // Otherwise, hide it.
        item.classList.add('hidden');
      }
    });

    // Show or hide the "Load More" button
    if (visiblePostCount < filteredPosts.length) {
      loadMoreBtn.classList.remove('hidden');
    } else {
      loadMoreBtn.classList.add('hidden');
    }
  }

  // --- Event Listener for Filter Buttons ---
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Set the new filter
      currentFilter = button.dataset.tag;

      // Style the active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // Update the view
      updateVisiblePosts();
    });
  });

  // --- Event Listener for "Load More" Button ---
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
        const allPostsArray = Array.from(postItems);
        const filteredPosts = allPostsArray.filter(item => {
            if (currentFilter === 'all') return true;
            return item.dataset.tags.includes(currentFilter);
        });

        let currentlyShown = 0;
        allPostsArray.forEach(item => {
            if (!item.classList.contains('hidden')) {
                currentlyShown++;
            }
        });
        
        let newlyShown = 0;
        for (const item of filteredPosts) {
            if (item.classList.contains('hidden') && newlyShown < postsPerPage) {
                item.classList.remove('hidden');
                newlyShown++;
            }
        }
        
        let stillHiddenCount = 0;
        for (const item of filteredPosts) {
            if (item.classList.contains('hidden')) {
                stillHiddenCount++;
            }
        }

        if(stillHiddenCount === 0) {
            loadMoreBtn.classList.add('hidden');
        }
    });
  }

  // --- Initial Load ---
  // On page load, run the function once to show the first page of posts.
  updateVisiblePosts();
  
   function applyFilterFromURL() {
    // Check if there's a hash in the URL (e.g., #my-cool-tag)
    if (window.location.hash) {
      // Get the tag name from the hash, removing the '#' at the beginning
      const tagFromURL = window.location.hash.substring(1);

      // Find the filter button on the page that has a matching data-tag
      const matchingButton = document.querySelector(`.filter-btn[data-tag="${tagFromURL}"]`);
      
      // If we found a button...
      if (matchingButton) {
        // ...programmatically "click" it for the user!
        matchingButton.click();
      }
    }
  }

  // Run our new function once, as soon as the page loads
  applyFilterFromURL();
});