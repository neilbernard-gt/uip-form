<?php

namespace Api\Validation;

use Rakit\Validation\Validator;

class PreboardingValidation {
    private $validator;

    public function __construct()
    {
        $this->validator = new Validator(); 
    }

    public function validate($data){
        $rules = [
            'name' => 'required',
            'email_address' => 'required',
            'intern_type' => 'required',
            'phone_number' => 'required',
            'facebook_link' => 'required',
            'course' => 'required',
            'school_name' => 'required',
            'school_contact' => 'required',
            'hours_requirement' => 'required',
            'discord_username' => 'required',
            'orientation_date' => 'required',
            'start_date' => 'required',
            'end_date' => 'required',
        ];

        $validation = $this->validator->make($data, $rules);

        $validation->validate();

        return $validation;
        
    }

}