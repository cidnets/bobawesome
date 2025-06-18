 // ARCHIVE FILTER
 // In js/archive-filter.js

document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const postItems = document.querySelectorAll('.post-item');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Get the tag to filter by from the button's data-tag attribute
      const filterTag = button.dataset.tag;

      // --- Handle Active Button Styling ---
      // Remove 'active' class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Add 'active' class to the clicked button
      button.classList.add('active');

      // --- Handle Post Filtering ---
      postItems.forEach(item => {
        // Get the list of tags from the post item's data-tags attribute
        const itemTags = item.dataset.tags;

        if (filterTag === 'all' || itemTags.includes(filterTag)) {
          // If "All" is clicked OR the post's tags include the filter tag...
          item.style.display = 'block'; // ...show the post.
        } else {
          // Otherwise...
          item.style.display = 'none'; // ...hide the post.
        }
      });
    });
  });
});