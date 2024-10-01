<?php

require "../vendor/autoload.php";
use API\Validation\PreboardingValidation;
use API\Model\PreboardingAttendance;
use API\Connection\DatabaseConnection;
use API\Controller\PreboardingController;



if ($_SERVER['REQUEST_METHOD'] == 'POST'){

    foreach ($_POST as $key => $value) {
        if ($value === ''){
            $_POST[$key] = null;
        }
    }
    $validation = new PreboardingValidation();

    $validated = $validation->validate($_POST);

    if ($validated->fails()){
        $errors = $validated->errors()->all();
        http_response_code(422);
        header('Content-Type: application/json');
        echo json_encode(['errors' => $errors]);
    }

    else {
        $database_initialization = new DatabaseConnection();

        $preboarding_controller = new PreboardingController();

        $data_insertion = $preboarding_controller->store($_POST);


        if ($data_insertion){
            $app_id = $preboarding_controller->get_appid();


            $response = [
                'app_id' => $app_id
            ];
            header('Content-Type: application/json');
            echo json_encode($response);
        }
        else {
            http_response_code(422);
            header('Content-Type: application/json');
            echo json_encode(['database_error' => 'Database Error']);
        }

        


    }   


}   

?>