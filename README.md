<h1 align="center">Oasis DApp</h1>

<p align="center">
  <strong>A decentralized application (DApp) for secure and transparent transactions on the Solana blockchain.</strong>
</p>

## Links
* [Landing page](https://oasis.turbosite.io/)
* [Store website](https://oasis-csr4.vercel.app/)


## Table of Contents

- [Links](#links)
- [Table of Contents](#table-of-contents)
- [Description](#description)
- [Functionality](#functionality)
  - [1. Setup Account Profile](#1-setup-account-profile)
  - [2. Create Product Listings](#2-create-product-listings)
  - [3. Initiate Purchase](#3-initiate-purchase)
  - [4. Confirm Receipt](#4-confirm-receipt)
  - [5. Withdraw Funds](#5-withdraw-funds)
- [Data Structures](#data-structures)
  - [1. Profile](#1-profile)
  - [2. Product](#2-product)
  - [3. Escrow](#3-escrow)
  - [4. Master](#4-master)
- [Error Codes](#error-codes)
- [Getting Started](#getting-started)
- [Contributing](#contributing)
- [License](#license)

## Description

Oasis is a decentralized application (DApp) built on the Solana blockchain that enables users to make secure transactions without relying on traditional intermediaries. The DApp leverages an escrow-based system to ensure trust and transparency during the transaction process.

## Functionality

The Oasis DApp offers the following functionalities:

### 1. Setup Account Profile

Users can set up their account profiles by providing essential personal information such as first name, last name, phone number, location, and user type (customer or merchant).

### 2. Create Product Listings

Merchants can create product listings by specifying the product's name, description, price, and available quantity. Each product is assigned a unique identifier.

### 3. Initiate Purchase

Customers can initiate a purchase by providing the amount and the product ID they wish to buy. This action creates an escrow account to hold the funds until the transaction is completed.

### 4. Confirm Receipt

Once the customer receives the goods and verifies their satisfaction, they can confirm the receipt of goods. This step releases the funds from the escrow account to the merchant.

### 5. Withdraw Funds

Merchants can withdraw their funds from the escrow account once the customer confirms receipt of goods.

## Data Structures

### 1. Profile

- Stores user information such as first name, last name, phone number, location, user type, and the public key of the user's authority.

### 2. Product

- Represents a product listing with fields like name, description, price, available quantity, and the public key of the owner.

### 3. Escrow

- Contains details for a product transaction, including the associated product account public key, product ID, seller's account public key, buyer's account public key, transaction amount, and the current stage of the escrow.

### 4. Master

- Keeps track of the last product ID, ensuring unique identifiers for each product.

## Error Codes

The DApp defines the following error codes:

1. InvalidOwner: When the user trying to withdraw funds is not the owner of the product.
2. InvalidWithdrawAmount: When attempting to withdraw an insufficient amount from the escrow account.
3. InvalidStage: When trying to perform an action at the wrong stage of the escrow process.
4. InvalidBuyer: When the buyer account associated with the escrow does not match the initiator of the transaction.

## Getting Started

To get started with the Oasis DApp, follow these steps:

1. Clone the repository.
2. Install the required dependencies.
3. Build and deploy the DApp on the Solana blockchain.
4. Interact with the DApp using the provided API.

## Contributing

Contributions are welcome! To contribute to the Oasis DApp, follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and push the branch to your fork.
4. Submit a pull request to the main repository.

## License

This project is licensed under the [MIT License](LICENSE).

---

Feel free to explore and use the Oasis DApp for secure and decentralized transactions on the Solana blockchain. If you encounter any issues or have suggestions for improvements, please let us know through the [Issues](https://github.com/onyedikachi-david/oasis/issues) section. Happy trading in the oasis!
