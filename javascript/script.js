const commentSection = document.getElementById('commentSection');
let commentForm = document.getElementById('commentForm');
let comment = document.getElementById('comment');

comment.addEventListener('keydown', function (e) {
    let key = e.which || e.onkeydown.arguments[0].keyCode;
    if (key === 13 && !e.shiftKey) {
        commentForm.requestSubmit();
    }
})

commentForm.onsubmit = ((e) => {
    e.preventDefault();
    let name = document.getElementById('name').value;
    if ( !checkname(name.trim()) ) {
        alert('Это имя уже занято!')
        return;
    }
    let dateInput = document.getElementById('date');
    let date = dateInput.value ? new Date(dateInput.value) : new Date();
    let dateString = formatDate(date);
    let commentHTML = document.createElement('div');
    commentHTML.classList.add("new_comment");
    commentHTML.innerHTML = createElem(name, comment.value, dateString);
    commentSection.prepend(commentHTML);
    commentForm.reset();
});

function checkname(nm) {
    let names_div = commentSection.children;
    for (let i of names_div) {
        if (i.firstElementChild.innerHTML == `Имя: ${nm}`)
            return false;
    }
    return true;
}

function createElem(name, comment, date) {
    return `
        <h4>Имя: ${name}</h4>
        <p style="width: 100%; word-wrap: break-word">Комментарий: ${comment}</p>
        <div class="comment-date">Дата: ${date}
            <div style="display: flex">
                <a href="#" onclick="add_like(this)" style="width:20px; height:20px">
                    <img src="icons/like_0.svg">
                </a> 
                <a href='#' onclick="del(this.parentElement)" style="width:20px; height:20px; margin-left: 20px">
                    <img src="icons/trash.png" style="width:20px; height:20px">
                </a>
            </div>
        </div>
    `;
}

function add_like(e) {
    e.children[0].src.includes('icons/like_0.svg') ? e.children[0].src = 'icons/like_1.svg' : e.children[0].src = 'icons/like_0.svg';
}

function del(e) {
    e.parentElement.parentElement.remove();
}

function formatDate(date) {
    let today = new Date();
    let hours = today.getHours();
    let minutes = today.getMinutes();
    let yesterday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1, hours, minutes);
    let dateToFormat = new Date(date);
    dateToFormat.setHours(hours);
    dateToFormat.setMinutes(minutes);

    if (dateToFormat.toDateString() === today.toDateString()) {
        return 'Сегодня ' + hours + ':' + (minutes > 9 ? minutes : '0' + minutes);
    }
    else if (dateToFormat.toDateString() === yesterday.toDateString()) {
        return 'Вчера ' + hours + ':' + (minutes > 9 ? minutes : '0' + minutes);
    }
    else {
        let options = { year: 'numeric', month: 'long', day: 'numeric'};
        return dateToFormat.toLocaleDateString('ru-RU', options) + ' ' + hours + ':' + (minutes > 9 ? minutes : '0' + minutes);
    }
}

function reverse(e) {
    if (e.text.includes('старых'))
        e.text = 'От новых к старым';
    else
        e.text = 'От старых к новым';
    let links = document.getElementById('commentSection').children;
    let links1 = [];
    for (let i = links.length - 1; i > -1; i--) {
        let x = document.createElement('div');
        x = links[i]
        links1.push(x);
    }
    let i = 0;
    while(links.length > 0) {
        links[i].remove();
    }
    for(i = 0; i < links1.length; i++)
        commentSection.append(links1[i]);
}
