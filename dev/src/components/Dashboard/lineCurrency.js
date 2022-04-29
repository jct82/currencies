import { ResponsiveLine } from '@nivo/line'

const LineCurrency = ({ data, formatData }) => (
    <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 160, bottom: 50, left: 60 }}
        xScale={{
          type: 'time',
          format: formatData.format,
          precision: formatData.precision,
        }}
        xFormat={"time:" + formatData.time}
        yScale={{ type: 'linear', stacked: false}}
        curve="monotoneX"
        axisLeft={{
            legend: 'value $',
            legendOffset: 12,
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
        }}
        axisBottom={{
            format: formatData.time,
            tickValues: formatData.tickValues,
            legend: 'time scale',
            legendOffset: -12,
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
        }}
        enablePointLabel={true}
        pointSize={16}
        pointBorderWidth={1}
        pointBorderColor={{
            from: 'color',
            modifiers: [['darker', 0.3]],
        }}
        useMesh={true}
        enableSlices={false}
    />
)

export default LineCurrency;
