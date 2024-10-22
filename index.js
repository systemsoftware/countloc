// Usage: node count.js <directory> [minLineLength]

const fs = require('fs').promises;
const path = require('path');

async function countLOC(dir, minLineLength = 0, excludeExtensions = [], skipDeps) {
    async function processFile(filePath) {
        const ext = path.extname(filePath).replace('.', '');
        if (excludeExtensions.includes(ext)) return 0;
        const content = await fs.readFile(filePath, 'utf8');
        return content.split('\n').filter(line => line.trim().length > minLineLength).length;
    }

    async function traverseDirectory(currentDir) {
        let total = 0;
        const files = await fs.readdir(currentDir);
        for (const file of files) {
            if (skipDeps && file === 'node_modules') continue;

            const filePath = path.join(currentDir, file);
            const stat = await fs.stat(filePath);
            if (stat.isDirectory()) {
                total += await traverseDirectory(filePath, skipDeps);
            } else {
                total += await processFile(filePath);
            }
        }
        return total;
    }

    return traverseDirectory(dir);
}

async function main() {
    const args = process.argv.slice(2);
    if (args.length < 1) {
        console.error('You need to specify a directory');
        process.exit(1);
    }

    const dir = args[0];
    let minLineLength = 0;
    let excludeExtensions = [];
    let skipDeps = false;

    for (let i = 1; i < args.length; i++) {
        if (args[i] === '--len' || args[i] === '-l') {
            minLineLength = parseInt(args[++i], 10);
        } else if (args[i] === '--exclude' || args[i] === '-e') {
            excludeExtensions = args[++i].split(',');
        } else if (args[i] === '--skip' || args[i] === '-s') {
            skipDeps = true;
        }
    }

    console.log(`Counting lines of code longer than ${minLineLength} in ${dir}, ${skipDeps ? 'skipping' : 'including'} dependencies, and excluding ${excludeExtensions.join(', ') || 'no'} files...`);

    try {
        const count = await countLOC(dir, minLineLength, excludeExtensions, skipDeps);
        console.log(count.toLocaleString());
    } catch (error) {
        console.error('An error occurred:', error.message);
        process.exit(1);
    }
}

main();