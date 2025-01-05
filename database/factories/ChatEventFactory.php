<?php

namespace Database\Factories;

use App\Models\ChatEvent;
use Binkode\ChatSystem\Database\Factories\ChatEvent as BaseChatEventFactory;

class ChatEventFactory extends BaseChatEventFactory
{
  /**
   * The name of the factory's corresponding model.
   *
   * @var string
   */
  protected $model = ChatEvent::class;

  /**
   * Define the model's default state.
   *
   * @return array
   */
  public function definition()
  {
    return [
      'type' => $this->faker->randomElement(['read', 'delete', 'deliver']),
    ];
  }
}
