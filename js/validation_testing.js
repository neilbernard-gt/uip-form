form = document.getElementById('preboarding_form');

form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission


        testValidation();
})

function testValidation() {
    let name = 'Name Input';
    let email_address = 'Email Address';
    let intern_type = 'Intern Type';
    let phone_number = '09938173824';
    let facebook_link = 'facebooklink.com';
    let course = 'School Course';
    let school_name = 'School Name';
    let school_contact = 'School Contact';
    let hours_requirement = 'Hours Requirement';
    let discord_username = 'Discord Username';
    let orientation_date = '2024-08-15';
    let start_date = '2024-08-16';
    let end_date = '2024-10-25';

    if (typeof jQuery === 'undefined') {
        console.error('jQuery not loaded');
    } else {
        $.ajax({
            url: './api/preboarding.php',
            type: 'POST',
            data: {
                'name': null,
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
                console.log(response);
                console.log(response.app_id)
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