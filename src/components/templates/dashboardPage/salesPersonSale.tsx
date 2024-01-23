import { SaalesPersonsList } from '@/dummyData/sales';
import { Pie } from '@ant-design/plots';


function SalesPersonSale() {

    const config = {
        appendPadding: 10,
        data: SaalesPersonsList,
        angleField: 'total',
        colorField: 'name',
        radius: 0.9,
        // label: {
        //     type: 'inner',
        //     offset: '-30%',
        //     content: (props: any) => {
        //         console.log(props);
        //         return `${(props.percent * 100).toFixed(0)}%`
        //     },
        //     style: {
        //         fontSize: 14,
        //         textAlign: 'center',
        //     },
        // },
        interactions: [
            {
                type: 'element-active',
            },
        ],
    };
    return <Pie {...config} />;
}

export default SalesPersonSale