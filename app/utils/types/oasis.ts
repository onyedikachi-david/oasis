export type Oasis = {
  "version": "0.1.0",
  "name": "oasis",
  "instructions": [
    {
      "name": "setupAccount",
      "docs": [
        "Initializes a new user profile account.",
        "",
        "# Arguments",
        "",
        "* `ctx` - Context object containing accounts and other metadata.",
        "* `f_name` - User's first name.",
        "* `l_name` - User's last name.",
        "* `p_num` - User's phone number.",
        "* `location` - User's location.",
        "* `user_type` - User type (Customer or Merchant).",
        "",
        "# Accounts",
        "",
        "* `profile` - New Profile account to initialize.",
        "* `user` - Account of the user initializing the profile.",
        "* `system_program` - System program for account creation.",
        "",
        "Initializes a new Profile account with the provided parameters.",
        "The Profile account is marked as owned by the initializing user."
      ],
      "accounts": [
        {
          "name": "profile",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "user-profile"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "fName",
          "type": "string"
        },
        {
          "name": "lName",
          "type": "string"
        },
        {
          "name": "pNum",
          "type": "string"
        },
        {
          "name": "location",
          "type": "string"
        },
        {
          "name": "userType",
          "type": {
            "defined": "UserType"
          }
        }
      ]
    },
    {
      "name": "initCounter",
      "docs": [
        "Initializes the counter account.",
        "",
        "Accounts:",
        "- counter: Counter account to initialize.",
        "- payer: Account paying for initialization.",
        "- system_program: System program.",
        ""
      ],
      "accounts": [
        {
          "name": "counter",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "counter"
              }
            ]
          }
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "createProduct",
      "docs": [
        "Initializes a new product account.",
        "",
        "Parameters:",
        "- name: Name of the product.",
        "- description: Description of the product.",
        "- price: Price of the product.",
        "- available_quantity: Available quantity for sale.",
        "",
        "Accounts:",
        "- product: New product account to initialize.",
        "- counter: Counter account to increment.",
        "- user: User account creating the product listing.",
        "",
        "Initializes a new product account with provided parameters.",
        "Increments the counter to generate a new ID, and sets the owner",
        "to the initializing user."
      ],
      "accounts": [
        {
          "name": "product",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "user-product"
              },
              {
                "kind": "arg",
                "type": "string",
                "path": "name"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "counter",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "counter"
              }
            ]
          }
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "description",
          "type": "string"
        },
        {
          "name": "price",
          "type": "u64"
        },
        {
          "name": "availableQuantity",
          "type": "u64"
        }
      ]
    },
    {
      "name": "initiatePurchase",
      "docs": [
        "Initiates a new purchase and creates an escrow account.",
        "",
        "Parameters:",
        "- amount: Amount of tokens to transfer into escrow.",
        "- product_id: Unique ID of the product being purchased.",
        "",
        "Accounts:",
        "- product_escrow: New escrow account to create.",
        "- user: Buyer account initiating purchase.",
        "- product: Product account being purchased.",
        "",
        "Transfers tokens from buyer into a new escrow account.",
        "Updates escrow with purchase details."
      ],
      "accounts": [
        {
          "name": "productEscrow",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "product_escrow"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Product",
                "path": "product"
              },
              {
                "kind": "arg",
                "type": "u32",
                "path": "product_id"
              }
            ]
          }
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "product",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "productId",
          "type": "u64"
        }
      ]
    },
    {
      "name": "confirmReceipt",
      "docs": [
        "Allows buyer to confirm receipt and release escrowed funds.",
        "",
        "Accounts:",
        "- escrow_pda: Escrow account to update.",
        "- buyer: Buyer account confirming receipt.",
        "- product: Product account associated with escrow.",
        "",
        "Checks escrow stage and buyer match. If valid, releases",
        "escrow funds by marking stage as completed."
      ],
      "accounts": [
        {
          "name": "escrowPda",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "product_escrow"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "buyer"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Product",
                "path": "product"
              }
            ]
          }
        },
        {
          "name": "product",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "buyer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "withdraw",
      "docs": [
        "Allows merchant to withdraw funds from the escrow account.",
        "",
        "Accounts:",
        "- escrow_pda: Escrow account to withdraw from.",
        "- authority: Merchant account to withdraw funds.",
        "- product: Product account associated with escrow.",
        "",
        "Verifies merchant owns product, transfers escrowed",
        "funds to merchant account."
      ],
      "accounts": [
        {
          "name": "escrowPda",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "product",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "profile",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "fName",
            "type": "string"
          },
          {
            "name": "lName",
            "type": "string"
          },
          {
            "name": "pNum",
            "type": "string"
          },
          {
            "name": "location",
            "type": "string"
          },
          {
            "name": "userType",
            "type": {
              "defined": "UserType"
            }
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "authority",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "product",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "id",
            "type": "u32"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "description",
            "type": "string"
          },
          {
            "name": "price",
            "type": "u64"
          },
          {
            "name": "availableQuantity",
            "type": "u64"
          },
          {
            "name": "owner",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "escrow",
      "docs": [
        "Escrow account details for a product transaction."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "productAccount",
            "docs": [
              "Public key of the product account associated with the escrow."
            ],
            "type": "publicKey"
          },
          {
            "name": "productId",
            "docs": [
              "Unique identifier for the product."
            ],
            "type": "u64"
          },
          {
            "name": "sellerAccount",
            "docs": [
              "Public key of the seller's account."
            ],
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "buyerAccount",
            "docs": [
              "Public key of the buyer's account."
            ],
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "productAmount",
            "docs": [
              "Amount of the product being transacted."
            ],
            "type": "u64"
          },
          {
            "name": "stage",
            "docs": [
              "Stage of the escrow transaction."
            ],
            "type": {
              "defined": "Stage"
            }
          }
        ]
      }
    },
    {
      "name": "counter",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "lastId",
            "type": "u32"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "UserType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Customer"
          },
          {
            "name": "MerChant"
          }
        ]
      }
    },
    {
      "name": "Stage",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Initiated"
          },
          {
            "name": "AwaitingConfirmation"
          },
          {
            "name": "Completed"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidOwner",
      "msg": "The user is not the owner of the product."
    },
    {
      "code": 6001,
      "name": "InvalidWithdrawAmount",
      "msg": "Insufficient amount to withdraw."
    },
    {
      "code": 6002,
      "name": "InvalidStage",
      "msg": "Wrong stage."
    },
    {
      "code": 6003,
      "name": "InvalidBuyer",
      "msg": "Insufficient amount to withdraw."
    }
  ]
};

