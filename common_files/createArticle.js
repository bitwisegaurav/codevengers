// const editor = new FroalaEditor('#editor')
const quill = new Quill('#editor', {
    theme: 'snow'
  });
const button = document.querySelector('button')

button.addEventListener('click', () => {
    const content = quill.root.innerHTML;
    console.log(content);
    console.log(quill);
})