<?php

namespace API\Connection;

use Illuminate\Database\Capsule\Manager as Capsule;

class DatabaseConnection {

    public function __construct()
    {
        $capsule = new Capsule;

        $capsule->addConnection([
            'driver' => 'mysql',
            'host' => 'localhost',
            'database' => 'uip_preboarding_offboarding',
            'username' => 'root',
            'password' => '',
            'charset' => 'utf8',
            'collation' => 'utf8_unicode_ci',
            'prefix' => '',
        ]);
    
        // Make this Capsule instance available globally via static methods... (optional)
        $capsule->setAsGlobal();
    
        // Setup the Eloquent ORM... (optional; unless you've used setEventDispatcher())
        $capsule->bootEloquent();
    }
  
}
?>