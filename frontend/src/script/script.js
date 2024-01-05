const buttonOpenModal = document.getElementById('new-client-button');
const buttonCloseModal = document.getElementById('close-modal')
const modalContainer = document.getElementById('modalContainer');
const form = document.getElementById('data-form');
const clientName = document.getElementById('clientName');
const clientAddress = document.getElementById('clientAddress');
const clientPhoneNumber = document.getElementById('clientPhoneNumber');
const clientEmail = document.getElementById('clientEmail');
const buttonConfirmData = document.getElementById('sendData');
const buttonCancelData = document.getElementById('cancelData');
const loaderTable = document.getElementById('loader');
const filterInput = document.getElementById('filterInput');

let isEditing = false;
let idClientEditing;

async function loadAndDisplayData(filter) {
    if (!filter) {
        showLoaderTable();
    }

    const data = await fetchData();
    if (data) {
        renderTable(data, filter);
    }

    hideLoaderTable();
}

async function postData() {
    try {
        validateForm()
        clearFilter();

        if (isEditing) {
            await editClient();
        } else {
            await createNewClient();
        }

        await loadAndDisplayData();
        closeModal();
        clearFields();
    } catch (error) {
        console.log(error)
        console.error('Erro ao enviar dados:', error.message);
    }
}

async function fetchData() {
    try {
        const response = await fetch('http://localhost:8080/clients');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function createNewClient() {
    try {
        await fetch('http://localhost:8080/clients', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                clientName: clientName.value,
                clientEmail: clientEmail.value,
                clientPhoneNumber: clientPhoneNumber.value,
                clientAddress: clientAddress.value,
            }),
        });

    } catch (error) {
        console.log(error)
        throw error;
    }
}

async function editClient() {
    try {
        await fetch(`http://localhost:8080/clients/${idClientEditing}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                clientName: clientName.value,
                clientEmail: clientEmail.value,
                clientPhoneNumber: clientPhoneNumber.value,
                clientAddress: clientAddress.value,
            }),
        });

        clearIdClient();
        editIsEditing();
    } catch (error) {
        throw error;
    }
}

async function deleteClient(clientId) {
    try {
        await fetch(`http://localhost:8080/clients/${clientId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });
    } catch (error) {
        throw error;
    }
}

function populateFields(item) {
    clientName.value = item.clientName;
    clientEmail.value = item.clientEmail;
    clientPhoneNumber.value = item.clientPhoneNumber;
    clientAddress.value = item.clientAddress;
}

function clearFields() {
    clientName.value = "";
    clientEmail.value = "";
    clientPhoneNumber.value = "";
    clientAddress.value = "";
}

function createButton(iconClassName, buttonClassName, clickHandler) {
    const icon = document.createElement("i");
    icon.className = iconClassName;

    const button = document.createElement("button");
    button.className = buttonClassName;
    button.addEventListener("click", clickHandler);
    button.appendChild(icon);

    return button;
}

function createDeleteButton(item) {
    const deleteButton = createButton("ph ph-trash-simple", "trash-button", () => handleDelete(item));
    return deleteButton;
}

function createEditButton(item) {
    const editButton = createButton("ph ph-pencil", "edit-button", () => handleEdit(item));
    return editButton;
}

function validateForm() {
    validateClientName();
    validateClientAddress();
    validateClientPhoneNumber();
    validateClientEmail();
}

function renderTable(data, filter) {
    const tableBody = document.getElementById('data-table').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';

    data.forEach(item => {
        if (!filter || item.clientName.toLowerCase().includes(filter.toLowerCase())) {
            const row = tableBody.insertRow();

            ['clientName', 'clientEmail', 'clientPhoneNumber', 'clientAddress'].forEach((field, index) => {
                const cell = row.insertCell(index);
                cell.textContent = item[field][0].toUpperCase() + item[field].substring(1).toLowerCase();
            });

            const actionsCell = row.insertCell(4);
            actionsCell.className = "options"
            const deleteButton = createDeleteButton(item);
            actionsCell.appendChild(deleteButton);
            const editButton = createEditButton(item);
            actionsCell.appendChild(editButton);
        }
    });
}

function handleFilterChange() {
    const filterValue = filterInput.value.trim();
    loadAndDisplayData(filterValue);
}

const handleDelete = async (item) => {
    try {
        showLoaderTable();

        await deleteClient(item.id);
        await loadAndDisplayData();
    } catch (error) {
        console.error(error);
    } finally {
        hideLoaderTable();
    }
}

const handleEdit = (item) => {
    idClientEditing = item.id;
    isEditing = true;
    openModal();
    populateFields(item);
}

const editIsEditing = () => {
    isEditing = !isEditing;
}

const clearIdClient = () => {
    idClientEditing = "";
}

const openModal = () => {
    modalContainer.classList.add("active");
    modalContainer.style.display = "flex";
}

const closeModal = () => {
    clearFields();
    modalContainer.classList.remove("active");
    setTimeout(() => {
        modalContainer.style.display = "none";
    }, 200);
}

const cancelData = () => {
    closeModal();
    clearIdClient();
    editIsEditing();
}

const showLoaderTable = () => {
    loaderTable.style.display = "flex";
}

const hideLoaderTable = () => {
    loaderTable.style.display = "none";
}

const clearFilter = () => {
    filterInput.value = ""
}

loadAndDisplayData();

buttonCloseModal.addEventListener("click", closeModal);
buttonOpenModal.addEventListener("click", openModal);
buttonConfirmData.addEventListener("click", postData);
buttonCancelData.addEventListener("click", cancelData);

filterInput.addEventListener('input', handleFilterChange);

