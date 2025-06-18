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