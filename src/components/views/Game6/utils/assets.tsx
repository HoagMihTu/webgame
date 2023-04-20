import { Assets, ResolverManifest } from 'pixi.js';

const file_path = "game6"

let assetsManifest: ResolverManifest = { bundles: [] };

const loadedBundles: string[] = [];

function checkBundleExists(bundle: string) {
    return !!assetsManifest.bundles.find((b) => b.name === bundle);
}

export async function loadBundles(bundles: string | string[]) {
    if (typeof bundles === 'string') bundles = [bundles];

    for (const bundle of bundles) {
        if (!checkBundleExists(bundle)) {
            throw new Error(`[Assets] Invalid bundle: ${bundle}`);
        }
    }

    const loadList = bundles.filter((bundle) => !loadedBundles.includes(bundle));

    if (!loadList.length) return;

    await Assets.loadBundle(loadList);

    loadedBundles.push(...loadList);
}

export function areBundlesLoaded(bundles: string[]) {
    for (const name of bundles) {
        if (!loadedBundles.includes(name)) {
            return false;
        }
    }
    return true;
}

async function fetchAssetsManifest(url: string) {
    const response = await fetch(url);
    const manifest = await response.json();
    if (!manifest.bundles) {
        throw new Error('[Assets] Invalid assets manifest');
    }
    return manifest;
}

export async function initAssets() {
    // assetsManifest = await fetchAssetsManifest(`${file_path}/assets-manifest.json`);

    // await Assets.init({ manifest: assetsManifest});

}
