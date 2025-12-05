// Markdown to HTML converter
// Supports: headers, bold, italic, unordered lists

function md2html(markdown) {
    let lines = markdown.split('\n');
    let html = '';
    let inList = false;
    let pendingParagraph = '';

    // Helper function to process inline elements (bold, italic)
    function processInline(text) {
        // Process bold first: **text** or __text__
        text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        text = text.replace(/__(.*?)__/g, '<strong>$1</strong>');

        // Process italic: *text* or _text_ (avoiding list markers)
        // Use negative lookbehind to avoid matching list markers like * item or - item
        text = text.replace(/(?<!^[\*\-]\s)\*(.+?)\*(?!\s*[\*\-])/g, '<em>$1</em>');
        text = text.replace(/(?<!^[\*\-]\s)_(.+?)_(?!\s*[\*\-])/g, '<em>$1</em>');

        return text;
    }

    // Helper function to flush pending paragraph
    function flushParagraph() {
        if (pendingParagraph.trim()) {
            html += `<p>${processInline(pendingParagraph.trim())}</p>\n`;
            pendingParagraph = '';
        }
    }

    lines.forEach(line => {
        let trimmedLine = line.trim();

        // Skip empty lines
        if (!trimmedLine) {
            flushParagraph();
            if (inList) {
                html += '</ul>\n';
                inList = false;
            }
            return;
        }

        // Check for headers (1-6 # followed by space)
        const headerMatch = trimmedLine.match(/^(#{1,6})\s(.+)$/);
        if (headerMatch) {
            flushParagraph();
            if (inList) {
                html += '</ul>\n';
                inList = false;
            }
            const level = headerMatch[1].length;
            html += `<h${level}>${processInline(headerMatch[2])}</h${level}>\n`;
            return;
        }

        // Check for unordered list items (- or * followed by space)
        const listMatch = trimmedLine.match(/^[\*\-]\s(.+)$/);
        if (listMatch) {
            flushParagraph();
            if (!inList) {
                html += '<ul>\n';
                inList = true;
            }
            html += `<li>${processInline(listMatch[1])}</li>\n`;
            return;
        }

        // If not header or list, add to pending paragraph
        pendingParagraph += (pendingParagraph ? ' ' : '') + line;
    });

    // Flush any remaining paragraph or list
    flushParagraph();
    if (inList) {
        html += '</ul>\n';
    }

    return html.trim();
}

// Export for use in other files
module.exports = md2html;