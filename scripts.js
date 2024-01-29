document.addEventListener('DOMContentLoaded', function () {
    const toolbar = document.getElementById('toolbar');
    const website = document.getElementById('website');
    const saveButton = document.getElementById('saveButton');

    toolbar.addEventListener('dragstart', function (event) {
        event.dataTransfer.setData('text/plain', event.target.id);
    });

    website.addEventListener('dragover', function (event) {
        event.preventDefault();
    });

    website.addEventListener('drop', function (event) {
        event.preventDefault();
        const toolId = event.dataTransfer.getData('text/plain');
        const tool = document.getElementById(toolId);

        if (tool) {
            const section = document.createElement('section');
            section.setAttribute('contenteditable', 'true');
            section.appendChild(tool.cloneNode(true));

            website.appendChild(section);
        }
    });

    website.addEventListener('click', function (event) {
        if (event.target.tagName === 'SECTION') {
            const section = event.target;
            const content = section.textContent;

            const newText = prompt('Edit Text:', content);
            if (newText !== null) {
                section.textContent = newText;
            }
        }
    });

    website.addEventListener('contextmenu', function (event) {
        event.preventDefault();
        if (event.target.tagName === 'SECTION') {
            const section = event.target;
            section.remove();
        }
    });

    saveButton.addEventListener('click', function () {
        const sections = Array.from(website.getElementsByTagName('section'));
        const savedData = sections.map(section => section.textContent);

        console.log('Saved Data:', savedData);

        // Save to local storage
        localStorage.setItem('websiteData', JSON.stringify(savedData));
    });
});
