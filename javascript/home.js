// Add this in your home.js or create a new JavaScript file
document.addEventListener("DOMContentLoaded", function () {
  const heroSection = document.getElementById("heroSection");
  const welcomeText = document.getElementById("welcomeText");
  getRandomQuote();
  // Array of image URLs for the hero background
  const imageUrls = [
    "/images/hero-image1.jpg",
    "/images/hero-image2.jpg",
    "/images/hero-image3.jpg",
  ];

  let currentImageIndex = 0;

  // Function to change the background image
  function changeBackgroundImage() {
    heroSection.style.backgroundImage = `url('${imageUrls[currentImageIndex]}')`;
    currentImageIndex = (currentImageIndex + 1) % imageUrls.length;
  }

  // Change image every 5 seconds (adjust the time interval as needed)
  setInterval(changeBackgroundImage, 5000);

  // Initial background image
  changeBackgroundImage();

  if (Notification.permission !== "granted") {
    Notification.requestPermission().then(function (permission) {
      if (permission === "granted") {
        // showNotification("Welcome!", "Thank you for granting permission.");
        let notification = new Notification("Welcome to Career Connect", {
          body: "Thank you for allowing our notifications.",
        });
      } else {
        console.log("Permission denied for notifications");
        // alert(
        //   "Please allow notifications for this site. You can manage your settings in your browser."
        // );
      }
    });
  } else {
    console.log("permission already granted!");
  }
});

let notification, interval;
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") {
    let leaveDate = new Date();
    interval = setInterval(() => {
      notification = new Notification("Come back please!!!", {
        body: `You have been away since last ${Math.round(
          (new Date() - leaveDate) / 1000
        )} seconds.`,
        tag: "Come back",
      });
    }, 5000);
  } else {
    if (interval) clearInterval(interval);
    if (notification) notification.close();
  }
});

function getRandomQuote() {
  const apiUrl = "https://api.quotable.io/random";

  fetch(apiUrl, {
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const quoteTextElement = document.getElementById("quoteText");
      const quoteAuthorElement = document.getElementById("quoteAuthor");

      quoteTextElement.textContent = `"${data.content}"`;
      quoteAuthorElement.textContent = `- ${data.author}`;
    })
    .catch((error) => {
      console.error("Error fetching quote:", error);
    });
}
