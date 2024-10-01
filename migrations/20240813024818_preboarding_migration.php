<?php

declare(strict_types=1);

use Phinx\Db\Action\AddColumn;
use Phinx\Migration\AbstractMigration;

final class PreboardingMigration extends AbstractMigration
{
    /**
     * Change Method.
     *
     * Write your reversible migrations using this method.
     *
     * More information on writing migrations is available here:
     * https://book.cakephp.org/phinx/0/en/migrations.html#the-change-method
     *
     * Remember to call "create()" or "update()" and NOT "save()" when working
     * with the Table class.
     */
    public function change(): void
    {
        $table = $this->table('preboarding_attendance', ['id' => false, 'primary_key' => ['app_id']]);
        $table->addColumn('app_id', 'integer', ['identity' => true])
                ->addColumn('name', 'string', ['null' => false])
                ->addColumn('email_address', 'string', ['null' => false])
                ->addColumn('intern_type', 'string', ['null' => false])
                ->addColumn('phone_number', 'string', ['null' => false])
                ->addColumn('facebook_link', 'string', ['null' => false])
                ->addColumn('course', 'string', ['null' => false])
                ->addColumn('school_name', 'string', ['null' => false])
                ->addColumn('school_contact', 'string', ['null' => false])
                ->addColumn('hours_requirement', 'string', ['null' => false])
                ->addColumn('discord_username', 'string', ['null' => false])
                ->addColumn('orientation_date', 'date', ['null' => false])
                ->addColumn('start_date', 'date', ['null' => false])
                ->addColumn('end_date', 'date', ['null' => false])
                ->addColumn('status', 'string', ['null' => false])
                ->create();
        
        $this->execute("ALTER TABLE preboarding_attendance AUTO_INCREMENT = 7000");
    }

    public function up(): void
    {
        $this->execute("ALTER TABLE preboarding_attendance AUTO_INCREMENT = 7000");
    }
}
