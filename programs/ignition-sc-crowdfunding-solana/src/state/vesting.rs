use anchor_lang::prelude::*;

#[account]
pub struct VestingStorage {
    pub ido_token: Pubkey,
    pub tge_date: i64,
    pub tge_percentage: u16,
    pub vesting_cliff: i64,
    pub vesting_freguency: u64,
    pub number_of_vesting_release: u64,
    pub total_funded_amount: u64,
    pub funded: bool,
    pub claimable: bool,
    pub emergency_cancelled: bool,
    pub private_raise: bool,
    pub bump: u8,
    pub owner: Pubkey,
    pub vault_bump: u8,
    pub initial_tge_date: i64,
    pub tge_update_attempts: u8,
}