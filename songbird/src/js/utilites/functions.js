const createNode = (element, ...classes) => {
    const node = document.createElement(element);
    if (classes !== undefined) {
      node.classList.add(...classes);
    }
    return node;
};

const shuffle = (arr) => {
	var j, temp;
	for(var i = arr.length - 1; i > 0; i--){
		j = Math.floor(Math.random()*(i + 1));
		temp = arr[j];
		arr[j] = arr[i];
		arr[i] = temp;
	}
	return arr;
}

const getRandomArrayElement = (arr) => {
  return arr[Math.floor(Math.random()*arr.length)];
}

const getArrayElementById = (arr, id) => {
  return arr.find(item => item.id == id);
}

export {
    createNode,
    shuffle,
    getRandomArrayElement,
    getArrayElementById
}