import { gql } from '@apollo/client';

export const GET_DATA = gql`
    query data {
        
  pairDayDatas(
    first: 3
    skip: 0
    where: {date_gt: 1659312000, pairAddress: "0xfFE8df2f623BFD954D785809185bEB291330C70d"}
  ) {
    pairAddress
    date
    dailyVolumeUSD
    dailyTxns
    dailyVolumeToken0
    dailyVolumeToken1
    reserve0
    reserve1
    reserveUSD
    totalSupply
  }

    }
`