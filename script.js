function openWebsite(websiteUrl) {
    try{
        window.open(websiteUrl);
    }catch{
        
    }
}

function scrollToSection(event, sectionId) {
    event.preventDefault();
    var section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: 'smooth' });
}
