<?php

namespace Database\Factories;

use App\Models\Conversation;
use Binkode\ChatSystem\Database\Factories\ConversationFactory as BaseConversationFactory;

class ConversationFactory extends Factory
{
  /**
   * The name of the factory's corresponding model.
   *
   * @var string
   */
  protected $model = Conversation::class;

  /**
   * Define the model's default state.
   *
   * @return array
   */
  public function definition()
  {
    return [
      'name' => $this->faker->firstname . '\'s Group',
    ];
  }
}
