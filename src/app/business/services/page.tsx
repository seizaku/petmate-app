"use client";
import React, { useState } from "react";
import { AppContainer, AppNavbar, AppBottomNav } from "~/components/app";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { FaPen, FaPlus, FaTrash, FaX } from "react-icons/fa6";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { AlertDialogHeader } from "~/components/ui/alert-dialog";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import {
  useCreateService,
  useDeleteManyVariant,
  useDeleteService,
  useFindFirstUser,
  useUpdateService,
} from "~/lib/hooks";
import { useSession } from "next-auth/react";

type Service = {
  id?: string;
  name: string;
  variants: {
    id: string;
    name: string;
    price: number;
  }[];
};

export default function ServicesPage() {
  const { data: session } = useSession();
  const { data: user } = useFindFirstUser({
    include: {
      business: {
        include: {
          services: {
            include: {
              variants: true,
            },
          },
        },
      },
    },
  });

  const { mutateAsync: createService } = useCreateService();
  const { mutateAsync: deleteService } = useDeleteService();
  const { mutateAsync: deleteVariants } = useDeleteManyVariant();
  const { mutateAsync: updateService } = useUpdateService();

  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newService, setNewService] = useState<Service>({
    name: "",
    variants: [],
  });

  async function handleAddService() {
    if (isEditing) {
      await deleteVariants({
        where: {
          service: {
            id: {
              equals: newService.id,
            },
          },
        },
      });
      await updateService({
        data: {
          name: newService.name,
          variants: {
            createMany: {
              data: newService.variants,
            },
          },
          business: {
            connect: {
              ownerId: user?.id,
            },
          },
        },
        where: {
          id: newService.id,
        },
      });
    } else {
      await createService({
        data: {
          name: newService.name,
          variants: {
            createMany: {
              data: newService.variants,
            },
          },
          business: {
            connect: {
              ownerId: session?.user.id,
            },
          },
        },
      });
    }
    setNewService({ name: "", variants: [] });
    setIsEditing(false);
  }

  const handleAddVariant = () => {
    setNewService({
      ...newService,
      variants: [
        ...newService.variants,
        { id: `id-${newService.variants.length + 1}`, name: "", price: 0 },
      ],
    });
  };

  const handleVariantChange = (
    id: string,
    field: "name" | "price",
    value: string,
  ) => {
    setNewService({
      ...newService,
      variants: newService.variants.map((variant) =>
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        variant.id === id
          ? {
              ...variant,
              [field]: field === "price" ? parseFloat(value) || 0 : value,
            }
          : variant,
      ),
    });
  };

  const handleRemoveVariant = (id: string) => {
    setNewService({
      ...newService,
      variants: newService.variants.filter((variant) => variant.id !== id),
    });
  };

  const handleEditService = (service: Service) => {
    setIsEditing(true);
    setNewService(service);
    setOpen(true);
  };

  async function handleDeleteService(id: string) {
    await deleteVariants({
      where: {
        service: {
          id: {
            equals: id,
          },
        },
      },
    });
    await deleteService({
      where: {
        id,
      },
    });
  }

  function onOpenChange(value: boolean) {
    if (!value) {
      setIsEditing(false);
    }
    setOpen(value);
    setNewService({ name: "", variants: [] });
  }

  return (
    <AppContainer>
      <AppNavbar
        title="Services"
        href="/business/home"
        rightAction
        rightActionFn={() => onOpenChange(true)}
        rightActionIcon={<FaPlus className="text-primary" />}
      />

      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <AlertDialogHeader>
            <DialogTitle>
              {isEditing ? "Edit Service" : "Add New Service"}
            </DialogTitle>
          </AlertDialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="service-name">Service Name</Label>
              <Input
                id="service-name"
                value={newService.name}
                onChange={(e) =>
                  setNewService({ ...newService, name: e.target.value })
                }
                placeholder="Enter service name"
              />
            </div>
            <div className="grid gap-2">
              <Label>Price Variants</Label>
              {newService.variants.map((variant) => (
                <div key={variant.id} className="flex items-center space-x-2">
                  <Input
                    value={variant.name}
                    onChange={(e) =>
                      handleVariantChange(variant.id, "name", e.target.value)
                    }
                    placeholder="Variant name"
                    className="w-32"
                  />
                  <Input
                    type="number"
                    value={variant.price}
                    onChange={(e) =>
                      handleVariantChange(variant.id, "price", e.target.value)
                    }
                    placeholder="Price"
                    className="w-24"
                  />
                  <Button
                    variant="secondary"
                    size="icon"
                    className="text-primary"
                    onClick={() => handleRemoveVariant(variant.id)}
                  >
                    X
                  </Button>
                </div>
              ))}
              <Button variant="outline" onClick={handleAddVariant}>
                <FaPlus className="mr-2 h-4 w-4" /> Add Variant
              </Button>
            </div>
          </div>
          <DialogClose asChild>
            <Button
              onClick={handleAddService}
              disabled={!newService.name || newService.variants.length === 0}
            >
              {isEditing ? "Update Service" : "Add Service"}
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>

      {user?.business?.services?.map((service: Service) => (
        <div key={service.id} className="mt-4">
          <Card>
            <CardHeader className="mb-4 flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-semibold">
                {service.name}
              </CardTitle>
              <div className="flex space-x-2">
                <Button
                  variant={"secondary"}
                  size={"icon"}
                  onClick={() => handleEditService(service)}
                >
                  <FaPen className="h-2 w-2 text-primary" />
                </Button>
                <Button
                  variant={"secondary"}
                  size={"icon"}
                  onClick={() => handleDeleteService(service.id!)}
                >
                  <FaTrash className="h-2 w-2 text-primary" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {service.variants.map((variant) => (
                  <div
                    key={variant.id}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm text-secondary-foreground">
                      {variant.name}
                    </span>
                    <span className="font-medium">
                      ₱{variant.price.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      ))}

      <AppBottomNav />
    </AppContainer>
  );
}
