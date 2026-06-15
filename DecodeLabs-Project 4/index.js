document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('gatekeeperForm');
    const successBuffer = document.getElementById('successBuffer');
    const themeToggle = document.getElementById('themeToggle');
    const passwordToggle = document.getElementById('passwordToggle');
    const passwordInput = document.getElementById('password');

    //  Theme toggle mechanics
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            
            if (document.body.classList.contains('dark-mode')) {
                themeToggle.textContent = 'Light Mode';
            } else {
                themeToggle.textContent = 'Dark Mode';
            }
        });
    }

    //  Password show/hide mechanics
    if (passwordToggle && passwordInput) {
        passwordToggle.addEventListener('click', (event) => {
            event.preventDefault();
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                passwordToggle.textContent = 'Hide';
            } else {
                passwordInput.type = 'password';
                passwordToggle.textContent = 'Show';
            }
        });
    }

    // Form validation rules
    const fields = {
        name: {
            input: document.getElementById('fullName'),
            error: document.getElementById('nameError'),
            validate: (value) => value.trim().length >= 3 ? '' : 'Name must be at least 3 characters long.'
        },
        email: {
            input: document.getElementById('email'),
            error: document.getElementById('emailError'),
            validate: (value) => {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!value.trim()) return 'System email footprint is required.';
                return emailRegex.test(value) ? '' : 'Please enter a valid format.';
            }
        },
        password: {
            input: passwordInput,
            error: document.getElementById('passwordError'),
            validate: (value) => {
                const hasUpper = /[A-Z]/.test(value);
                const hasLower = /[a-z]/.test(value);
                const hasDigit = /[0-9]/.test(value);
                const hasSymbol = /[#?!@$%^&*-]/.test(value);
                const isLongEnough = value.length >= 8;

                if (!isLongEnough) return 'Key must be at least 8 characters long.';
                if (!hasUpper) return 'Key requires at least one uppercase letter.';
                if (!hasLower) return 'Key requires at least one lowercase letter.';
                if (!hasDigit) return 'Key requires at least one numeric digit.';
                if (!hasSymbol) return 'Key requires a special symbol.';
                return '';
            }
        }
    };

    function checkField(fieldKey) {
        const field = fields[fieldKey];
        if (!field || !field.input || !field.error) return true;
        
        const value = field.input.value;
        const errorMessage = field.validate(value);

        if (errorMessage) {
            field.input.classList.add('invalid-boundary');
            field.error.textContent = errorMessage;
            return false;
        } else {
            field.input.classList.remove('invalid-boundary');
            field.error.textContent = '';
            return true;
        }
    }

    Object.keys(fields).forEach((key) => {
        if (fields[key].input) {
            fields[key].input.addEventListener('blur', () => {
                checkField(key);
            });
        }
    });

    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            let isPayloadValid = true;

            Object.keys(fields).forEach((key) => {
                const isValid = checkField(key);
                if (!isValid) {
                    isPayloadValid = false;
                }
            });

            if (isPayloadValid) {
                if (successBuffer) {
                    successBuffer.textContent = "✔ ACCESS GRANTED. USER AUTHORIZED.";
                    successBuffer.style.display = "block";
                }
                form.reset();
            } else {
                if (successBuffer) {
                    successBuffer.style.display = "none";
                    successBuffer.textContent = "";
                }
            }
        });
    }
});