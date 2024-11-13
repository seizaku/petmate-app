"use client";
import React, { useState } from "react";
import { AppContainer, AppBottomNav, AppNavbar } from "~/components/app";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { FaMagnifyingGlass, FaPen, FaPlus, FaX } from "react-icons/fa6";
import { Input } from "~/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { useRouter } from "next/navigation";
import { useDeletePet, useFindFirstUser } from "~/lib/hooks";
import { Dialog, DialogContent, DialogTitle } from "~/components/ui/dialog";
import { AlertDialogHeader } from "~/components/ui/alert-dialog";
import { PetForm } from "~/features/pets/components/forms/pet";
import { Button } from "~/components/ui/button";
import { type Pet } from "@prisma/client";
import { toast } from "sonner";

export default function PetsPage() {
  const { data: user } = useFindFirstUser({
    include: {
      pets: true,
    },
  });
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPets = user?.pets?.filter(
    (pet) =>
      pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.species.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.breed.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const { mutateAsync: deletePet } = useDeletePet();

  const [open, setOpen] = useState(false);
  const [currentData, setCurrentData] = useState<Pet | undefined>(undefined);

  function onOpenChange(value: boolean) {
    if (!value) {
      setCurrentData(undefined);
    }
    setOpen(value);
  }

  async function handleUpdate(data: Pet) {
    setCurrentData(data);
    setOpen(true);
  }

  async function handleDelete(id: Pet["id"]) {
    try {
      await deletePet({
        where: {
          id,
        },
      });
      toast.success("Delete successful");
    } catch (error) {
      console.error(error);
      toast.error("Could not delete item");
    }
  }

  return (
    <AppContainer>
      <AppNavbar
        title="My Pets"
        href="/user/home"
        rightAction
        rightActionIcon={<FaPlus className="text-primary" />}
        rightActionFn={() => onOpenChange(true)}
      />
      <div className="relative mb-4">
        <Input
          className="border bg-muted pl-10"
          placeholder="Search pets"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FaMagnifyingGlass className="absolute left-3.5 top-2 h-5 text-muted-foreground" />
      </div>

      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <AlertDialogHeader>
            <DialogTitle>
              {currentData ? "Edit Pet" : "Register Pet"}
            </DialogTitle>
          </AlertDialogHeader>
          <PetForm
            updateData={currentData}
            closeFn={() => onOpenChange(false)}
          />
        </DialogContent>
      </Dialog>

      <div className="grid gap-2">
        {filteredPets?.length ? (
          filteredPets?.map((pet) => (
            <div key={pet.id}>
              <Card>
                <CardHeader className="mb-4 flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-lg font-semibold">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarFallback></AvatarFallback>
                        <AvatarImage className="object-cover" src={pet.image} />
                      </Avatar>
                      <div className="space-y-1">
                        <CardTitle>{pet.name}</CardTitle>
                        <CardDescription className="text-xs capitalize">
                          <span
                            className={
                              pet.gender == "MALE"
                                ? "text-blue-400"
                                : "text-pink-400"
                            }
                          >
                            {pet.gender.toLowerCase()}
                          </span>{" "}
                          • {pet.breed} • {pet.age}
                        </CardDescription>
                      </div>
                    </div>
                  </CardTitle>
                  <div className="flex space-x-2">
                    <Button
                      variant={"secondary"}
                      size={"icon"}
                      onClick={() => handleUpdate(pet)}
                    >
                      <FaPen className="h-2 w-2 text-primary" />
                    </Button>
                    <Button
                      variant={"secondary"}
                      size={"icon"}
                      onClick={() => handleDelete(pet.id)}
                    >
                      <FaX className="h-2 w-2 text-primary" />
                    </Button>
                  </div>
                </CardHeader>
              </Card>
            </div>
          ))
        ) : (
          <p className="text-center">No results.</p>
        )}
      </div>

      <AppBottomNav />
    </AppContainer>
  );
}
