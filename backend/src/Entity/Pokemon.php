<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Serializer\Annotation\Groups;


/**
 * @ApiResource(normalizationContext={"groups"={"pokemon"}})
 * @ORM\Table(name="pokemon")
 * @ORM\Entity()
 * @ORM\EntityListeners({"App\Listener\PokemonListener"})
 */
class Pokemon
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=180, unique=true)
     * @Assert\NotBlank
     * @Groups({"pokemon"})
     */
    private $name;

    /**
     * @ORM\Column(type="integer")
     * @Assert\NotBlank
     * @Groups({"pokemon"})
     */
    private $weight;

    /**
     * @ORM\Column(type="integer")
     * @Assert\NotBlank
     * @Groups({"pokemon"})
     */
    private $height;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Ability", mappedBy="pokemon")
     * @Groups({"pokemon"})
     */
    private $abilities;

    public function __construct()
    {
        $this->abilities = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return mixed
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @param mixed $name
     */
    public function setName($name): void
    {
        $this->name = $name;
    }

    /**
     * @return mixed
     */
    public function getHeight()
    {
        return $this->height;
    }

    /**
     * @param mixed $height
     */
    public function setHeight($height): void
    {
        $this->height = $height;
    }

    /**
     * @return mixed
     */
    public function getWeight()
    {
        return $this->weight;
    }

    /**
     * @param mixed $weight
     */
    public function setWeight($weight): void
    {
        $this->weight = $weight;
    }

    /**
     * @return Collection|Ability[]
     */
    public function getAbilities(): Collection
    {
        return $this->abilities;
    }

    public function addAbility(Ability $ability): self
    {
        if (!$this->abilities->contains($ability)) {
            $this->abilities[] = $ability;
            $ability->addPokemon($this);
        }

        return $this;
    }

    public function removeAbility(Ability $ability): self
    {
        if ($this->abilities->contains($ability)) {
            $this->abilities->removeElement($ability);
            $ability->removePokemon($this);
        }

        return $this;
    }
}
