let signUp = document.forms.signUp;
let signIn = document.forms.signIn;

// перехід між sign in та sign up 
document.querySelector('.toSignIn').addEventListener('click', () => {
    signUp.style.display = 'none';
    signIn.style.display = 'flex';
});
document.querySelector('.toSignUp').addEventListener('click', () => {
    signUp.style.display = 'flex';
    signIn.style.display = 'none';
});

// зробимо labels меншими при фокусі на інпути
let inputs = document.querySelectorAll('.form-item>input');
let labels = document.getElementsByTagName('label');
for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('focus', () => {
        labels[i].classList.add('labelFocus')
    });
    inputs[i].addEventListener('blur', () => {
        if (inputs[i].value == '') {
            labels[i].classList.remove('labelFocus')
        }
    });
}

// додамо валідацію форми sign up
signUp.firstName.addEventListener('change', () => {
    let regexp = /[A-ZА-Я]{2,}/i;
    if (regexp.test(signUp.firstName.value)) {
        signUp.firstName.parentElement.classList.remove('invalid');
        signUp.firstName.parentElement.classList.add('valid');
    } else {
        signUp.firstName.parentElement.classList.add('invalid');
        signUp.firstName.parentElement.classList.remove('valid');

    }
})
signUp.lastName.addEventListener('change', () => {
    let regexp = /[A-ZА-Я]{2,}/i;
    if (regexp.test(signUp.lastName.value)) {
        signUp.lastName.parentElement.classList.remove('invalid');
        signUp.lastName.parentElement.classList.add('valid');
    } else {
        signUp.lastName.parentElement.classList.add('invalid');
        signUp.lastName.parentElement.classList.remove('valid');

    }
})
signUp.email.addEventListener('change', () => {
    let regexp = /^\w{1,}\.*_*\w{1,}@[a-z]{2,}\.[a-z]{2,4}$/;
    if (regexp.test(signUp.email.value)) {
        signUp.email.parentElement.classList.remove('invalid');
        signUp.email.parentElement.classList.add('valid');
    } else {
        signUp.email.parentElement.classList.add('invalid');
        signUp.email.parentElement.classList.remove('valid');

    }
})
signUp.password.addEventListener('change', () => {
    let regexp = /\w{5,}/;
    if (regexp.test(signUp.password.value)) {
        signUp.password.parentElement.classList.remove('invalid');
        signUp.password.parentElement.classList.add('valid');
    } else {
        signUp.password.parentElement.classList.add('invalid');
        signUp.password.parentElement.classList.remove('valid');

    }
});

// додамо дані з форми в local storage
let users = [];
signUp.signUpbtn.addEventListener('click', () => {
    if (signUp.firstName.value !== '' && signUp.lastName.value !== '' && signUp.email.value !== '' && signUp.password.value !== '' && signUp.firstName.parentElement.classList.contains('valid') && signUp.lastName.parentElement.classList.contains('valid') && signUp.email.parentElement.classList.contains('valid') && signUp.password.parentElement.classList.contains('valid')) {
        if (localStorage.length > 0 && localStorage.getItem('users')) {
            users = JSON.parse(localStorage.getItem('users'));
        }
        if (!users.some(elem => elem.email == signUp.email.value)) {
            users.push({
                firstName: `${signUp.firstName.value}`,
                lastName: `${signUp.lastName.value}`,
                email: `${signUp.email.value}`,
                password: `${signUp.password.value}`
            });
            localStorage.setItem('users', JSON.stringify(users));
            // та очистимо форму signUp
            signUp.reset();
            signUp.email.parentElement.classList.remove('userExists');
            signUp.firstName.parentElement.classList.remove('valid');
            signUp.lastName.parentElement.classList.remove('valid');
            signUp.email.parentElement.classList.remove('valid');
            signUp.password.parentElement.classList.remove('valid');
            signUp.password.parentElement.classList.remove('fill');
            for (let i = 0; i < inputs.length; i++) {
                labels[i].classList.remove('labelFocus')
            }
        } else if (users.some(elem => elem.email == signUp.email.value)) {
            signUp.email.parentElement.classList.add('userExists');
        }
    } else if (signUp.firstName.parentElement.classList.contains('invalid') || signUp.lastName.parentElement.classList.contains('invalid') || signUp.email.parentElement.classList.contains('invalid') || signUp.password.parentElement.classList.contains('invalid')) {
        signUp.password.parentElement.classList.add('fill');
    }
})

// виконуємо sign in
signIn.signInbtn.addEventListener('click', () => {
    users = JSON.parse(localStorage.getItem('users'));
    let num;
    if (users.some(elem => {
            num = users.indexOf(elem)
            return elem.email == signIn.signInemail.value && elem.password == signIn.signInpassword.value;
        })) {
        signIn.style.display = 'none';
        document.querySelector('.profile').style.display = 'flex';

        document.querySelector('.profile-name').textContent = `${users[num].firstName} ${users[num].lastName}`;
        document.querySelector('.profile-email').textContent = signIn.signInemail.value;
        signIn.reset();
        signIn.signInpassword.parentElement.classList.remove('incorrect');
        for (let i = 0; i < inputs.length; i++) {
            labels[i].classList.remove('labelFocus')
        }
    } else {
        signIn.signInpassword.parentElement.classList.add('incorrect');
    }
})
// виконуємо sign out
document.querySelector('.signOutbtn').addEventListener('click', () => {
    document.querySelector('.profile').style.display = 'none';
    signIn.style.display = 'flex';
})