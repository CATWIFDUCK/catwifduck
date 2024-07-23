document.addEventListener("DOMContentLoaded", function() {

  document.getElementById('telegram-btn').addEventListener('click', () => {
    window.open('https://telegram.org', '_blank');
  });

  document.getElementById('twitter-btn').addEventListener('click', () => {
    window.open('https://twitter.com', '_blank');
  });

  document.getElementById('buy-btn').addEventListener('click', () => {
    window.open('https://example.com/buy', '_blank');
  });

  const cats = Array.from({ length: 15 }, (_, i) => ({
    element: document.getElementById(`cat${i + 1}`),
    degree: 0,
    posX: window.innerWidth / 2,
    posY: window.innerHeight / 2,
    velocityX: (Math.random() - 0.5) * 4,
    velocityY: (Math.random() - 0.5) * 4
  }));

  const h1Element = document.querySelector('header h1');
  const playMusicBtn = document.getElementById('play-music-btn');
  const audio = new Audio('./media/gayporn.mp3');
  let isPlaying = false;

  function rotateAndMove() {
    cats.forEach(cat => {
      // Rotate the element
      cat.element.style.transform = `rotate(${cat.degree}deg)`;
      cat.degree += 3;

      // Move the element
      cat.posX += cat.velocityX;
      cat.posY += cat.velocityY;

      // Check for collision with the window edges
      if (cat.posX <= 0 || cat.posX >= window.innerWidth - cat.element.clientWidth) {
        cat.velocityX *= -1;
        tiltH1();
      }
      if (cat.posY <= 0 || cat.posY >= window.innerHeight - cat.element.clientHeight) {
        cat.velocityY *= -1;
        tiltH1();
      }

      cat.element.style.left = `${cat.posX}px`;
      cat.element.style.top = `${cat.posY}px`;
    });
  }

  function tiltH1() {
    h1Element.style.transform = 'rotate(10deg)';
    setTimeout(() => {
      h1Element.style.transform = 'rotate(0deg)';
    }, 300);
  }

  // Set initial position for each cat
  cats.forEach(cat => {
    cat.element.style.left = `${cat.posX}px`;
    cat.element.style.top = `${cat.posY}px`;
  });

  // Start the animation
  setInterval(rotateAndMove, 15);

  playMusicBtn.addEventListener('click', () => {
    if (isPlaying) {
      audio.pause();
      playMusicBtn.textContent = "PLAY MUSIC";
      document.removeEventListener('mousemove', moveButton);
      playMusicBtn.style.transform = 'none'; // Reset position when music stops
    } else {
      audio.play();
      playMusicBtn.textContent = "STOP MUSIC";
      playMusicBtn.style.transition = 'transform 0.1s'; // Reduced duration for quicker response
      document.addEventListener('mousemove', moveButton);
    }
    isPlaying = !isPlaying;
  });

  function moveButton(event) {
    const btnRect = playMusicBtn.getBoundingClientRect();
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    const btnCenterX = btnRect.left + btnRect.width / 2;
    const btnCenterY = btnRect.top + btnRect.height / 2;

    const offsetX = mouseX - btnCenterX;
    const offsetY = mouseY - btnCenterY;

    const newPosX = btnRect.left - offsetX * 0.3; // Increased multiplier for more aggressive fleeing
    const newPosY = btnRect.top - offsetY * 0.3; // Increased multiplier for more aggressive fleeing

    playMusicBtn.style.transform = `translate(${newPosX - btnRect.left}px, ${newPosY - btnRect.top}px)`;
  }

  // Add event listeners to social buttons

});
