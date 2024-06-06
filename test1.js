const fs = require('fs');
const { JSDOM } = require('jsdom');

// Đọc nội dung từ file output.html
const htmlContent = fs.readFileSync('output.html', 'utf8');

// Phân tích cú pháp tệp HTML bằng jsdom
const dom = new JSDOM(htmlContent);
const document = dom.window.document;
const NodeFilter = dom.window.NodeFilter;

// Hàm gọi API dịch
async function translateText(text, from, to) {
    try {
        const response = await fetch(`https://t.song.work/api?text=${encodeURIComponent(text)}&from=${from}&to=${to}`);
        const data = await response.json();
        console.log(data)
        return data.result; // Giả sử rằng API trả về kết quả dịch trong thuộc tính 'result'
    } catch (error) {
        console.error('Error during translation:', error);
        return ''; // Trả về một giá trị mặc định hoặc xử lý lỗi theo cách khác
    }
}

(async () => {
    // Duyệt qua nội dung của thẻ body và dịch các văn bản bên trong
    const body = document.querySelector('body');
    const textNodes = [];

    // Sử dụng TreeWalker để thu thập tất cả các text node cần dịch
    const walker = document.createTreeWalker(body, NodeFilter.SHOW_TEXT, {
        acceptNode: function(node) {
            if (node.nodeValue.trim()) {
                return NodeFilter.FILTER_ACCEPT;
            }
            return NodeFilter.FILTER_REJECT;
        }
    });

    while (walker.nextNode()) {
        textNodes.push(walker.currentNode);
    }

    // Dịch tất cả các text node song song
    const translations = await Promise.all(
        textNodes.map(node => translateText(node.nodeValue.trim(), 'en', 'vi')) // Thay đổi 'en' và 'zh-CN' theo yêu cầu của bạn
    );

    // Gán lại các văn bản đã dịch vào các text node tương ứng
    textNodes.forEach((node, index) => {
        node.nodeValue = translations[index];
    });

    // Lưu kết quả vào file translateOutput.html
    const translatedHTML = dom.serialize();
    fs.writeFileSync('translateOutput.html', translatedHTML);

    console.log('Translation complete. Translated HTML saved to translateOutput.html');
})();
