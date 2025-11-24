const menuLinks = document.querySelectorAll('.menu-link');

function setActiveLink(linkId) {
  menuLinks.forEach(l => l.classList.remove('active'));
  const activeLink = document.getElementById(linkId);
  if(activeLink) activeLink.classList.add('active');
}

const path = window.location.pathname;
menuLinks.forEach(link => {
  const href = link.getAttribute('href');
  if(path.endsWith(href)) {
    setActiveLink(link.id);
  }
});

menuLinks.forEach(link => {
  link.addEventListener('click', function() {
    setActiveLink(this.id);
    localStorage.setItem('activeMenu', this.id);
  });
});