const addToList = (list: Iterable<unknown> | ArrayLike<unknown>, index: number, element: unknown) => {
    const result = Array.from(list);
    result.splice(index, 0, element);
    return result;
}

export default addToList