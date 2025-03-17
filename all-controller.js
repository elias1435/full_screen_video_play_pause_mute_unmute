// added mute/unmute, play/pause, forward, reward
document.addEventListener("DOMContentLoaded", function () {
    var buttons = document.querySelectorAll(".welcome-text");

    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", function () {
            document.body.classList.add("video-started");
            
            var firstScreen = document.getElementById("first-screen");
            if (firstScreen) {
                firstScreen.style.display = "none";
            }

            var video = document.createElement("video");
            video.src = "https://yourdomian.com/landingpage.mp4";
            video.autoplay = true;
            video.muted = false;
            video.loop = false;
            video.controls = false;
            video.preload = "auto";
            video.setAttribute("playsinline", "true");
            video.setAttribute("webkit-playsinline", "true");
            
            video.style.position = "absolute";
            video.style.top = "0";
            video.style.left = "0";
            video.style.width = "100vw";
            video.style.height = "100vh";
            video.style.objectFit = "cover";
            video.style.zIndex = "1";
            video.style.backgroundColor = "white";

            var controlContainer = document.createElement("div");
            controlContainer.className = "custom-video-controls";
            controlContainer.style.position = "fixed";
            controlContainer.style.top = "20px";
            controlContainer.style.right = "31px";
            controlContainer.style.display = "flex";
            controlContainer.style.gap = "10px";
            controlContainer.style.zIndex = "10000";
            controlContainer.style.cursor = "pointer";

            function createControlButton(src, className, clickHandler) {
                var btn = document.createElement("img");
                btn.src = src;
                btn.className = className;
                btn.style.width = "30px";
                btn.style.height = "30px";
                btn.style.cursor = "pointer";
                btn.addEventListener("click", clickHandler);
                return btn;
            }

            var playPauseButton = createControlButton("https://yourdomian.com/img/pause.png", "video-play", function () {
                if (video.paused) {
                    video.play();
                    playPauseButton.src = "https://yourdomian.com/img/pause.png";
                } else {
                    video.pause();
                    playPauseButton.src = "https://yourdomian.com/img/play.png";
                }
            });

            var muteButton = createControlButton("https://yourdomian.com/img/unmute.png", "video-mute", function () {
                video.muted = !video.muted;
                muteButton.src = video.muted ? "https://yourdomian.com/img/mute.png" : "https://yourdomian.com/img/unmute.png";
            });

            var rewindButton = createControlButton("https://yourdomian.com/img/rewind.png", "video-backward", function () {
                video.currentTime -= 10; // Rewind 10 seconds
            });

            var forwardButton = createControlButton("https://yourdomian.com/img/forward.png", "video-forward", function () {
                video.currentTime += 10; // Forward 10 seconds
            });

            video.addEventListener("ended", function () {
                video.currentTime = 0;
                video.play();
            });

            document.addEventListener("keydown", function (event) {
                if (event.key === "Escape") {
                    video.parentNode.removeChild(video);
                    controlContainer.parentNode.removeChild(controlContainer);
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
    }
});
