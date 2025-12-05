const fs = require('fs');
const path = require('path');
const md2html = require('./md2html');

// Create output directory if it doesn't exist
const outputDir = path.join(__dirname, 'html');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Function to convert a single markdown file to HTML
function convertFile(inputPath, outputPath) {
    try {
        // Read markdown file
        const markdown = fs.readFileSync(inputPath, 'utf8');

        // Convert to HTML
        const html = md2html(markdown);

        // Write HTML file
        fs.writeFileSync(outputPath, html, 'utf8');

        console.log(`✓ Converted: ${path.basename(inputPath)} -> ${path.basename(outputPath)}`);
    } catch (error) {
        console.error(`✗ Error converting ${path.basename(inputPath)}:`, error.message);
    }
}

// Function to convert all test markdown files
function convertAllTests() {
    const testDir = __dirname;

    // List of test files to convert
    const testFiles = [
        'test1-basic.md',
        'test2-lists.md',
        'test3-mixed.md',
        'test4-unclosed.md',
        'test5-complex.md'
    ];

    console.log('=== Markdown to HTML Converter ===\n');

    // Convert each test file
    testFiles.forEach(file => {
        const inputPath = path.join(testDir, file);
        const outputFile = file.replace('.md', '.html');
        const outputPath = path.join(outputDir, outputFile);

        convertFile(inputPath, outputPath);
    });

    console.log('\n=== Conversion Complete ===');
    console.log(`Output directory: ${outputDir}`);
}

// Run conversion if called directly
if (require.main === module) {
    convertAllTests();
}