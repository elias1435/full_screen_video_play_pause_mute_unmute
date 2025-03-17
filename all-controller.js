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
    video.src = "https://your-domain.com/assets/video.mp4";
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
    video.style.objectFit = "contain";
    video.style.zIndex = "1";
    video.style.backgroundColor = "white";

    // Create control container
    let controlContainer = document.createElement("div");
    controlContainer.className = "custom-video-controls";
    controlContainer.style.position = "fixed";
    controlContainer.style.top = "20px";
    controlContainer.style.right = "31px";
    controlContainer.style.display = "flex";
    controlContainer.style.gap = "10px";
    controlContainer.style.zIndex = "10000";
    controlContainer.style.cursor = "pointer";

    function createControlButton(src, className, clickHandler) {
        let btn = document.createElement("img");
        btn.src = src;
        btn.className = className;
        btn.style.width = "30px";
        btn.style.height = "30px";
        btn.style.cursor = "pointer";
        btn.addEventListener("click", clickHandler);
        return btn;
    }

    let playPauseButton = createControlButton("https://your-domain.com/img/pause.png", "video-play", function () {
        if (video.paused) {
            video.play();
            playPauseButton.src = "https://your-domain.com/img/pause.png";
        } else {
            video.pause();
            playPauseButton.src = "https://your-domain.com/img/play.png";
        }
    });

    let muteButton = createControlButton("https://your-domain.com/img/unmute.png", "video-mute", function () {
        video.muted = !video.muted;
        muteButton.src = video.muted ? "https://your-domain.com/img/mute.png" : "https://your-domain.com/img/unmute.png";
    });

    let rewindButton = createControlButton("https://your-domain.com/img/rewind.png", "video-backward", function () {
        video.currentTime -= 10; // Rewind 10 seconds
    });

    let forwardButton = createControlButton("https://your-domain.com/img/forward-.png", "video-forward", function () {
        video.currentTime += 10; // Forward 10 seconds
    });

    // 🔹 Force Unmute Automatically After 2 Seconds
    setTimeout(() => {
        video.muted = false;
        muteButton.src = "https://your-domain.com/img/mute.png";
    }, 2000); // 2-second delay

    video.addEventListener("ended", function () {
        video.currentTime = 0;
        video.play();
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            video.remove();
            controlContainer.remove();
            document.body.classList.remove("video-started");
        }
    });

    controlContainer.appendChild(playPauseButton);
    controlContainer.appendChild(muteButton);
    controlContainer.appendChild(rewindButton);
    controlContainer.appendChild(forwardButton);

    document.body.appendChild(video);
    document.body.appendChild(controlContainer);
});
