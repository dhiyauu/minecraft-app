const API_BASE = '/api';
console.log("API_BASE:", API_BASE);

function loadData() {
    fetch(`${API_BASE}/info`)
        .then(res => res.json())
        .then(data => {
            document.getElementById('katalog-name').innerText = data.judul_katalog;

            document.getElementById('nama-owner').innerText = data.pemilik;
            document.getElementById('nim-owner').innerText = data.nim;

            const list = document.getElementById('item-list');
            list.innerHTML = '';

            data.items.forEach(item => {
                let div = document.createElement('div');
                div.className = "item-box";
                div.innerText = item;
                list.appendChild(div);
            });
        });
}

function tambahItem() {
    const input = document.getElementById('item-input');

    fetch(`${API_BASE}/add-item`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ item: input.value })
    })
    .then(res => res.json())
    .then(() => {
        input.value = '';
        loadData();
    });
}

loadData();