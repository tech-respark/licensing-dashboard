import { Pie } from '@ant-design/plots';
// import { useEffect } from 'react';


function PieChartView({ type, valueKey, salesRequestsList }: any) {
    const data: any = [];
    let chartsData: any = [];
    // salesRequestsList.map((item: any) => {
    //     let isPresent = chartsData.findIndex((i: any) => i.title == item[chartKeyDetails.key])
    //     if (isPresent != -1) {
    //         chartsData[isPresent] = { ...chartsData[isPresent], value: getTofixValue(Number(chartsData[isPresent].value) + Number(item[chartKeyDetails.valueKey])) }
    //     } else {
    //         PIE_CHART_COLORS.push(getRandomDarkColor())
    //         chartsData = [...chartsData, { title: item[chartKeyDetails.key], value: Number(item[chartKeyDetails.valueKey]), color: PIE_CHART_COLORS[chartsData.length] }]
    //     }
    // })

    salesRequestsList.map((request: any) => {
        let index = data.findIndex((s: any) => s.name == request[type]);
        if (index != -1) {
            data[index].Total = Number((Number(request.sellingPrice) + Number(data[index].Total)).toFixed());
            data[index].Count = (1 + Number(data[index].Count));
        } else {
            data.push({
                key: request[type],
                name: request[type],
                Total: Number(request.sellingPrice),
                Count: 1,
            })
        }
    })

    const config = {
        appendPadding: 10,
        data: data,
        forceFit: true,
        angleField: valueKey,
        colorField: 'name',
        radius: 0.9,
        // label: {
        //     visible: true,
        //     type: 'inner',
        // },
        interactions: [{ type: 'element-active' },
        ],
    };
    return <Pie key={Math.random()} {...config} />;
}

export default PieChartView