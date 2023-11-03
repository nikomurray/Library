const form = document.getElementById("form");
const formContainer = document.getElementById("formContainer");
const addBookBtn = document.getElementById("addBookBtn");
const closeFormBtn = document.getElementById("closeFormBtn");

//Display and hide form
addBookBtn.onclick = () => {
  formContainer.classList.add("active");
};
closeFormBtn.onclick = () => {
  formContainer.classList.remove("active");
  form.reset();
};

//Constructor
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

function toggleRead(index) {
  library[index].toggleRead();
  render();
}

let library = [];

function addBookToLibrary() {
  let title = document.getElementById("titleInput").value;
  let author = document.getElementById("authorInput").value;
  let pages = document.getElementById("pagesInput").value;
  let read = document.getElementById("readInput").checked;

  let newBook = new Book(title, author, pages, read);
  library.push(newBook);
}

function render() {
  let libraryEl = document.getElementById("libraryField");
  libraryEl.innerHTML = "";
  for (let i = 0; i < library.length; i++) {
    let bookEl = document.createElement("div");
    bookEl.innerHTML = `<div class="book">
        <p>${library[i].title}</p>
        <p>By</p>
        <p>${library[i].author}</p>
        <p>${library[i].pages} Pages</p>
        <button class="read-btn" id="readBtn" onclick="toggleRead(${i})">${
      library[i].read ? "read" : "Not read"
    }</button>
        <button class="remove-book-btn" id="removeBookBtn" onclick="removeBook(${i})">Remove</button>
    </div>`;
    libraryEl.appendChild(bookEl);
  }
}

function removeBook(index) {
  library.splice(index, 1);
  render();
}

form.addEventListener("submit", () => {
  event.preventDefault();
  addBookToLibrary();
  render();
  formContainer.classList.remove("active");
  form.reset();
});
