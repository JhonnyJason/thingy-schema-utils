import {
    BOOLEAN, NUMBER, ARRAY, OBJECT, STRING, STRINGEMAIL, STRINGHEX, STRINGHEX32, STRINGHEX64, STRINGHEX128, STRINGHEX256, STRINGHEX512, STRINGCLEAN, NONEMPTYSTRING, NONEMPTYSTRINGHEX, NONEMPTYSTRINGCLEAN, NONEMPTYARRAY, OBJECTCLEAN, NONNULLOBJECT, NONNULLOBJECTCLEAN, STRINGORNOTHING, STRINGEMAILORNOTHING, STRINGHEXORNOTHING, STRINGHEX32ORNOTHING, STRINGHEX64ORNOTHING, STRINGHEX128ORNOTHING, STRINGHEX256ORNOTHING, STRINGHEX512ORNOTHING, STRINGCLEANORNOTHING, NUMBERORNOTHING, BOOLEANORNOTHING, ARRAYORNOTHING, OBJECTORNOTHING, OBJECTCLEANORNOTHING, STRINGORNULL, STRINGEMAILORNULL, STRINGHEXORNULL, STRINGHEX32ORNULL, STRINGHEX64ORNULL, STRINGHEX128ORNULL, STRINGHEX256ORNULL, STRINGHEX512ORNULL, STRINGCLEANORNULL,  NUMBERORNULL, BOOLEANORNULL, ARRAYORNULL
} from "../output/index.js"

export const testsForSchema = []

// schema 0
testsForSchema.push({
    schema: {
        username: STRINGCLEAN,
        email: STRINGEMAIL,
        isAdmin: BOOLEANORNOTHING,
        subscribedUntil: NUMBERORNULL
    },
    validSamples:[
        {
            username: "lenny",
            email: "lenny@lenny.net",
            subscribedUntil: null
        },
        {
            username: "lenny",
            email: "lenny@lenny.net",
            isAdmin: true,
            subscribedUntil: null
        },
        {
            username: "lenny",
            email: "lenny@lenny.net",
            subscribedUntil: 4567
        }

    ],
    invalidSamples: [
        {
            username: "lenny",
            email: "lenny@lenny.net"
        },
        {
            email: "lenny@lenny.net",
            isAdmin: true,
            subscribedUntil: null
        },
        {
            username: "lenny",
            email: "lenny@lenny.net.",
            subscribedUntil: 4567
        },
        {
            username: "le\x00nny",
            email: "lenny@lenny.net",
            subscribedUntil: 4567
        },
        {
            username: "lenny",
            email: "lenny@lenny.net",
            isAdmin: "false",
            subscribedUntil: 4567
        },
        {
            username: "lenny",
            email: "lenny@lenny.net",
            subscribedUntil: "null"
        },
        {
            username: "lenny",
            isAdmin: true,
            subscribedUntil: null
        }

    ]
})

// schema 1
testsForSchema.push({
    schema: {
        userProfile: {
            name: NONEMPTYSTRINGCLEAN,
            age: NUMBERORNULL,
            hobbies: NONEMPTYARRAY,
            address: {
                street: STRINGORNOTHING,
                city: STRINGCLEAN,
                zip: STRINGHEX32ORNULL
            }
        },
        metadata: {
            createdAt: NUMBER,
            isActive: BOOLEANORNOTHING,
            tags: ARRAYORNULL
        }
    },
    validSamples: [
        {
            userProfile: {
                name: "Alice",
                age: 30,
                hobbies: ["reading", "hiking"],
                address: {
                    street: "123 Main St",
                    city: "Boston",
                    zip: "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4"
                }
            },
            metadata: {
                createdAt: 1625097600,
                isActive: true,
                tags: ["user", "premium"]
            }
        },
        {
            userProfile: {
                name: "Bob",
                age: null,
                hobbies: ["swimming"],
                address: {
                    city: "New York",
                    zip: null
                }
            },
            metadata: {
                createdAt: 1625097601,
                tags: null
            }
        }
    ],
    invalidSamples: [
        {
            userProfile: {
                name: "",
                age: 30,
                hobbies: ["reading", "hiking"],
                address: {
                    street: "123 Main St",
                    city: "Boston",
                    zip: "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2"
                }
            },
            metadata: {
                createdAt: 1625097600,
                isActive: true,
                tags: ["user", "premium"]
            }
        },
        {
            userProfile: {
                name: "Bob\x00",
                age: null,
                hobbies: [],
                address: {
                    city: "New York"
                }
            },
            metadata: {
                createdAt: 1625097601,
                tags: null
            }
        },
        {
            userProfile: {
                name: "Charlie",
                age: "thirty",
                hobbies: ["swimming"],
                address: {
                    city: "Los Angeles",
                    zip: "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2x" // 33 chars
                }
            },
            metadata: {
                createdAt: 1625097602,
                isActive: "yes",
                tags: ["user", "premium"]
            }
        }
    ]
});

