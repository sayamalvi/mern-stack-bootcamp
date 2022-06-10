const buttons = document.querySelectorAll('.drum');
buttons.forEach(button => {
    button.addEventListener('click', () => {
        alert('click');
    });
});

