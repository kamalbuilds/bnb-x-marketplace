import { GET_DATA } from "../graphql/queries";
import { useLazyQuery } from '@apollo/client';
import useState from "react"

function data() {
    const [getData, { data, error }] = useLazyQuery(GET_DATA);
    console.log('pairDayDatas ', data, error);
    console.log(data.pairDayDatas,'k');
}
export default data;