const createNode = (element, ...classes) => {
    const node = document.createElement(element);
    if (classes !== undefined) {
      node.classList.add(...classes);
    }
    return node;
};

const shuffle = (array) => {
    let currentIndex = array.length,  randomIndex;
  
    while (currentIndex != 0) {
  
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}

export {
    createNode,
    shuffle
}