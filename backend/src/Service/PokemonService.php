<?php

namespace App\Service;

use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Validator\Validator\ValidatorInterface;

use App\Entity\Pokemon;


class PokemonService
{
    private $validator;

    public function __construct(ValidatorInterface $validator)
    {
        $this->validator = $validator;
    }

    public function create(ObjectManager $entityManager, Pokemon $pokemon)
    {
        $errors = $this->validator->validate($pokemon);
        if (count($errors) > 0) {
            $errorsString = (string) $errors;
            throw new BadRequestHttpException($errorsString);
        }

        $entityManager->persist($pokemon);
        $entityManager->flush();

    }
}