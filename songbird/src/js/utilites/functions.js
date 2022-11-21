const createNode = (element, ...classes) => {
    const node = document.createElement(element);
    if (classes !== undefined) {
        node.classList.add(...classes);
    }
    return node;
};

const shuffle = (arr) => {
    var j, temp;
    for(var i = arr.length - 1; i > 0; i--) {
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

//Clean #text from Node
const clean = (node) => {
  for(let n = 0; n < node.childNodes.length; n++) {
    const child = node.childNodes[n];
    if (child.nodeType === 8 || (child.nodeType === 3 && !/\S/.test(child.nodeValue))) {
      node.removeChild(child);
      n --;
    } else if(child.nodeType === 1) {
        clean(child);
    }
  }
}

const formatTime = (seconds) => {
    const min = Math.floor((seconds / 60));
    let sec = Math.floor(seconds - (min * 60));
    if (sec < 10){ 
        sec  = `0${sec}`;
    };
    return `${min}:${sec}`;
};

export {
    createNode,
    shuffle,
    getRandomArrayElement,
    getArrayElementById,
    clean,
    formatTime
}