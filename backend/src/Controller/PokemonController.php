<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Pokemon;

use Symfony\Component\Serializer\Normalizer\NormalizerInterface;
use Symfony\Component\Serializer\SerializerInterface;


class PokemonController extends AbstractController
{
    /**
     * @Route("/api/pokemon/", name="pokemon_list", methods={"GET"})
     *
     * @param NormalizerInterface $normalizer
     *
     * @return JsonResponse
     */
    public function pokemonList(NormalizerInterface $normalizer)
    {
        $pokemonList = $this->getDoctrine()
            ->getRepository(Pokemon::class)
            ->findAll();

        $response = $normalizer->normalize($pokemonList, 'json');

        return new JsonResponse( $response );
    }

    /**
     * @Route("/api/pokemon/{id}", name="pokemon", methods={"GET"})
     *
     * @param NormalizerInterface $normalizer
     * @param $id
     *
     * @return JsonResponse
     */
    public function pokemon(NormalizerInterface $normalizer, $id)
    {
        $pokemon = $this->getDoctrine()
            ->getRepository(Pokemon::class)
            ->find($id);

        $response = $normalizer->normalize($pokemon, 'json');

        return new JsonResponse( $response );
    }


    /**
     * @Route("/api/pokemon", name="create", methods={"POST"})
     *
     * @param Request $request
     * @param SerializerInterface $serializer
     *
     * @return Response
     */
    public function create(Request $request, SerializerInterface $serializer)
    {
        $entityManager = $this->getDoctrine()->getManager();

        $pokemon = new Pokemon();
        $serializer -> deserialize($request -> getContent(), Pokemon::class, 'json', ['object_to_populate' => $pokemon]);

        // tell Doctrine you want to (eventually) save the Product (no queries yet)
        $entityManager->persist($pokemon);
        // actually executes the queries (i.e. the INSERT query)
        $entityManager->flush();

        return new Response('Saved new pokemon with id '.$pokemon -> getId());
    }
}
