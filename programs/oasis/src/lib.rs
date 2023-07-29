// use anchor_lang::prelude::*;

use anchor_lang::{
    prelude::*,
    solana_program::{clock::Clock, hash::hash, program::invoke, system_instruction::transfer},
};

declare_id!("B7oHWTujVfjuyahjLgzroVAHNphsRgTM343JQDncJFwP");

#[program]
pub mod oasis {
    use super::*;

    pub fn setup_account(
        ctx: Context<SetupAccountProfile>,
        f_name: String,
        l_name: String,
        p_num: String,
        location: String,
        user_type: UserType,
    ) -> Result<()> {
        let profile = &mut ctx.accounts.profile;

        // Initializing the profile fields
        profile.f_name = f_name;
        profile.l_name = l_name;
        profile.p_num = p_num;
        profile.location = location;
        profile.user_type = user_type;
        profile.authority = ctx.accounts.user.key();
        Ok(())
    }

    pub fn create_product(
        ctx: Context<CreateProduct>,
        name: String,
        description: String,
        price: u64,
        available_quantity: u64,
    ) -> Result<()> {
        let product = &mut ctx.accounts.product;
        // let master = &mut ctx.accounts.master;
        // Initializing the product fields.
        product.name = name;
        product.description = description;
        product.price = price;
        product.available_quantity = available_quantity;
        product.owner = *ctx.accounts.user.key;
        // master.last_id += 1;
        product.id += 1;
        Ok(())
    }

    // Instruction to initiate a purchase and create an escrow account
    pub fn initiate_purchase(
        ctx: Context<InitiatePurchase>,
        amount: u64,
        product_id: u64,
    ) -> Result<()> {
        let product_escrow = &mut ctx.accounts.product_escrow;
        let buyer = &mut ctx.accounts.user;
        let product_owner = &ctx.accounts.product.owner.key();
        // Transfer funds from the buyer to the escrow PDA
        invoke(
            &transfer(&buyer.key(), &product_escrow.key(), amount),
            &[
                buyer.to_account_info(),
                product_escrow.to_account_info(),
                ctx.accounts.system_program.to_account_info(),
            ],
        )?;

        // Update the escrow account with buyer and locked amount
        product_escrow.seller_account = Some(*product_owner);
        product_escrow.product_amount = amount;
        product_escrow.product_id = product_id;

        // Update the stage of the escrow to AwaitingConfirmation
        product_escrow.stage = Stage::AwaitingConfirmation;

        Ok(())
    }

    // Instruction for the buyer to confirm receipt of goods and release funds to the merchant
    pub fn confirm_receipt(ctx: Context<ConfirmReceipt>) -> Result<()> {
        let escrow = &mut ctx.accounts.escrow_pda;
        let buyer = &ctx.accounts.buyer.to_account_info();
        let seller_acc = &ctx.accounts.product.owner.key();

        // Check if the escrow stage is AwaitingConfirmation
        if escrow.stage != Stage::AwaitingConfirmation {
            return Err(ErrorCode::InvalidStage.into());
        }

        // Check if the buyer is the owner of the escrow account
        if escrow.buyer_account != Some(*buyer.key) {
            return Err(ErrorCode::InvalidBuyer.into());
        }

        // Update the stage of the escrow to Completed
        escrow.stage = Stage::Completed;

        Ok(())
    }

    // Instruction for the merchant to withdraw
    pub fn withdraw(ctx: Context<Withdraw>) -> Result<()> {
        let escrow_pda = &ctx.accounts.escrow_pda;
        let user = &ctx.accounts.authority;
        let product = &ctx.accounts.product;

        if user.key() != product.owner.key() {
            return Err(ErrorCode::InvalidOwner.into());
        }

        // Transfer funds from the escrow to the merchant's account
        invoke(
            &transfer(
                &ctx.accounts.escrow_pda.to_account_info().key,
                user.to_account_info().key,
                escrow_pda.product_amount,
            ),
            &[
                ctx.accounts.escrow_pda.to_account_info(),
                ctx.accounts.authority.to_account_info(),
                ctx.accounts.system_program.to_account_info(),
            ],
        )?;
        Ok(())
    }
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq)]
pub enum UserType {
    Customer,
    MerChant,
}

