<?php

namespace App\Listener;

use App\Entity\Ability;
use App\Entity\Pokemon;
use Doctrine\Common\Persistence\Event\LifecycleEventArgs;
use Doctrine\ORM\Mapping as ORM;
use Exception;


class PokemonListener
{
    private $needsFlush = false;
    /**
     * @ORM\PrePersist()
     *
     * @param Pokemon $pokemon
     * @param LifecycleEventArgs $args
     * @throws Exception
     */
    public function prePersist(Pokemon $pokemon, LifecycleEventArgs $args)
    {
        //$entity = $args->getObject();

        if (!$pokemon instanceof Pokemon) {
            return;
        }

        $entityManager = $args->getObjectManager();

        if ($pokemon->getAbilities() == []) {
            $abilities = $entityManager
                ->getRepository(Ability::class)
                ->findAll();
            /* @var Ability $randomAbility */
            $randomAbility = $abilities[random_int(0, sizeof($abilities))];
            $ability = new Ability();
            $ability->setName("blaze");
            $pokemon->addAbility($ability);

            $entityManager->persist($pokemon);
            $this->needsFlush = true;
        }
    }

    /**
     * @ORM\PostLoad()
     * @param Pokemon $pokemon
     * @param LifecycleEventArgs $eventArgs
     */
    public function PostLoad(Pokemon $pokemon, LifecycleEventArgs $eventArgs)
    {
        if ($this->needsFlush) {
            $this->needsFlush = false;
            $eventArgs->getObjectManager()->flush();
        }
    }
}