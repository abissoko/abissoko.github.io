window.addEventListener('DOMContentLoaded', () => {
    // Step 1: Remove everything in the <html> element
    const html = document.documentElement;
    while (html.firstChild) {
        html.removeChild(html.firstChild);
    }

    // Step 2: Create a new <body> element
    const newBody = document.createElement('body');

    // Add some new content for testing
    const newHeading = document.createElement('h1');
    newHeading.textContent = "New DOM Loaded!";
    const newParagraph = document.createElement('p');
    newParagraph.textContent = "This is a completely new DOM.";

    // Append new content to the new body
    newBody.appendChild(newHeading);
    newBody.appendChild(newParagraph);

    // Append the new body to the html
    html.appendChild(newBody);
});