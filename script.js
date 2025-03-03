 document.querySelectorAll(".welcome-text").forEach(button => {
    button.addEventListener("click", function () {
        // Add class to body
        document.body.classList.add("video-started");

        // Hide #first-screen
        let firstScreen = document.getElementById("first-screen");
        if (firstScreen) {
            firstScreen.style.display = "none";
        }

        // Create video element
        let video = document.createElement("video");
        video.src = "https://bridge-ette.com/wp-content/uploads/2024/07/Arman-Safavi-web2.mp4";
        video.autoplay = true;
        video.muted = false; // Default sound ON
        video.loop = false;
        video.controls = false; // Hide video controls

        // Apply styles for video (layer 1)
        video.style.position = "absolute";
        video.style.top = "0";
        video.style.left = "0";
        video.style.width = "100vw";
        video.style.height = "100vh";
        video.style.objectFit = "cover";
        video.style.zIndex = "1"; // Set to layer 1
        video.style.backgroundColor = "black";

        // Create control container
        let controlContainer = document.createElement("div");
        controlContainer.style.position = "fixed";
        controlContainer.style.top = "20px";
        controlContainer.style.right = "50px";
        controlContainer.style.display = "flex";
        controlContainer.style.gap = "15px";
        controlContainer.style.fontSize = "20px";
        controlContainer.style.color = "#ffffff";
        controlContainer.style.zIndex = "10000"; // Always above everything
        controlContainer.style.cursor = "pointer";

        // Create Play/Pause button
        let playPauseButton = document.createElement("div");
        playPauseButton.innerHTML = "Pause"; // Default state is playing
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
            muteButton.innerHTML = video.muted ? "Unmute" : "Mute"; // Change text
        });

        // Remove video when it ends
        video.addEventListener("ended", function () {
            video.remove();
            controlContainer.remove();
            document.body.classList.remove("video-started"); // Remove class when video ends
        });

        // Remove video & controls on "Escape" key
        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                video.remove();
                controlContainer.remove();
                document.body.classList.remove("video-started"); // Remove class when video closes
            }
        });

        // Append buttons to control container
        controlContainer.appendChild(playPauseButton);
        controlContainer.appendChild(muteButton);

        // Append elements to the body
        document.body.appendChild(video);
        document.body.appendChild(controlContainer);
    });
});
