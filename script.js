const fs = require('fs');
const path = require('path');

const rootDir = 'C:Users\hp\Desktop\Efrica-EMS\Event-Management-System-Frontend>';

// Function to recursively traverse through directories
function traverseDirectory(dir) {
    fs.readdirSync(dir).forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            traverseDirectory(filePath);
        } else if (stat.isFile() && file.endsWith('.js')) {
            replaceText(filePath);
        }
    });
}

// Function to replace text in a file
function replaceText(filePath) {
    let content = fs.readFileSync(filePath, 'utf-8');
    content = content.replace(/JakartaBold/g, 'PoppinsBold');
    content = content.replace(/JakartaSemiBold/g, 'PoppinsSemiBold');
    // Add more replacements as needed

    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Replaced text in: ${filePath}`);
}

// Start the traversal
traverseDirectory(rootDir);
