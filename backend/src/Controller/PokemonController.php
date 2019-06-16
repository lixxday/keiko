<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Pokemon;
use App\Service\PokemonService;

use Symfony\Component\Serializer\Exception\ExceptionInterface;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;


class PokemonController extends AbstractController
{
    private $normalizer;
    private $serializer;
    private $validator;
    private $pokemonService;

    public function __construct(NormalizerInterface $normalizer, SerializerInterface $serializer, ValidatorInterface $validator, PokemonService $pokemonService)
    {
        $this->normalizer = $normalizer;
        $this->serializer = $serializer;
        $this->validator  = $validator;
        $this->pokemonService  = $pokemonService;
    }

    /**
     * @Route("/api/pokemon/", name="pokemon_list", methods={"GET"})
     * @return JsonResponse
     * @throws ExceptionInterface
     */
    public function pokemonList(): JsonResponse
    {
        $pokemonList = $this->getDoctrine()
            ->getRepository(Pokemon::class)
            ->findAll();

        $response = $this->normalizer->normalize($pokemonList, 'json');

        return new JsonResponse( $response );
    }

    /**
     * @Route("/api/pokemon/{id}", name="pokemon", methods={"GET"})
     * @param $id
     * @return JsonResponse
     * @throws ExceptionInterface
     */
    public function pokemon($id): JsonResponse
    {
        $pokemon = $this->getDoctrine()
            ->getRepository(Pokemon::class)
            ->find($id);

        $response = $this -> normalizer -> normalize($pokemon, 'json');

        return new JsonResponse( $response );
    }


    /**
     * @Route("/api/pokemon", name="create", methods={"POST"})
     * @param Request $request
     * @return JsonResponse
     * @throws ExceptionInterface
     */
    public function create(Request $request): JsonResponse
    {
        /* @var Pokemon $pokemon */
        $pokemon = $this->serializer->deserialize($request -> getContent(), Pokemon::class, 'json');
        $entityManager = $this->getDoctrine()->getManager();

        $this->pokemonService->create($pokemon, $entityManager);
        $response = $this->normalizer->normalize($pokemon, 'json');

        return new JsonResponse($response);
    }
}
