export function hasDiscriminator(data, disc) {
    if (data.length < disc.length)
        return false;
    for (let i = 0; i < disc.length; i++) {
        if (data[i] !== disc[i])
            return false;
    }
    return true;
}
