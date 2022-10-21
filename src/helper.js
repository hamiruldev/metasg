export const serverPlayerOnly = (server, localId) => {
    return server && server?.filter((item) => item?.id !== localId)
}

export const randomIntFromInterval = (min, max) => {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export const randomSpherePoint = (x0, y0, z0, radius) => {
    var u = Math.random()
    var v = Math.random()
    var theta = 2 * Math.PI * u
    var phi = Math.acos(2 * v - 1)
    var x = x0 + radius * Math.sin(phi) * Math.cos(theta)
    var y = y0 + radius * Math.sin(phi) * Math.sin(theta)
    var z = z0 + radius * Math.cos(phi)
    return [x, y, z]
}

export const textLimit = (str, length) => {
    if (str?.length > length) return (str = str?.substring(0, length) + '...')
}

export const randomString = (Math.random() + 1).toString(36).substring(7)