// #[derive(Clone, Copy, PartialEq)]
#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq)]

pub enum Stage {
    Initiated,
    AwaitingConfirmation,
    Completed,
}

#[account]
pub struct Profile {
    pub f_name: String,      // 20
    pub l_name: String,      // 20
    pub p_num: String,       // 10
    pub location: String,    // 50
    pub user_type: UserType, // 2
    pub bump: u8,            // 1
    pub authority: Pubkey,   // 32
}

#[derive(Accounts)]
pub struct SetupAccountProfile<'info> {
    // Use this type for the space calculation: space = 8 + 32 + 1 + 4 + title.len() + 4 + description.len()
    #[account(init, payer = user, space = 20 + 20 + 10 + 50 + 8 +2+1, seeds = [b"user-profile", user.key().as_ref()], bump)]
    pub profile: Account<'info, Profile>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct Product {
    pub id: u32,
    pub name: String,
    pub description: String,
    pub price: u64,
    pub available_quantity: u64,
    pub owner: Pubkey,
    // pub escrow_account: Pubkey,
}

#[derive(Accounts)]
#[instruction(name: String)]
pub struct CreateProduct<'info> {
    #[account(init, payer = user, space = 8 + 20 + 100 + 8 + 8 + 32 + 32 + 8, seeds = [b"user-product", name.as_bytes(), user.key().as_ref(), ], bump )]
    pub product: Account<'info, Product>,
    // #[account(
    //     init,
    //     payer = user,
    //     space = 8 + 4,
    //     seeds = [b"master"],
    //     bump,
    // )]
    // pub master: Account<'info, Master>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

/// Escrow account details for a product transaction.
#[account]
pub struct Escrow {
    /// Public key of the product account associated with the escrow.
    pub product_account: Pubkey,

    /// Unique identifier for the product.
    pub product_id: u64,

    /// Public key of the seller's account.
    pub seller_account: Option<Pubkey>,

    /// Public key of the buyer's account.
    pub buyer_account: Option<Pubkey>,

    /// Amount of the product being transacted.
    pub product_amount: u64,

    /// Stage of the escrow transaction.
    pub stage: Stage,
    // Bump value for account owner verification.
    // pub bump: u8,
}

#[account]
pub struct Master {
    pub last_id: u32,
}

#[derive(Accounts)]
#[instruction(product_id: u32)]
pub struct InitiatePurchase<'info> {
    #[account(init, payer = user, space = 32 + 1 + 8, seeds = [b"product_escrow", product.key().as_ref(), &product_id.to_le_bytes()], bump)]
    product_escrow: Account<'info, Escrow>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub product: Account<'info, Product>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct ConfirmReceipt<'info> {
    #[account(init, payer = buyer, space = 32 + 8 + 32 + 32 + 8 + 1 + 8 , seeds = [b"product_escrow", buyer.key().as_ref(), product.key().as_ref()], bump)]
    pub escrow_pda: Account<'info, Escrow>,
    pub product: Account<'info, Product>,
    #[account(mut)]
    pub buyer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Withdraw<'info> {
    #[account(mut)]
    pub escrow_pda: Account<'info, Escrow>,
    #[account()]
    pub product: Account<'info, Product>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[error_code]
pub enum ErrorCode {
    #[msg("The user is not the owner of the product.")]
    InvalidOwner,
    #[msg("Insufficient amount to withdraw.")]
    InvalidWithdrawAmount,
    #[msg("Wrong stage.")]
    InvalidStage,
    #[msg("Insufficient amount to withdraw.")]
    InvalidBuyer,
}
