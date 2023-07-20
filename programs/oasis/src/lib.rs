use anchor_lang::prelude::*;

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

        // Initializing the product fields.
        product.name = name;
        product.description = description;
        product.price = price;
        product.available_quantity = available_quantity;
        product.owner = *ctx.accounts.user.key;
        Ok(())
    }

    // Instruction to initiate a purchase and create an escrow account
    pub fn initiate_purchase(ctx: Context<InitiatePurchase>, product_index: u64) -> Result<()> {
        // Implement the logic to initiate a purchase
        Ok(())
    }

    // Instruction for the buyer to confirm receipt of goods and release funds to the merchant
    pub fn confirm_receipt(ctx: Context<ConfirmReceipt>) -> Result<()> {
        // Implement the logic to confirm receipt and release funds
        Ok(())
    }
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq)]
pub enum UserType {
    Customer,
    MerChant,
}

#[account]
pub struct Profile {
    pub f_name: String,      // 20
    pub l_name: String,      // 20
    pub p_num: String,       // 10
    pub location: String,    // 50
    pub user_type: UserType, // 2
    pub bump: u8,            // 1
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
    #[account(init, payer = user, space = 20 + 100 + 8 + 8 + 32 + 32 +8, seeds = [b"user-product", name.as_bytes(), user.key().as_ref(), ], bump )]
    pub product: Account<'info, Product>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct InitiatePurchase {}

#[derive(Accounts)]
pub struct ConfirmReceipt {}
