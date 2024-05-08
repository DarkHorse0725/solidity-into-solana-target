pub const PERCENTAGE_DENOMINATOR: u64 = 10000;
pub const LOCKUP_DURATION: i64 = 86400 * 2; // 2 days
pub const MIN_GALAXY_PARTICIPATION_FEE_PERCENTAGE: u16 = 0;
pub const MIN_CROWD_FUNDING_PARTICIPATION_FEE_PERCENTAGE: u16 = 0;
pub const MAX_GALAXY_PARTICIPATION_FEE_PERCENTAGE: u16 = 5000;
pub const MAX_CROWD_FUNDING_PARTICIPATION_FEE_PERCENTAGE: u16 = 5000;

pub const MAX_TGE_DATE_ADJUSTMENT: i64 = 86400 * 730; // 730 days
pub const MAX_TGE_DATE_ADJUSTMENT_ATTEMPTS: u8 = 2;

pub fn calculate_participiant_fee(purchase_amount: u64, participation_fee_percentage: u16) -> u64 {
    if participation_fee_percentage == 0 {
        return 0;
    }
    return (purchase_amount * (participation_fee_percentage as u64)) / PERCENTAGE_DENOMINATOR;
}

pub fn max_purchase_amount_for_early_access(
    total_raise_amount: u64,
    open_pool_proportion: u64,
    early_pool_proportion: u64
) -> u64 {
    return 
        (total_raise_amount *
            (PERCENTAGE_DENOMINATOR - open_pool_proportion) *
            early_pool_proportion) /
        PERCENTAGE_DENOMINATOR /
        PERCENTAGE_DENOMINATOR;
}
