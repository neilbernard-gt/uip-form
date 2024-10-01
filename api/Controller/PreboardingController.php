<?php

namespace API\Controller;

use API\Model\PreboardingAttendance;
use Exception;

class PreboardingController {

    private $app_id;

    public function store ($data) {

        try {

        $preboarding_creation = PreboardingAttendance::create([
            'name' => $data['name'],
            'email_address' => $data['email_address'],
            'intern_type' => $data['intern_type'],
            'phone_number' => $data['phone_number'],
            'facebook_link' => $data['facebook_link'],
            'course' => $data['course'],
            'school_name' => $data['school_name'],
            'school_contact' => $data['school_contact'],
            'hours_requirement' => $data['hours_requirement'],
            'discord_username' => $data['discord_username'],
            'orientation_date' => $data['orientation_date'],
            'start_date' => $data['start_date'],
            'end_date' => $data['end_date'],
            'status' => 'Pending',
        ]);

        $id = $preboarding_creation->app_id;

        $this->app_id = $id;

        $insertion_status = true;
        return $insertion_status;
        // Since Eloquent is implemented as a standalone, failing the insertion does not cause an error code, therefore,
        // a try and catch with a custom variable will be implemented to force an error code when checked on preboarding.php
        } catch (Exception $e) {
            $insertion_status = false;
            return $insertion_status;
        }

    }

    public function get_appid () {
        return $this->app_id;
    }
}