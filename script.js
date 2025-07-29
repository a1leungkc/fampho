let photoGallery = [];

function uploadPhoto() {
    const fileInput = document.getElementById("photo-input");
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const newPhoto = {
                src: e.target.result,
                id: Date.now()
            };
            photoGallery.push(newPhoto);
            refreshGallery();
            $('#photoModal').modal('hide');
        }
        reader.readAsDataURL(file);
    }
}

function refreshGallery() {
    const galleryDiv = document.getElementById("photo-gallery");
    galleryDiv.innerHTML = '';
    photoGallery.forEach(photo => {
        const card = document.createElement("div");
        card.className = "col-md-4";
        card.innerHTML = `
            <div class="card">
                <img src="${photo.src}" class="card-img-top" alt="Family Photo">
                <div class="card-body">
                    <button class="btn btn-danger" onclick="deletePhoto(${photo.id})">Delete</button>
                </div>
            </div>
        `;
        galleryDiv.appendChild(card);
    });
}

function deletePhoto(id) {
    photoGallery = photoGallery.filter(photo => photo.id !== id);
    refreshGallery();
}

function addPhoto() {
    $('#photoModal').modal('show');
}