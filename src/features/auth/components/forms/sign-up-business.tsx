"use client";
import { type z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { useCreateUser } from "~/lib/hooks";
import {
  BusinessDocumentCreateSchema,
  BusinessSchema,
  UserCreateSchema,
} from "@zenstackhq/runtime/zod/models";
import { fileToBase64 } from "~/lib/utils";
import { useState } from "react";
import { Card, CardContent } from "~/components/ui/card";
import Image from "next/image";
import { toast } from "sonner";

const BusinessSignUpForm = () => {
  const { mutateAsync: createUser } = useCreateUser();
  const router = useRouter();
  const [logo, setLogo] = useState<string | null>(null);
  const [step, setStep] = useState(1); // Track the current step in the form
  const [name, setName] = useState("Business Name");
  const [address, setAddress] = useState("ABC Street, Zamboanga City");

  const FormSchema = UserCreateSchema.merge(BusinessSchema).merge(
    BusinessDocumentCreateSchema,
  );

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      logo: "",
      name: "",
      businessName: "",
      address: "",
      phoneNumber: "",
      license: "",
      businessPermit: "",
      certification: "",
      email: "",
      password: "",
      ownerId: "",
      businessId: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      await createUser({
        data: {
          name: data.name,
          email: data.email,
          password: data.password,
          role: "BUSINESS",
          image: data.image,
          business: {
            create: {
              logo: data.logo,
              businessName: data.businessName,
              phoneNumber: data.phoneNumber,
              address: data.address,
              documents: {
                create: {
                  license: data.license,
                  businessPermit: data.businessPermit,
                  certification: data.certification,
                },
              },
            },
          },
        },
      });

      toast.success("Welcome to PetMate!");
      router.push("/sign-in");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create account");
    }
    return;
  }

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, (errors) => console.log(errors))}
        className="space-y-4"
      >
        <Card className="w-full">
          <CardContent className="p-0">
            <div className="flex items-center p-4">
              <Image
                height={400}
                width={400}
                src={logo ?? "/placeholder.svg"}
                alt={`preview-logo`}
                className="mr-4 h-16 w-16 rounded-full object-cover"
              />
              <div className="text-wrap">
                <h2 className="font-semibold">{name}</h2>
                <p className="text-xs text-muted-foreground">{address}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Step 1: Basic Information */}
        {step === 1 && (
          <>
            <FormField
              control={form.control}
              name="logo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Upload Logo</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      onChange={async (e) => {
                        if (!e.target.files) {
                          field.onChange(undefined);
                          return;
                        }
                        const image = await fileToBase64(e.target.files[0]!);
                        setLogo(image);
                        console.log(image);
                        field.onChange(image);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="businessName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Business Name"
                      {...field}
                      onChange={(e) => {
                        setName(e.currentTarget.value);
                        form.setValue("businessName", e.currentTarget.value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        {/* Step 2: Contact Information */}
        {step === 2 && (
          <>
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="123 Street Zamboanga City"
                      {...field}
                      onChange={(e) => {
                        setAddress(e.currentTarget.value);
                        form.setValue("address", e.currentTarget.value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="09123456789" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        {/* Step 3: Business Documents */}
        {step === 3 && (
          <>
            <FormField
              control={form.control}
              name="license"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>License</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      onChange={async (e) => {
                        if (!e.target.files) {
                          field.onChange(undefined);
                          return;
                        }
                        const image = await fileToBase64(e.target.files[0]!);
                        field.onChange(image);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="businessPermit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Permit</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      onChange={async (e) => {
                        if (!e.target.files) {
                          field.onChange(undefined);
                          return;
                        }
                        const image = await fileToBase64(e.target.files[0]!);
                        field.onChange(image);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="certification"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Certification</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      onChange={async (e) => {
                        if (!e.target.files) {
                          field.onChange(undefined);
                          return;
                        }
                        const image = await fileToBase64(e.target.files[0]!);
                        field.onChange(image);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        {/* Step 4: Account Information */}
        {step === 4 && (
          <>
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Upload Selfie</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      onChange={async (e) => {
                        if (!e.target.files) {
                          field.onChange(undefined);
                          return;
                        }
                        const image = await fileToBase64(e.target.files[0]!);
                        field.onChange(image);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="user@petmate.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Super secret password"
                      {...field}
                      value={form.getValues("password") ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        <div className="mt-4 flex justify-between">
          <div className="flex">
            {step > 1 && (
              <Button
                type="button"
                variant={"outline"}
                onClick={prevStep}
                className="mr-2"
              >
                Previous
              </Button>
            )}

            {step < 4 && (
              <Button type="button" onClick={nextStep}>
                Next
              </Button>
            )}
          </div>

          <Button disabled={step != 4} type="submit">
            Sign Up
          </Button>
        </div>
      </form>
    </Form>
  );
};

export { BusinessSignUpForm };
