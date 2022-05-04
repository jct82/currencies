import { ResponsiveLine } from '@nivo/line';

const LineCurrency = ({ data }) => (

    <ResponsiveLine
        data={data}
        margin={{ top: 30, right: 40, bottom: 30, left: 40 }}
        xScale={{
          type: 'time',
          format: '%Y-%m-%d',
          precision: 'day',
        }}
        xFormat="time:%Y-%m-%d"
        yScale={{ type: 'linear', stacked: false}}
        curve="monotoneX"
        colors={{ datum: 'color' }}
        axisLeft={{
            legend: 'value $',
            legendOffset: 12,
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
        }}
        axisBottom={{
            format: "%b %d",
            tickValues: 'every day',
            legend: 'time scale',
            legendOffset: -12,
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
        }}
        enablePointLabel={true}
        tooltip={({point}) => (
            <div style={{padding:'2px 4px', background:`${point.serieColor}`, fontSize: '10px'}}>
              {point.serieId} : {point.data.y}$
            </div>
          )}
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