// schema 2
testsForSchema.push({
    schema: {
        transaction: {
            id: STRINGHEX64,
            amount: NUMBER,
            currency: STRING,
            details: {
                description: STRINGCLEANORNULL,
                reference: STRINGHEX128ORNOTHING,
                items: ARRAYORNOTHING
            }
        },
        status: BOOLEAN
    },
    validSamples: [
        {
            transaction: {
                id: "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2",
                amount: 100.50,
                currency: "USD",
                details: {
                    description: "Payment for services",
                    reference: "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4",
                    items: ["item1", "item2"]
                }
            },
            status: true
        },
        {
            transaction: {
                id: "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2",
                amount: 75.25,
                currency: "EUR",
                details: {
                    description: null,
                    items: []
                }
            },
            status: false
        }
    ],
    invalidSamples: [
        {
            transaction: {
                id: "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2x", // 65 chars
                amount: 100.50,
                currency: "USD",
                details: {
                    description: "Payment for services",
                    reference: "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4",
                    items: ["item1", "item2"]
                }
            },
            status: true
        },
        {
            transaction: {
                id: "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2",
                amount: "100.50",
                currency: "USD",
                details: {
                    description: "Payment for services\x00",
                    reference: "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4",
                    items: ["item1", "item2"]
                }
            },
            status: true
        },
        {
            transaction: {
                id: "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2",
                amount: 100.50,
                currency: "USD",
                details: {
                    description: "Payment for services",
                    reference: "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4x", // 129 chars
                    items: ["item1", "item2"]
                }
            },
            status: true
        }
    ]
});

// schema 3
testsForSchema.push({
    schema: {
        config: {
            apiKey: STRINGHEX512ORNOTHING,
            timeout: NUMBERORNOTHING,
            retries: NUMBER,
            endpoints: NONEMPTYARRAY,
            metadata: OBJECTCLEANORNOTHING
        },
        flags: {
            debug: BOOLEAN,
            logLevel: STRINGORNULL
        }
    },
    validSamples: [
        {
            config: {
                apiKey: "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
                timeout: 30,
                retries: 3,
                endpoints: ["https://api.example.com/v1", "https://api.example.com/v2"],
                metadata: {
                    version: "1.0",
                    environment: "production"
                }
            },
            flags: {
                debug: false,
                logLevel: "info"
            }
        },
        {
            config: {
                timeout: 60,
                retries: 5,
                endpoints: ["https://api.example.com/v1"]
            },
            flags: {
                debug: true,
                logLevel: null
            }
        }
    ],
    invalidSamples: [
        {
            config: {
                apiKey: "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4x", // 513 chars
                timeout: 30,
                retries: 3,
                endpoints: ["https://api.example.com/v1", "https://api.example.com/v2"],
                metadata: {
                    version: "1.0",
                    environment: "production"
                }
            },
            flags: {
                debug: false,
                logLevel: "info"
            }
        },
        {
            config: {
                timeout: "30",
                retries: 3,
                endpoints: ["https://api.example.com/v1", "https://api.example.com/v2"],
                metadata: {
                    version: "1.0\x00",
                    environment: "production"
                }
            },
            flags: {
                debug: false,
                logLevel: "info"
            }
        },
        {
            config: {
                timeout: 30,
                retries: 3,
                endpoints: [],
                metadata: {
                    version: "1.0",
                    environment: "production"
                }
            },
            flags: {
                debug: false,
                logLevel: "info"
            }
        }
    ]
});

// schema 4
testsForSchema.push({
    schema: {
        apiKey: STRINGHEX512ORNOTHING,
        timeout: NUMBERORNOTHING,
        retries: NUMBER,
        endpoints: NONEMPTYARRAY
    },
    validSamples: [
        {
            apiKey: "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
            timeout: 30,
            retries: 3,
            endpoints: ["https://api.example.com/v1", "https://api.example.com/v2"]
        },
        {
            timeout: 60,
            retries: 5,
            endpoints: ["https://api.example.com/v1"]
        }
    ],
    invalidSamples: [
    ]
});


// schema 5
testsForSchema.push({
    schema: {
        apiKey: STRINGHEX512,
        timeout: NUMBER,
        retries: NUMBER,
        endpoint: STRINGCLEAN 
    },
    validSamples: [
        {
            apiKey: "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
            timeout: 30,
            retries: 3,
            endpoint: "https://api.example.com/v1"
        }
    ],
    invalidSamples: [
    ]
});


// schema 6
testsForSchema.push({
    schema: {
        apiKey: STRINGHEX,
        timeout: NUMBER,
        retries: NUMBER,
        endpoint: STRINGCLEAN 
    },
    validSamples: [
        {
            apiKey: "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1",
            timeout: 30,
            retries: 3,
            endpoint: "https://api.example.com/v1"
        }
    ],
    invalidSamples: [
    ]
});


// schema 7
testsForSchema.push({
    schema:  [
        STRINGORNOTHING,
        STRINGORNOTHING,
        STRINGORNOTHING,
        STRINGORNOTHING,
        STRINGORNOTHING,
        STRINGORNOTHING
    ],
    validSamples: [
        [
            "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1",
            "https://api.example.com/v1",
            "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1",
            "https://api.example.com/v1",
            "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1",
            "https://api.example.com/v1"

        ],
        [
            "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1",
            "https://api.example.com/v1",
            "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1",
            "https://api.example.com/v1"
        ],
        [
            "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1",
            "https://api.example.com/v1"
        ]
    ],
    invalidSamples: [
    ]
});

// schema 8
testsForSchema.push({
    schema:  ARRAY,
    validSamples: [
        [ 1,1,1,1,1,1 ]
    ],
    invalidSamples: [
    ]
});

// schema 9
testsForSchema.push({
    schema:  [ NUMBER, NUMBER, NUMBER, NUMBER, NUMBER, NUMBER ],
    validSamples: [
        [ 1,1,1,1,1,1 ]
    ],
    invalidSamples: [
    ]
});
