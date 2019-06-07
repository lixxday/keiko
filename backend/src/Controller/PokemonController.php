<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Pokemon;

use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;


class PokemonController
{

    /**
     * @Route("/pokemon", name="pokemon")
     */
    public function pokemon()
    {
        $encoders = [new JsonEncoder()];
        $normalizers = [new ObjectNormalizer()];

        $serializer = new Serializer($normalizers, $encoders);

        $pokemon = new Pokemon();
        $pokemon -> setName("bulbasaur");
        $pokemon -> setWeight(67);
        $pokemon -> setHeight(100);

        $jsonPokemon = $serializer->serialize($pokemon, 'json');

        return new Response(
            '<html><body>'.$jsonPokemon.'</body></html>'
        );
    }
}
