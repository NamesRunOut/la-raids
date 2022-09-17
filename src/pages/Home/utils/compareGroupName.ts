const compareGroupName = (a: any, b: any) => {
    let n1 = parseInt(a[0].slice(5))
    let n2 = parseInt(b[0].slice(5))
    if (n1 < n2)
        return -1
    if (n1 > n2)
        return 1
    return 0
}

export default compareGroupName