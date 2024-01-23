import { SaalesPersonsList } from '@/dummyData/sales';
import { Pie } from '@ant-design/plots';


function SalesPersonSale() {
    const data = [
        {
            type: '分类一',
            value: 27,
        },
        {
            type: '分类二',
            value: 25,
        },
        {
            type: '分类三',
            value: 18,
        },
        {
            type: '分类四',
            value: 15,
        },
        {
            type: '分类五',
            value: 10,
        },
        {
            type: '其他',
            value: 5,
        },
    ];
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