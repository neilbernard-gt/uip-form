document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("preboarding_form");
    const modal = document.getElementById("confirmation-modal");
    const content = document.querySelector(".w-full.min-h-screen");
    const footer = document.querySelector("footer");
    const closeModal = document.getElementById("modal-close");
    const applicationIdElement = document.getElementById("application-id");

    closeModal.addEventListener("click", function () {
        modal.classList.add("hidden");
        content.classList.remove("blur");
        footer.classList.remove("blur");
        form.reset(); // Optional: Reset form fields after closing modal
    });

    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.classList.add("hidden");
            content.classList.remove("blur");
            footer.classList.remove("blur");
        }
    });

    // Validation function
    function validateForm() {
        let valid = true;

        const inputs = form.querySelectorAll("input[required]");
        inputs.forEach((input) => {
            if (!input.value.trim()) {
                showError(input.name, "This field is required");
                valid = false;
            } else {
                clearError(input.name);
            }
        });

        const email = form.querySelector('input[name="email"]');
        if (email && !email.validity.valid) {
            showError("email", "Please enter a valid email address");
            valid = false;
        } else {
            clearError("email");
        }

        const phonePattern = /^[+]?\d{7,15}$/;
        const phone = form.querySelector('input[name="phone"]');

        if (phone && !phonePattern.test(phone.value.replace(/\s+/g, "").replace(/-/g, ""))) {
            showError("phone", "Please enter a valid phone number.");
            valid = false;
        } else {
            clearError("phone");
        }

        return valid;
    }

    // Function to show error messages
    function showError(fieldName, message) {
        const field = form.querySelector(`[name="${fieldName}"]`);
        if (!field) return;

        let container = field.parentElement;
        let errorSpan = container.querySelector(".error-message");
        if (!errorSpan) {
            errorSpan = document.createElement("span");
            errorSpan.classList.add("error-message", "text-red-500", "text-sm");
            container.appendChild(errorSpan);
        }
        errorSpan.textContent = message;
        field.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    // Function to clear error messages
    function clearError(fieldName) {
        const field = form.querySelector(`[name="${fieldName}"]`);
        if (field) {
            const errorSpan = field.parentElement.querySelector(".error-message");
            if (errorSpan) {
                errorSpan.remove();
            }
        }
    }

    // Submit form function
    function submitForm() {
        let name = document.getElementById("name_input").value;
        let email_address = document.getElementById("email_address").value;
        let intern_type = document.getElementById("intern_type").value;
        let phone_number = document.getElementById("phone_number").value;
        let facebook_link = document.getElementById("facebook_link").value;
        let course = document.getElementById("course").value;
        let school_name = document.getElementById("school_name").value;
        let school_contact = document.getElementById("school_contact").value;
        let hours_requirement = document.getElementById("hours_requirement").value;
        let discord_username = document.getElementById("discord_username").value;
        let orientation_date = document.getElementById("orientation_date").value;
        let start_date = document.getElementById("start_date").value;
        let end_date = document.getElementById("end_date").value;

        if (typeof jQuery === 'undefined') {
            console.error('jQuery not loaded');
        } else {
            $.ajax({
                url: './api/preboarding.php',
                type: 'POST',
                data: {
                    'name': name,
                    'email_address': email_address,
                    'intern_type': intern_type,
                    'phone_number': phone_number,
                    'facebook_link': facebook_link,
                    'course': course,
                    'school_name': school_name,
                    'school_contact': school_contact,
                    'hours_requirement': hours_requirement,
                    'discord_username': discord_username,
                    'orientation_date': orientation_date,
                    'start_date': start_date,
                    'end_date': end_date,
                },
                success: function (response) {
                    modal.classList.remove("hidden");
                    content.classList.add("blur");
                    footer.classList.add("blur");
                    applicationIdElement.textContent = response.app_id;
                },
                error: function (code, status, error) {
                    if (code.status == 422) {
                        let error_array = JSON.parse(code.responseText);

                        if (error_array.errors) {
                            console.log('Validation Error');
                        } else if (error_array.database_error) {
                            console.log('Database Error');
                        } else {
                            console.log(error);
                        }
                    } else {
                        console.log(error);
                    }
                }
            });
        }
    }

    // Form submission event listener
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission

        if (validateForm()) {
            submitForm(); // If validation passes, submit form via AJAX
        }
    });
});
