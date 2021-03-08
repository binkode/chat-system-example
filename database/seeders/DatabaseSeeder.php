<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Myckhel\ChatSystem\Database\Seeders\ConversationSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
      ini_set('memory_limit', '4G');
      $this->call([
        UserSeeder::class,
        ConversationSeeder::class,
      ]);
    }
}
