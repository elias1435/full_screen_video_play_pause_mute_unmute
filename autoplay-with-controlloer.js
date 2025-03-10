<script>
// video js   
document.addEventListener("DOMContentLoaded", function () {
    // Add class to body
    document.body.classList.add("video-started");

    // Hide #first-screen
    let firstScreen = document.getElementById("first-screen");
    if (firstScreen) {
        firstScreen.style.display = "none";
    }

    // Create video element
    let video = document.createElement("video");
    video.src = "https://bridge-ette.com/wp-content/uploads/2025/03/L_AS-Casa-Bridge-ette-2024-Part-1_1.mp4";
    video.autoplay = true;
    video.muted = true; // Start muted (to allow autoplay)
    video.loop = false;
    video.controls = false;
    video.preload = "auto";
    video.setAttribute("playsinline", "true");

    // Apply styles for video
    video.style.position = "absolute";
    video.style.top = "0";
    video.style.left = "0";
    video.style.width = "100vw";
    video.style.height = "100vh";
    video.style.objectFit = "cover";
    video.style.zIndex = "1";
    video.style.backgroundColor = "black";

    // Create control container
    let controlContainer = document.createElement("div");
    controlContainer.style.position = "fixed";
    controlContainer.style.top = "20px";
    controlContainer.style.right = "50px";
    controlContainer.style.display = "flex";
    controlContainer.style.gap = "15px";
    controlContainer.style.fontSize = "15px";
    controlContainer.style.color = "#ffffff";
    controlContainer.style.zIndex = "10000";
    controlContainer.style.cursor = "pointer";

    // Create Play/Pause button
    let playPauseButton = document.createElement("div");
    playPauseButton.innerHTML = "Pause";
    playPauseButton.style.background = "rgba(0, 0, 0, 0)";
    playPauseButton.style.padding = "5px";
    playPauseButton.style.borderRadius = "5px";

    playPauseButton.addEventListener("click", function () {
        if (video.paused) {
            video.play();
            playPauseButton.innerHTML = "Pause";
        } else {
            video.pause();
            playPauseButton.innerHTML = "Play";
        }
    });

    // Create Mute/Unmute button
    let muteButton = document.createElement("div");
    muteButton.innerHTML = "Mute"; // Default unmuted
    muteButton.style.background = "rgba(0, 0, 0, 0)";
    muteButton.style.padding = "5px";
    muteButton.style.borderRadius = "5px";

    muteButton.addEventListener("click", function () {
        video.muted = !video.muted;
        muteButton.innerHTML = video.muted ? "Unmute" : "Mute";
    });

    // 🔹 Force Unmute Automatically After 2 Seconds
    setTimeout(() => {
        video.muted = false;
        muteButton.innerHTML = "Mute";
    }, 2000); // 2-second delay

    // Restart video when it ends
    video.addEventListener("ended", function () {
        video.currentTime = 0;
        video.play();
    });

    // Remove video & controls on "Escape" key
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            video.remove();
            controlContainer.remove();
            document.body.classList.remove("video-started");
        }
    });

    // Append buttons to control container
    controlContainer.appendChild(playPauseButton);
    controlContainer.appendChild(muteButton);

    // Append elements to the body
    document.body.appendChild(video);
    document.body.appendChild(controlContainer);
});


</script>
