use anchor_lang::prelude::*;

#[account]
pub struct PoolStorage {
    pub owner: Pubkey,
    pub purchase_token: Pubkey,
    pub offered_currency: OfferedCurrency,
    pub max_purchase_amount_for_early_access: u64,
    pub max_purchase_amount_for_kyc_user: u64,
    pub max_purchase_amount_for_not_kyc_user: u64,
    pub token_fee_percentage: u16,
    pub token_fee_cliamed_status: bool,
    pub early_pool_participation_fee_percentage: u16,
    pub open_pool_participation_fee_percentage: u16,
    pub open_pool_proportion: u16,
    pub early_pool_proportion: u16,
    pub total_raise_amount: u64,
    pub early_pool_open_time: i64,
    pub early_pool_close_time: i64,
    pub open_pool_open_time: i64,
    pub open_pool_close_time: i64,
    pub participation_fee_amount: u16,
    pub participation_fee_claimed_status: bool,
    pub purchased_amount_in_open_pool: u64,
    pub purchased_amount_in_early_access: u64,
    pub purchased_amount: u64,
    pub fund_claimed_amount: u64,
    pub bump: u8,
    pub purchase_bump: u8,
}

#[derive(Debug, Clone, AnchorSerialize, AnchorDeserialize)]
pub struct OfferedCurrency {
    pub rate: u64,
    pub decimals: u16,
}

#[account]
pub struct UserPurchaseAccount {
    pub principal: u64,
    pub fee: u64,
    pub withdrawn: u64,
    pub whale_purchased: u64,
}

#[account]
pub struct UserVestingAccount {
    pub total_amount: u64,
    pub claimed_amount: u64,
}

