<?php

namespace App\Listener;

use App\Entity\Ability;
use App\Entity\Pokemon;
use Doctrine\Common\Persistence\Event\LifecycleEventArgs;
use Exception;


class PokemonListener
{
    /**
     * @param Pokemon $pokemon
     * @param LifecycleEventArgs $args
     * @throws Exception
     */
    public function postPersist(Pokemon $pokemon, LifecycleEventArgs $args)
    {
        $pokemon = $args->getObject();
        if (!$pokemon instanceof Pokemon) {
            return;
        }

        $entityManager = $args->getObjectManager();

        if ($pokemon->getAbilities()->isEmpty()) {
            $abilities = $entityManager
                ->getRepository(Ability::class)
                ->findAll();
            /* @var Ability $randomAbility */
            $randomAbility = $abilities[random_int(0, sizeof($abilities))];
            $pokemon->addAbility($randomAbility);
        }
        $entityManager->persist($pokemon);
        $entityManager->flush();
    }
}