<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;

class PokemonController
{
    public function helloWorld()
    {
        return new Response(
            '<html><body>Hello World!</body></html>'
        );
    }
}
