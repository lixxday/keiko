<?php

namespace App\EventListener;

use App\Entity\Ability;
use App\Entity\Pokemon;
use Doctrine\Common\Persistence\Event\LifecycleEventArgs;
use Exception;


class PokemonListener
{
    /**
     * @param LifecycleEventArgs $args
     * @throws Exception
     */
    public function postPersist(LifecycleEventArgs $args)
    {
        $entity = $args->getObject();

        if (!$entity instanceof Pokemon) {
            return;
        }

        $entityManager = $args->getObjectManager();

        if ($entity->getAbilities() == []) {
            $abilities = $entityManager
                ->getRepository(Ability::class)
                ->findAll();
            /* @var Ability $randomAbility */
            $randomAbility = $abilities[random_int(0, sizeof($abilities))];
            $entity->addAbility($randomAbility);
        }
    }
}