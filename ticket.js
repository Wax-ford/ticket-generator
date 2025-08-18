const form = document.getElementById("ticket-form");

const dropArea = document.getElementById("drop-area");
const fileInput = document.getElementById("file-input");
const uploadedImage = document.getElementById("uploaded-image");
const messageAction = document.getElementById("message-action");
const fileActions = document.getElementById("file-actions");
const removeImage = document.getElementById("remove-image");
const changeImage = document.getElementById("change-image");
const uploadHint = document.getElementById("upload-hint");

const textInputs = document.querySelectorAll('.required')

const formData ={
    image: '',
    name: '',
    email: '',
    githubUsername: ''
}

function validateTextInputs() {
    let isValid = true

    textInputs.forEach(input => {
        const hint = input.nextElementSibling
        if(input.value.trim() === '') {
            input.classList.add('error')
            hint.classList.add('error')
            isValid = false
        }else {
            input.classList.remove('error')
            hint.classList.remove('error')
        }
    })
    return isValid
}

function validateFile(fileInput, hint) {
    const file = fileInput.files[0];
    let isValid = true; 

    if(!file) {
        hint.classList.add('error')
        hint.innerHTML = "<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='#f57261' stroke='#f57261' stroke-linecap='round' stroke-linejoin='round'><path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z'/></svg> Please upload an image.";
        hint.style.display = 'block'
        isValid = false;
    } else {
        const validTypes = ['image/jpeg', 'image/png']
        const maxSize = 500 * 1024
        
        if(!validTypes.includes(file.type)) {
            hint.classList.add('error')
            hint.innerHTML = "<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='#f57261' stroke='#f57261' stroke-linecap='round' stroke-linejoin='round'><path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z'/></svg> Invalid file type, upload a JPG or PNG photo.";
            fileInput.value = ''
            hint.style.display = 'block'
            isValid = false
        } else if(file.size > maxSize) {
            hint.classList.add('error')
            hint.innerHTML = "<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='#f57261' stroke='#f57261' stroke-linecap='round' stroke-linejoin='round'><path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z'/></svg> File too large, please upload a photo smaller than 500KB.";
            fileInput.value = ''
            hint.style.display = 'block'
            isValid = false
        } else {
            hint.classList.remove('error')
            hint.style.display = 'none'
            displayUploadedImage(file)
        }
    }
    return isValid
}

function displayUploadedImage(file) {
    const reader = new FileReader()

    reader.onload = e => {
        uploadedImage.src = e.target.result
        uploadedImage.style.display = '';
        fileActions.classList.add('show')
        messageAction.classList.add('hide')
    }

    reader.readAsDataURL(file)
}

function requestUpload() {
    const defaultUploadIcon = './assets/images/icon-upload.svg'; 
    fileInput.value = '';
    uploadedImage.src = defaultUploadIcon; 
    uploadedImage.style.display = ''; 
    messageAction.classList.remove('hide');
    fileActions.classList.remove('show');
    uploadHint.classList.remove('error');
    uploadHint.style.display = 'none';
}

function storeAndDisplayFormData() {
    formData.image = uploadedImage.src
    formData.name = document.getElementById("full-namme").value.trim()
    formData.email = document.getElementById("email").value.trim()
    formData.githubUsername = document.getElementById("github").value.trim()

    document.getElementById("header-name").textContent = formData.name
    document.getElementById("display-name").textContent = formData.name
    document.getElementById("display-email").textContent = formData.email
    document.getElementById("display-github").textContent = formData.githubUsername
    document.getElementById("display-image").src = formData.image
}

dropArea.addEventListener('click', () => {
    fileInput.click();
})

dropArea.addEventListener('dragover', (e) => {
    e.preventDefault();
})

dropArea.addEventListener('drop', (e) => {
    e.preventDefault();

    const files = e.dataTransfer.files;
    if(files.length > 0) {
        fileInput.files = files 
        validateFile(fileInput, uploadHint)
    }
})

fileInput.addEventListener('change', () => {
    validateFile(fileInput, uploadHint)
})

removeImage.addEventListener('click', (e) => {
    e.stopPropagation()
    requestUpload()
})

changeImage.addEventListener('click', (e) => {
    e.preventDefault()
    e.stopPropagation()
    fileInput.click()
})

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const isTextValid = validateTextInputs()
    const isFileValid = validateFile(fileInput, uploadHint)

    if(isTextValid && isFileValid) {
        storeAndDisplayFormData()

        document.getElementById("form-content").classList.add('hide')
        document.getElementById("display-data").style.display = 'block'
    }
})

window.addEventListener('DOMContentLoaded', () => {
    
    form.reset();
    
    requestUpload();

    document.getElementById("display-data").style.display = 'none';

    document.getElementById("form-content").classList.remove('hide');
});

import confetti from "https://cdn.skypack.dev/canvas-confetti";

document.getElementById("generate-ticket").addEventListener("click", () => {
  setTimeout(() => {
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 }
    });
  }, 300); 
});


dropArea.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropArea.classList.add("dragover");
});


dropArea.addEventListener("dragleave", () => {
  dropArea.classList.remove("dragover");
});


dropArea.addEventListener("drop", (e) => {
  e.preventDefault();
  dropArea.classList.remove("dragover"); 

  const files = e.dataTransfer.files;
  if (files.length > 0) {
    fileInput.files = files;
    validateFile(fileInput, uploadHint);
  }
});

