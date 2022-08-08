const removeFromList = (list: ArrayLike<unknown> | Iterable<unknown>, index: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(index, 1);
    return [removed, result];
}

export default removeFromList