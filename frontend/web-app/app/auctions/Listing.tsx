'use client'
import AuctionCard from "@/app/auctions/AuctionCard";
import {Auction, PageResult} from "@/types";
import {Fragment, useEffect, useState} from "react";
import AppPagination from "@/app/components/AppPagination";
import {getData} from "@/app/actions/auctionActions";
import Filters from "@/app/auctions/Filters";
import {useParamsStore} from "@/hooks/useParamsStore";
import {shallow} from "zustand/shallow";
import qs from 'query-string';
import EmptyFilter from "@/app/components/EmptyFilter";

export default function Listing() {
    const [data, setData] = useState<PageResult<Auction>>();
    const params = useParamsStore(state => ({
        pageNumber: state.pageNumber,
        pageSize: state.pageSize,
        searchTerm: state.searchTerm,
        orderBy: state.orderBy,
        filterBy: state.filterBy
    }), shallow);
    const setParams = useParamsStore(state => state.setParams);
    const url = qs.stringifyUrl({query: params,url: ''});
    function setPageNumber(pageNumber: number) {
        setParams({pageNumber})
    };
    useEffect(() => {
        getData(url).then(data => {
            setData(data)
        })
    }, [url])
    if(!data) return <h3>Loading...</h3>
    return (
        <Fragment>
            <Filters />
            {data.totalCount === 0 ? (
                <EmptyFilter showReset /> ): (
                    <>
                        <div className={'grid grid-cols-4 gap-6'}>
                            {data.result.map((auction: Auction) => (
                                <AuctionCard auction={auction} key={auction.id}/>
                            ))}
                        </div>
                        <div className={'flex justify-center mt-4'}>
                            <AppPagination currentPage={params.pageNumber} pageCount={data.pageCount} pageChanged={setPageNumber} />
                        </div>
                    </>
            )}

        </Fragment>
    )
}
