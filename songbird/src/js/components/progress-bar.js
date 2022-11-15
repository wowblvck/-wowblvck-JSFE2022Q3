export const progressBar = () => {
    const playerBar = document.querySelector('.player-control__bar');
    playerBar.style.setProperty('--value', playerBar.value);
    playerBar.style.setProperty('--min', playerBar.min == '' ? '0': playerBar.min);
    playerBar.style.setProperty('--max', playerBar.max == '' ? '100' : playerBar.max);
    playerBar.addEventListener('input', () => playerBar.style.setProperty('--value', playerBar.value));
};