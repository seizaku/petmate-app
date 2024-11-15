/* eslint-disable */
const metadata = {
    models: {
        account: {
            name: 'Account', fields: {
                id: {
                    name: "id",
                    type: "String",
                    isId: true,
                    attributes: [{ "name": "@default", "args": [] }],
                }, userId: {
                    name: "userId",
                    type: "String",
                    isForeignKey: true,
                    relationField: 'user',
                }, type: {
                    name: "type",
                    type: "String",
                }, provider: {
                    name: "provider",
                    type: "String",
                }, providerAccountId: {
                    name: "providerAccountId",
                    type: "String",
                }, refresh_token: {
                    name: "refresh_token",
                    type: "String",
                    isOptional: true,
                }, access_token: {
                    name: "access_token",
                    type: "String",
                    isOptional: true,
                }, expires_at: {
                    name: "expires_at",
                    type: "Int",
                    isOptional: true,
                }, token_type: {
                    name: "token_type",
                    type: "String",
                    isOptional: true,
                }, scope: {
                    name: "scope",
                    type: "String",
                    isOptional: true,
                }, id_token: {
                    name: "id_token",
                    type: "String",
                    isOptional: true,
                }, session_state: {
                    name: "session_state",
                    type: "String",
                    isOptional: true,
                }, user: {
                    name: "user",
                    type: "User",
                    isDataModel: true,
                    backLink: 'accounts',
                    isRelationOwner: true,
                    foreignKeyMapping: { "id": "userId" },
                }, refresh_token_expires_in: {
                    name: "refresh_token_expires_in",
                    type: "Int",
                    isOptional: true,
                },
            }
            , uniqueConstraints: {
                id: {
                    name: "id",
                    fields: ["id"]
                }, provider_providerAccountId: {
                    name: "provider_providerAccountId",
                    fields: ["provider", "providerAccountId"]
                },
            }
            ,
        }
        ,
        session: {
            name: 'Session', fields: {
                id: {
                    name: "id",
                    type: "String",
                    isId: true,
                    attributes: [{ "name": "@default", "args": [] }],
                }, sessionToken: {
                    name: "sessionToken",
                    type: "String",
                }, userId: {
                    name: "userId",
                    type: "String",
                    isForeignKey: true,
                    relationField: 'user',
                }, expires: {
                    name: "expires",
                    type: "DateTime",
                }, user: {
                    name: "user",
                    type: "User",
                    isDataModel: true,
                    backLink: 'sessions',
                    isRelationOwner: true,
                    foreignKeyMapping: { "id": "userId" },
                },
            }
            , uniqueConstraints: {
                id: {
                    name: "id",
                    fields: ["id"]
                }, sessionToken: {
                    name: "sessionToken",
                    fields: ["sessionToken"]
                },
            }
            ,
        }
        ,
        user: {
            name: 'User', fields: {
                id: {
                    name: "id",
                    type: "String",
                    isId: true,
                    attributes: [{ "name": "@default", "args": [] }],
                }, name: {
                    name: "name",
                    type: "String",
                }, email: {
                    name: "email",
                    type: "String",
                }, password: {
                    name: "password",
                    type: "String",
                    isOptional: true,
                }, emailVerified: {
                    name: "emailVerified",
                    type: "DateTime",
                    isOptional: true,
                }, image: {
                    name: "image",
                    type: "String",
                    isOptional: true,
                }, role: {
                    name: "role",
                    type: "Role",
                    attributes: [{ "name": "@default", "args": [] }],
                }, accounts: {
                    name: "accounts",
                    type: "Account",
                    isDataModel: true,
                    isArray: true,
                    backLink: 'user',
                }, sessions: {
                    name: "sessions",
                    type: "Session",
                    isDataModel: true,
                    isArray: true,
                    backLink: 'user',
                }, business: {
                    name: "business",
                    type: "Business",
                    isDataModel: true,
                    isOptional: true,
                    backLink: 'owner',
                }, pets: {
                    name: "pets",
                    type: "Pet",
                    isDataModel: true,
                    isArray: true,
                    backLink: 'owner',
                }, appointments: {
                    name: "appointments",
                    type: "Appointment",
                    isDataModel: true,
                    isArray: true,
                    backLink: 'user',
                }, notifications: {
                    name: "notifications",
                    type: "Notification",
                    isDataModel: true,
                    isArray: true,
                    backLink: 'user',
                },
            }
            , uniqueConstraints: {
                id: {
                    name: "id",
                    fields: ["id"]
                }, email: {
                    name: "email",
                    fields: ["email"]
                },
            }
            ,
        }
        ,
        business: {
            name: 'Business', fields: {
                id: {
                    name: "id",
                    type: "String",
                    isId: true,
                    attributes: [{ "name": "@default", "args": [] }],
                }, logo: {
                    name: "logo",
                    type: "String",
                    isOptional: true,
                }, businessName: {
                    name: "businessName",
                    type: "String",
                }, address: {
                    name: "address",
                    type: "String",
                }, latitude: {
                    name: "latitude",
                    type: "String",
                }, longitude: {
                    name: "longitude",
                    type: "String",
                }, phoneNumber: {
                    name: "phoneNumber",
                    type: "String",
                }, verified: {
                    name: "verified",
                    type: "Boolean",
                    attributes: [{ "name": "@default", "args": [{ "value": false }] }],
                }, description: {
                    name: "description",
                    type: "String",
                    isOptional: true,
                }, documents: {
                    name: "documents",
                    type: "BusinessDocument",
                    isDataModel: true,
                    isOptional: true,
                    backLink: 'business',
                }, services: {
                    name: "services",
                    type: "Service",
                    isDataModel: true,
                    isArray: true,
                    backLink: 'business',
                }, appointments: {
                    name: "appointments",
                    type: "Appointment",
                    isDataModel: true,
                    isArray: true,
                    backLink: 'business',
                }, owner: {
                    name: "owner",
                    type: "User",
                    isDataModel: true,
                    backLink: 'business',
                    isRelationOwner: true,
                    foreignKeyMapping: { "id": "ownerId" },
                }, ownerId: {
                    name: "ownerId",
                    type: "String",
                    isForeignKey: true,
                    relationField: 'owner',
                }, timeslots: {
                    name: "timeslots",
                    type: "TimeSlot",
                    isDataModel: true,
                    isArray: true,
                    backLink: 'business',
                }, notifications: {
                    name: "notifications",
                    type: "Notification",
                    isDataModel: true,
                    isArray: true,
                    backLink: 'business',
                },
            }
            , uniqueConstraints: {
                id: {
                    name: "id",
                    fields: ["id"]
                }, ownerId: {
                    name: "ownerId",
                    fields: ["ownerId"]
                },
            }
            ,
        }
        ,
        businessDocument: {
            name: 'BusinessDocument', fields: {
                id: {
                    name: "id",
                    type: "String",
                    isId: true,
                    attributes: [{ "name": "@default", "args": [] }],
                }, license: {
                    name: "license",
                    type: "String",
                    isOptional: true,
                }, businessPermit: {
                    name: "businessPermit",
                    type: "String",
                    isOptional: true,
                }, certification: {
                    name: "certification",
                    type: "String",
                    isOptional: true,
                }, business: {
                    name: "business",
                    type: "Business",
                    isDataModel: true,
                    backLink: 'documents',
                    isRelationOwner: true,
                    foreignKeyMapping: { "id": "businessId" },
                }, businessId: {
                    name: "businessId",
                    type: "String",
                    isForeignKey: true,
                    relationField: 'business',
                },
            }
            , uniqueConstraints: {
                id: {
                    name: "id",
                    fields: ["id"]
                }, businessId: {
                    name: "businessId",
                    fields: ["businessId"]
                },
            }
            ,
        }
        ,
        service: {
            name: 'Service', fields: {
                id: {
                    name: "id",
                    type: "String",
                    isId: true,
                    attributes: [{ "name": "@default", "args": [] }],
                }, name: {
                    name: "name",
                    type: "String",
                }, variants: {
                    name: "variants",
                    type: "Variant",
                    isDataModel: true,
                    isArray: true,
                    backLink: 'service',
                }, business: {
                    name: "business",
                    type: "Business",
                    isDataModel: true,
                    backLink: 'services',
                    isRelationOwner: true,
                    foreignKeyMapping: { "id": "businessId" },
                }, businessId: {
                    name: "businessId",
                    type: "String",
                    isForeignKey: true,
                    relationField: 'business',
                },
            }
            , uniqueConstraints: {
                id: {
                    name: "id",
                    fields: ["id"]
                },
            }
            ,
        }
        ,
        variant: {
            name: 'Variant', fields: {
                id: {
                    name: "id",
                    type: "String",
                    isId: true,
                    attributes: [{ "name": "@default", "args": [] }],
                }, productId: {
                    name: "productId",
                    type: "String",
                    isForeignKey: true,
                    relationField: 'service',
                }, service: {
                    name: "service",
                    type: "Service",
                    isDataModel: true,
                    backLink: 'variants',
                    isRelationOwner: true,
                    foreignKeyMapping: { "id": "productId" },
                }, name: {
                    name: "name",
                    type: "String",
                }, price: {
                    name: "price",
                    type: "Float",
                }, appointments: {
                    name: "appointments",
                    type: "AppointmentService",
                    isDataModel: true,
                    isArray: true,
                    backLink: 'variant',
                },
            }
            , uniqueConstraints: {
                id: {
                    name: "id",
                    fields: ["id"]
                },
            }
            ,
        }
        ,
        pet: {
            name: 'Pet', fields: {
                id: {
                    name: "id",
                    type: "Int",
                    isId: true,
                    attributes: [{ "name": "@default", "args": [] }],
                    isAutoIncrement: true,
                }, image: {
                    name: "image",
                    type: "String",
                }, name: {
                    name: "name",
                    type: "String",
                }, species: {
                    name: "species",
                    type: "String",
                }, breed: {
                    name: "breed",
                    type: "String",
                }, age: {
                    name: "age",
                    type: "String",
                }, gender: {
                    name: "gender",
                    type: "Gender",
                }, createdAt: {
                    name: "createdAt",
                    type: "DateTime",
                    attributes: [{ "name": "@default", "args": [] }],
                }, updatedAt: {
                    name: "updatedAt",
                    type: "DateTime",
                    attributes: [{ "name": "@updatedAt", "args": [] }],
                }, owner: {
                    name: "owner",
                    type: "User",
                    isDataModel: true,
                    backLink: 'pets',
                    isRelationOwner: true,
                    foreignKeyMapping: { "id": "ownerId" },
                }, ownerId: {
                    name: "ownerId",
                    type: "String",
                    isForeignKey: true,
                    relationField: 'owner',
                }, appointments: {
                    name: "appointments",
                    type: "Appointment",
                    isDataModel: true,
                    isArray: true,
                    backLink: 'pet',
                },
            }
            , uniqueConstraints: {
                id: {
                    name: "id",
                    fields: ["id"]
                },
            }
            ,
        }
        ,
        appointment: {
            name: 'Appointment', fields: {
                id: {
                    name: "id",
                    type: "String",
                    isId: true,
                    attributes: [{ "name": "@default", "args": [] }],
                }, datetime: {
                    name: "datetime",
                    type: "DateTime",
                }, business: {
                    name: "business",
                    type: "Business",
                    isDataModel: true,
                    backLink: 'appointments',
                    isRelationOwner: true,
                    foreignKeyMapping: { "id": "businessId" },
                }, businessId: {
                    name: "businessId",
                    type: "String",
                    isForeignKey: true,
                    relationField: 'business',
                }, status: {
                    name: "status",
                    type: "Status",
                }, user: {
                    name: "user",
                    type: "User",
                    isDataModel: true,
                    backLink: 'appointments',
                    isRelationOwner: true,
                    foreignKeyMapping: { "id": "userId" },
                }, userId: {
                    name: "userId",
                    type: "String",
                    attributes: [{ "name": "@default", "args": [] }],
                    defaultValueProvider: $default$Appointment$userId,
                    isForeignKey: true,
                    relationField: 'user',
                }, pet: {
                    name: "pet",
                    type: "Pet",
                    isDataModel: true,
                    backLink: 'appointments',
                    isRelationOwner: true,
                    foreignKeyMapping: { "id": "petId" },
                }, petId: {
                    name: "petId",
                    type: "Int",
                    isForeignKey: true,
                    relationField: 'pet',
                }, totalPrice: {
                    name: "totalPrice",
                    type: "Int",
                }, note: {
                    name: "note",
                    type: "String",
                    isOptional: true,
                }, services: {
                    name: "services",
                    type: "AppointmentService",
                    isDataModel: true,
                    isArray: true,
                    backLink: 'appointment',
                },
            }
            , uniqueConstraints: {
                id: {
                    name: "id",
                    fields: ["id"]
                },
            }
            ,
        }
        ,
        timeSlot: {
            name: 'TimeSlot', fields: {
                id: {
                    name: "id",
                    type: "String",
                    isId: true,
                    attributes: [{ "name": "@default", "args": [] }],
                }, time: {
                    name: "time",
                    type: "String",
                }, business: {
                    name: "business",
                    type: "Business",
                    isDataModel: true,
                    backLink: 'timeslots',
                    isRelationOwner: true,
                    foreignKeyMapping: { "id": "businessId" },
                }, businessId: {
                    name: "businessId",
                    type: "String",
                    isForeignKey: true,
                    relationField: 'business',
                },
            }
            , uniqueConstraints: {
                id: {
                    name: "id",
                    fields: ["id"]
                }, time_businessId: {
                    name: "time_businessId",
                    fields: ["time", "businessId"]
                },
            }
            ,
        }
        ,
        appointmentService: {
            name: 'AppointmentService', fields: {
                id: {
                    name: "id",
                    type: "String",
                    isId: true,
                    attributes: [{ "name": "@default", "args": [] }],
                }, appointmentId: {
                    name: "appointmentId",
                    type: "String",
                    isForeignKey: true,
                    relationField: 'appointment',
                }, variantId: {
                    name: "variantId",
                    type: "String",
                    isForeignKey: true,
                    relationField: 'variant',
                }, appointment: {
                    name: "appointment",
                    type: "Appointment",
                    isDataModel: true,
                    backLink: 'services',
                    isRelationOwner: true,
                    foreignKeyMapping: { "id": "appointmentId" },
                }, variant: {
                    name: "variant",
                    type: "Variant",
                    isDataModel: true,
                    backLink: 'appointments',
                    isRelationOwner: true,
                    foreignKeyMapping: { "id": "variantId" },
                },
            }
            , uniqueConstraints: {
                id: {
                    name: "id",
                    fields: ["id"]
                }, appointmentId_variantId: {
                    name: "appointmentId_variantId",
                    fields: ["appointmentId", "variantId"]
                },
            }
            ,
        }
        ,
        notification: {
            name: 'Notification', fields: {
                id: {
                    name: "id",
                    type: "String",
                    isId: true,
                    attributes: [{ "name": "@default", "args": [] }],
                }, userMessage: {
                    name: "userMessage",
                    type: "String",
                    isOptional: true,
                }, businessMessage: {
                    name: "businessMessage",
                    type: "String",
                    isOptional: true,
                }, type: {
                    name: "type",
                    type: "NotificationType",
                }, createdAt: {
                    name: "createdAt",
                    type: "DateTime",
                    attributes: [{ "name": "@default", "args": [] }],
                }, readAt: {
                    name: "readAt",
                    type: "DateTime",
                    isOptional: true,
                }, user: {
                    name: "user",
                    type: "User",
                    isDataModel: true,
                    isOptional: true,
                    backLink: 'notifications',
                    isRelationOwner: true,
                    foreignKeyMapping: { "id": "userId" },
                }, userId: {
                    name: "userId",
                    type: "String",
                    isOptional: true,
                    isForeignKey: true,
                    relationField: 'user',
                }, business: {
                    name: "business",
                    type: "Business",
                    isDataModel: true,
                    isOptional: true,
                    backLink: 'notifications',
                    isRelationOwner: true,
                    foreignKeyMapping: { "id": "businessId" },
                }, businessId: {
                    name: "businessId",
                    type: "String",
                    isOptional: true,
                    isForeignKey: true,
                    relationField: 'business',
                },
            }
            , uniqueConstraints: {
                id: {
                    name: "id",
                    fields: ["id"]
                },
            }
            ,
        }
        ,
        verificationToken: {
            name: 'VerificationToken', fields: {
                identifier: {
                    name: "identifier",
                    type: "String",
                }, token: {
                    name: "token",
                    type: "String",
                    isId: true,
                }, expires: {
                    name: "expires",
                    type: "DateTime",
                },
            }
            , uniqueConstraints: {
                token: {
                    name: "token",
                    fields: ["token"]
                }, identifier_token: {
                    name: "identifier_token",
                    fields: ["identifier", "token"]
                },
            }
            ,
        }
        ,
    }
    ,
    deleteCascade: {
        user: ['Account', 'Session', 'Business', 'Pet', 'Appointment'],
        business: ['BusinessDocument', 'Service', 'Appointment', 'TimeSlot'],
        service: ['Variant'],
        variant: ['AppointmentService'],
        pet: ['Appointment'],
        appointment: ['AppointmentService'],
    }
    ,
    authModel: 'User'
};
function $default$Appointment$userId(user: any): unknown {
    return user?.id;
}
export default metadata;
