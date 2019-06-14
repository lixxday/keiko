<?php

namespace App\Tests\Listener;

use App\Listener\PokemonListener;
use PHPUnit\Framework\TestCase;

class CalculatorTest extends TestCase
{
    public function testAdd()
    {
        $pokemon = $this.getMockBuilder('stdClass')
            ->setMethods(array('persist'))
            ->getMock();

        $pokemonListener = new PokemonListener();
        $pokemonListener->postPersist($pokemon, $args);

        //$result = $pokemonListener->postPersist($pokemon, );

        // assert that your calculator added the numbers correctly!
        //$this->assertEquals(42, $result);
    }
}
