const BASE_URL = "https://uukanshu.cc";

module.exports = {
    baseUrl: BASE_URL,

    async search(keyword) {
        const url = `${BASE_URL}/search/?q=${encodeURIComponent(keyword)}`;
        const res = await fetch(url);
        const html = await res.text();

        const books = [];
        const regex = /<a href="(\/book\/.*?)".*?title="(.*?)"/g;

        let match;
        while ((match = regex.exec(html)) !== null) {
            books.push({
                name: match[2],
                url: BASE_URL + match[1]
            });
        }

        return books;
    },

    async detail(url) {
        const res = await fetch(url);
        const html = await res.text();

        const chapters = [];
        const regex = /<a href="(\/book\/.*?html)">(.*?)<\/a>/g;

        let match;
        while ((match = regex.exec(html)) !== null) {
            chapters.push({
                name: match[2],
                url: BASE_URL + match[1]
            });
        }

        return {
            chapters
        };
    },

    async chapter(url) {
        const res = await fetch(url);
        const html = await res.text();

        const content = html.match(/<div id="content">(.*?)<\/div>/s);

        return content ? content[1] : "Không lấy được nội dung";
    }
};
