// Helper to map modules to name/path array
export const mapImages = (images) => Object.entries(images).map(([path, module]) => ({
    name: path.split('/').pop().split('.')[0].toLowerCase(),
    path: module.default,
}));

export const loadGameModes = () => {
    const images = import.meta.glob('../assets/images/**/*.{png,jpg,jpeg,svg,webp}', { eager: true });

    console.log('Detected images:', images); // Debugging log

    const gameModes = {};

    for (const path in images) {
        const parts = path.split('/');
        const folder = parts[parts.length - 2]; // Get the folder name

        if (!gameModes[folder]) {
            gameModes[folder] = [];
        }

        gameModes[folder].push({
            name: parts[parts.length - 1].split('.')[0].toLowerCase(), // Image name
            path: images[path].default, // Image path
        });
    }

    console.log('Game modes:', gameModes); // Debugging log
    return gameModes;
};

// Remove all repeats (liriliri -> liri)
const collapseRepeatsAll = (s) => {
    let i = 0, out = '', n = s.length;
    while (i < n) {
        let found = false;
        for (let blkLen = 1; blkLen <= (n - i) / 2; blkLen++) {
            const blk = s.slice(i, i + blkLen);
            let count = 1;
            while (s.slice(i + count * blkLen, i + (count + 1) * blkLen) === blk) count++;
            if (count >= 2) {
                out += blk;
                i += count * blkLen;
                found = true;
                break;
            }
        }
        if (!found) out += s[i++];
    }
    return out;
};

//Process all inputs and image names string to make guessing fair
export const processString = (str) => collapseRepeatsAll(
    str.toLowerCase()
        .replace(/[\s_-]+/g, '') //Removing whitespace including dashes and underscores
        .replace(/(.)\1+/g, '$1') //Removing repeated letters
        .replace(/ck/g, 'k') //Turning ck into k
        .replace(/ss|ß/g, 's') //Turning ss and ß into s
        .replace(/ch|sh/g, 'c') //Replacing ch with c
        .replace(/ph/g, 'f') //Replacing ph with f
        .replace(/ou/u, 'u') //Replacing ph with f
        .replace(/p/g, 'b') //Replacing p with b
        .replace(/z/g, 's') //Replacing z with s
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '') //Removing accents
);


export const getRandomImage = (gameModes, mode) => {
    if (!gameModes[mode] || gameModes[mode].length === 0) {
        console.error(`No images found for mode: ${mode}`);
        return null;
    }

    const randomIndex = Math.floor(Math.random() * gameModes[mode].length);
    const randomImage = gameModes[mode][randomIndex];

    console.log(`Selected random image:`, randomImage); // Debugging log
    return randomImage;
};