export const IDL: Oasis = {
  "version": "0.1.0",
  "name": "oasis",
  "instructions": [
    {
      "name": "setupAccount",
      "docs": [
        "Initializes a new user profile account.",
        "",
        "# Arguments",
        "",
        "* `ctx` - Context object containing accounts and other metadata.",
        "* `f_name` - User's first name.",
        "* `l_name` - User's last name.",
        "* `p_num` - User's phone number.",
        "* `location` - User's location.",
        "* `user_type` - User type (Customer or Merchant).",
        "",
        "# Accounts",
        "",
        "* `profile` - New Profile account to initialize.",
        "* `user` - Account of the user initializing the profile.",
        "* `system_program` - System program for account creation.",
        "",
        "Initializes a new Profile account with the provided parameters.",
        "The Profile account is marked as owned by the initializing user."
      ],
      "accounts": [
        {
          "name": "profile",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "user-profile"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "fName",
          "type": "string"
        },
        {
          "name": "lName",
          "type": "string"
        },
        {
          "name": "pNum",
          "type": "string"
        },
        {
          "name": "location",
          "type": "string"
        },
        {
          "name": "userType",
          "type": {
            "defined": "UserType"
          }
        }
      ]
    },
    {
      "name": "initCounter",
      "docs": [
        "Initializes the counter account.",
        "",
        "Accounts:",
        "- counter: Counter account to initialize.",
        "- payer: Account paying for initialization.",
        "- system_program: System program.",
        ""
      ],
      "accounts": [
        {
          "name": "counter",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "counter"
              }
            ]
          }
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "createProduct",
      "docs": [
        "Initializes a new product account.",
        "",
        "Parameters:",
        "- name: Name of the product.",
        "- description: Description of the product.",
        "- price: Price of the product.",
        "- available_quantity: Available quantity for sale.",
        "",
        "Accounts:",
        "- product: New product account to initialize.",
        "- counter: Counter account to increment.",
        "- user: User account creating the product listing.",
        "",
        "Initializes a new product account with provided parameters.",
        "Increments the counter to generate a new ID, and sets the owner",
        "to the initializing user."
      ],
      "accounts": [
        {
          "name": "product",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "user-product"
              },
              {
                "kind": "arg",
                "type": "string",
                "path": "name"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "counter",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "counter"
              }
            ]
          }
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "description",
          "type": "string"
        },
        {
          "name": "price",
          "type": "u64"
        },
        {
          "name": "availableQuantity",
          "type": "u64"
        }
      ]
    },
    {
      "name": "initiatePurchase",
      "docs": [
        "Initiates a new purchase and creates an escrow account.",
        "",
        "Parameters:",
        "- amount: Amount of tokens to transfer into escrow.",
        "- product_id: Unique ID of the product being purchased.",
        "",
        "Accounts:",
        "- product_escrow: New escrow account to create.",
        "- user: Buyer account initiating purchase.",
        "- product: Product account being purchased.",
        "",
        "Transfers tokens from buyer into a new escrow account.",
        "Updates escrow with purchase details."
      ],
      "accounts": [
        {
          "name": "productEscrow",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "product_escrow"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Product",
                "path": "product"
              },
              {
                "kind": "arg",
                "type": "u32",
                "path": "product_id"
              }
            ]
          }
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "product",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "productId",
          "type": "u64"
        }
      ]
    },
    {
      "name": "confirmReceipt",
      "docs": [
        "Allows buyer to confirm receipt and release escrowed funds.",
        "",
        "Accounts:",
        "- escrow_pda: Escrow account to update.",
        "- buyer: Buyer account confirming receipt.",
        "- product: Product account associated with escrow.",
        "",
        "Checks escrow stage and buyer match. If valid, releases",
        "escrow funds by marking stage as completed."
      ],
      "accounts": [
        {
          "name": "escrowPda",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "product_escrow"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "buyer"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "account": "Product",
                "path": "product"
              }
            ]
          }
        },
        {
          "name": "product",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "buyer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "withdraw",
      "docs": [
        "Allows merchant to withdraw funds from the escrow account.",
        "",
        "Accounts:",
        "- escrow_pda: Escrow account to withdraw from.",
        "- authority: Merchant account to withdraw funds.",
        "- product: Product account associated with escrow.",
        "",
        "Verifies merchant owns product, transfers escrowed",
        "funds to merchant account."
      ],
      "accounts": [
        {
          "name": "escrowPda",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "product",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "profile",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "fName",
            "type": "string"
          },
          {
            "name": "lName",
            "type": "string"
          },
          {
            "name": "pNum",
            "type": "string"
          },
          {
            "name": "location",
            "type": "string"
          },
          {
            "name": "userType",
            "type": {
              "defined": "UserType"
            }
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "authority",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "product",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "id",
            "type": "u32"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "description",
            "type": "string"
          },
          {
            "name": "price",
            "type": "u64"
          },
          {
            "name": "availableQuantity",
            "type": "u64"
          },
          {
            "name": "owner",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "escrow",
      "docs": [
        "Escrow account details for a product transaction."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "productAccount",
            "docs": [
              "Public key of the product account associated with the escrow."
            ],
            "type": "publicKey"
          },
          {
            "name": "productId",
            "docs": [
              "Unique identifier for the product."
            ],
            "type": "u64"
          },
          {
            "name": "sellerAccount",
            "docs": [
              "Public key of the seller's account."
            ],
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "buyerAccount",
            "docs": [
              "Public key of the buyer's account."
            ],
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "productAmount",
            "docs": [
              "Amount of the product being transacted."
            ],
            "type": "u64"
          },
          {
            "name": "stage",
            "docs": [
              "Stage of the escrow transaction."
            ],
            "type": {
              "defined": "Stage"
            }
          }
        ]
      }
    },
    {
      "name": "counter",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "lastId",
            "type": "u32"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "UserType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Customer"
          },
          {
            "name": "MerChant"
          }
        ]
      }
    },
    {
      "name": "Stage",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Initiated"
          },
          {
            "name": "AwaitingConfirmation"
          },
          {
            "name": "Completed"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidOwner",
      "msg": "The user is not the owner of the product."
    },
    {
      "code": 6001,
      "name": "InvalidWithdrawAmount",
      "msg": "Insufficient amount to withdraw."
    },
    {
      "code": 6002,
      "name": "InvalidStage",
      "msg": "Wrong stage."
    },
    {
      "code": 6003,
      "name": "InvalidBuyer",
      "msg": "Insufficient amount to withdraw."
    }
  ]
};
