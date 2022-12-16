document.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('scroll', () => {
    let navbarHeight = document.querySelector('.navbar-container').scrollHeight;
    let windowPosition = window.scrollY;
    if (windowPosition > navbarHeight - 50) {
      document.querySelector('.navbar-container').classList.add('sticky');
    } else {
      document.querySelector('.navbar-container').classList.remove('sticky');
    }
  });
});
