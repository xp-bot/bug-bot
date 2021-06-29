const fs = require('fs');
const path = require(`path`);

module.exports.fetchFiles = async (targetPath) => {
    const files = await fs.promises.readdir(targetPath);
    const fetchedFiles = [];

    for (const file of files) {
        try {
            const filepath = path.join(targetPath, file);
            const stats = await fs.promises.lstat(filepath);

            if (stats.isFile()) {
                fetchedFiles.push({
                    filepath,
                });
            }

            if (stats.isDirectory()) {
                const childFiles = await fs.promises.readdir(filepath);
                files.push(...childFiles.map((f) => path.join(file, f)));
            }
        } catch (err) {
            console.error(err);
        }
    }

    return fetchedFiles;
};