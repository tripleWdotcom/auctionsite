package com.group4.auctionsite.repositories;

import com.group4.auctionsite.entities.Bid;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface BidRepository extends JpaRepository<Bid, Long> {

    @Query(value = "SELECT MAX(bid) FROM bid WHERE item_id = ?1", nativeQuery = true)
    int findMaxBidByItemId(long itemId);

    @Query(value = "SELECT COUNT(bid) FROM bid WHERE item_id = ?1", nativeQuery = true)
    int numberOfBidsByItemId(long itemId);
}