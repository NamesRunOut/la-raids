const addGroup = (elements: {}, setElements: (arg0: any) => void) => {
    let lastGroupCount = Object.keys(elements).length
    setElements({
        ...elements,
        [`Group${lastGroupCount}`]: []
    })
}

export default addGroup