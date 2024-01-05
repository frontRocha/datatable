function validateClientName() {
    const nameValue = clientName.value.trim();
    if (nameValue.length === 0) {
        throw new Error('Por favor, insira um nome válido.');
    }
}

function validateClientAddress() {
    const addressValue = clientAddress.value.trim();
    if (addressValue.length === 0) {
        throw new Error('Por favor, insira um endereço válido.');
    }
}

function validateClientPhoneNumber() {
    const phoneNumberValue = clientPhoneNumber.value.replace(/\D/g, '');
    if (phoneNumberValue.length !== 11) {
        throw new Error('Por favor, insira um número de telefone válido (11 números).');
    }
}

function validateClientEmail() {
    const emailValue = clientEmail.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailValue)) {
        throw new Error('Por favor, insira um endereço de e-mail válido.');
    }
}