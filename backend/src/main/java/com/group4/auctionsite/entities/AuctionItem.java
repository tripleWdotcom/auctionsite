package com.group4.auctionsite.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "auction_item")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuctionItem {

    @Id
    @GeneratedValue
    private long id;

    @ManyToOne
    private long userId;

    @OneToMany
    private long categoryId;

    private String description;
    private String title;
    private long startTime;
    private long endTime;
    private int currentBid;
    private int startPrice;
    private int currentViews;
    private int numberOfBids;

}
