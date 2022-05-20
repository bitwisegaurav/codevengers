document.getElementById('hamburger').addEventListener("click", event => {

    if (document.getElementById('hamburger').classList.contains('activebtn')) {
        document.getElementById('hamburger').classList.remove('activebtn');
        document.querySelector('aside').style.display = "none";
    }
    else {
        document.getElementById('hamburger').classList.add('activebtn');
        document.querySelector('aside').style.display = "block";
    }
});

let topic = document.querySelectorAll('.topic');

for (let i = 0; i < topic.length; i++) {
    topic[i].onclick = function () {
        let j = 0;
        while (j < topic.length) {
            topic[j++].classList.remove('activetop');
        }
        topic[i].classList.add("activetop");
    }  
}