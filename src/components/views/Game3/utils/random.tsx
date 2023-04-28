export function randomRange(min: number, max: number, random = Math.random): number {
    const a = Math.min(min, max);
    const b = Math.max(min, max);

    const v = a + (b - a) * random();

    return v;
}

