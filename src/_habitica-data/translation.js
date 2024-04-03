const fs = require('fs');

const questsContentPath = './locales/en/questsContent.json';
const questsContentData = JSON.parse(fs.readFileSync(questsContentPath, 'utf8'));

const contentPath = './locales/en/content.json';
const contentData = JSON.parse(fs.readFileSync(contentPath, 'utf8'));

function t(key) {
  return questsContentData[key] || contentData[key];
}

module.exports = { t };
