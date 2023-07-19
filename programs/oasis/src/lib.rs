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

    pub fn create_product(ctx: Context<CreateProduct>) -> Result<()> {
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
    #[account(init, payer = user, space = 20 + 20 + 10 + 50 + 8 +2+1, seeds = [b"user-profile", user.key().as_ref()], bump)]
    pub profile: Account<'info, Profile>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct Product {}

#[derive(Accounts)]
pub struct CreateProduct {}

#[derive(Accounts)]
pub struct InitiatePurchase {}

#[derive(Accounts)]
pub struct ConfirmReceipt {}
