use anchor_lang::prelude::*;

#[error_code]
pub enum ErrCode {
    #[msg("Invalid max purchased for not kyc users")]
    MaxPurchaseForKYCUserNotValid,
    #[msg("Invalid params")]
    InvalidParam,
    #[msg("Not funded yet")]
    NotFunded,
    #[msg("Not claimable")]
    NotClaimable,
    #[msg("Not claimable amount")]
    NotclaimableAmount,
    #[msg("Inavalid token fee percentage")]
    InvalidTokenFeePercentage,
    #[msg("Invalid amount")]
    InvalidAmount,
    #[msg("Invalid galaxy pool proportion")]
    InvalidGalaxyPoolProportion,
    #[msg("Invalid early access proportion")]
    InvalidEarlyAccessProportion,
    #[msg("Invalid Time")]
    InvalidTime,
    #[msg("Invalid TGE percentage")]
    InvalidTGEPercentage,
    #[msg("Not allowed to adjust tge date exceeds attempts")]
    NotAllowedToAdjustTGEDateExceedsAttempts,
    #[msg("Not allowed to adjust tge date too far")]
    NotAllowedToAdjustTGEDateTooFar,
    #[msg("Time out buy ido token")]
    TimeOutBuyIDOToken,
    #[msg("Exceed max purchase amount for early access")]
    ExceedMaxPurchaseAmountForEarlyAccess,
}