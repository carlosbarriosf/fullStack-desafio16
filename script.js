const openModalBtn = document.querySelector('[data-open-modal]');
const closeModalBtn = document.querySelector('[data-close-modal]');
const modal = document.querySelector('[data-modal]');
const errorMessage = modal.querySelector('.modal__error');
const nameInput = document.querySelector('[data-name-input]');
const mailInput = document.querySelector('[data-mail-input]');
const bdayInput = document.querySelector('[data-bday-input]');

openModalBtn.addEventListener('click', () => {
    modal.showModal();
})


closeModalBtn.addEventListener('click', () => {
    errorMessage.style.display = 'none';
    modal.close();
})

const addContactButton = document.querySelector('[data-add-contact]');
const list = document.querySelector('[data-list]');
const itemTemplate = document.querySelector('[data-template]');
let userIdCount = localStorage.getItem('idCount') || 0;
console.log(userIdCount)

class Contact {
    constructor(id, name, mail, bday) {
        this.id = id;
        this.name = name;
        this.mail = mail;
        this.bday = bday;
    }
}



function populateHtml(idInput, nameInput, mailInput, bdayInput) {
    const li = itemTemplate.content.cloneNode(true).children[0];
        const id = li.querySelector('[data-id]');
        id.innerText = idInput;
        const userName = li.querySelector('[data-name]');
        userName.innerText = nameInput;
        const mail = li.querySelector('[data-mail]');
        mail.innerText = mailInput;
        const bday = li.querySelector('[data-bday]');
        bday.innerText = bdayInput;

        const editBtn = li.querySelector('[data-edit]');
        const deleteBtn = li.querySelector('[data-delete]');


        editBtn.addEventListener('click', (e) => {
            const editModal = document.querySelector('[data-modal-edit]');
            const errorMessage = editModal.querySelector('.modal__error');
            editModal.showModal()

            const closeModal = editModal.querySelector('[data-close-modal]');
            closeModal.addEventListener('click', () => {
                errorMessage.style.display = 'none';
                editModal.close();
            })


            const listItemToEdit = e.target.closest('.userList__item');
            console.log(listItemToEdit);

            const userToEditId = listItemToEdit.querySelector('[data-id]').innerText;



            const contacts = JSON.parse(localStorage.getItem('contacts'));

            const userToEdit = contacts.findIndex(contact => contact.id === userToEditId)




            const nameInput = editModal.querySelector('[data-name-input]');
            const mailInput = editModal.querySelector('[data-mail-input]');
            const bdayInput = editModal.querySelector('[data-bday-input]');

            nameInput.value = contacts[userToEdit].name
            mailInput.value = contacts[userToEdit].mail
            bdayInput.value = contacts[userToEdit].bday
            
            const confirmChanges = editModal.querySelector('[data-confirm-changes]');
            confirmChanges.addEventListener('click', () => {
                if(nameInput.value !== "" && mailInput.value !== "" && bdayInput.value !== "") {

                    contacts[userToEdit].name = nameInput.value
                    contacts[userToEdit].mail = mailInput.value
                    contacts[userToEdit].bday = bdayInput.value

                    localStorage.setItem('contacts', JSON.stringify(contacts));

                    editModal.close();
                    location.reload();
                } else {
                    errorMessage.style.display = 'flex';
                }
            })

        })


        deleteBtn.addEventListener('click', () => {
            let savedContacts = JSON.parse(localStorage.getItem('contacts'));
            const indexToRemove = savedContacts.findIndex(contact => contact.id === idInput);
            if(indexToRemove !== -1) {
                savedContacts.splice(indexToRemove, 1);
                localStorage.setItem('contacts', JSON.stringify(savedContacts));
            }
            list.removeChild(li);
            console.log(localStorage.getItem('contacts'))
        })

        list.appendChild(li)
}

const dataContacts = localStorage.getItem('contacts');
console.log(dataContacts)
if(dataContacts) {
    parsedContacts = JSON.parse(dataContacts);
    parsedContacts.forEach(contact => {
        populateHtml(contact.id, contact.name, contact.mail, contact.bday)
    })
}


addContactButton.addEventListener('click', () => {

    if(nameInput.value !== "" && mailInput.value !== "" && bdayInput.value !== "") {
        const newContact = new Contact(userIdCount.toString(), nameInput.value, mailInput.value, bdayInput.value);
        populateHtml(newContact.id, newContact.name, newContact.mail, newContact.bday)
        userIdCount++
        localStorage.setItem('idCount', userIdCount)
    
        nameInput.value = "";
        mailInput.value = "";
        bdayInput.value = "";
    
    
        saveContact(newContact)
        console.log(localStorage.getItem('contacts'))
    
        modal.close();
    } else {
        errorMessage.style.display = 'flex';
    }
})

function saveContact(newContact) {
    const savedContacts = localStorage.getItem('contacts');
    if(savedContacts) {
        let parsedSavedContacts = JSON.parse(savedContacts);
        parsedSavedContacts.push(newContact);
        stringifiedToys = JSON.stringify(parsedSavedContacts);
        localStorage.setItem('contacts', stringifiedToys); 
    } else {
        const firstContact = JSON.stringify([newContact]);
        localStorage.setItem('contacts', firstContact);
    }
}