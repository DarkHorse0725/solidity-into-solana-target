pub fn calculate_claimable_amount(
    total_amount: u64,
    claimed_amount: u64,
    tge_percentage: u16,
    tge_date: i64,
    vesting_cliff: i64,
    vesting_frequency: u64,
    number_of_vesting_release: u64,
    time_stamp: i64
) -> u64 {
    let tge_amount: u64 = (total_amount * (tge_percentage as u64)) / 10000;
    // in cliff time
    if time_stamp < tge_date + vesting_cliff {
        return tge_amount - claimed_amount;
    }

    // after vesting duration
    let release_index: u64 =
        ((time_stamp - tge_date - vesting_cliff) as u64) / vesting_frequency + 1;
    if release_index >= number_of_vesting_release || vesting_frequency == 0 {
        return total_amount - claimed_amount;
    }

    //  in vesting duration
    let total_claimalble_except_tge_amount = total_amount - tge_amount;
    return 
        (release_index * total_claimalble_except_tge_amount) / number_of_vesting_release +
        tge_amount -
        claimed_amount;
}
