import { ResponsiveLine } from '@nivo/line'

const LineCurrency = ({ data, diffTime }) => {

  //set time scale information for line chart of wallet's user according to period of time in which transactions happened
  let formatData = {};
  if (diffTime < 120) {
    formatData = {
      precision:'second',
      format:'%Y-%m-%d %H:%M:%S',
      tickValues:'every 10 seconds',
      time:"%Hh%M:%S"
    }
  } else if (diffTime < 7200) {
    formatData = {
      precision:'minute',
      format:'%Y-%m-%d %H:%M',
      tickValues:'every 10 minutes',
      time:"%Hh%M"
    }
  } else if (diffTime > 7200) {
    formatData = {
      precision:'hour',
      format:'%Y-%m-%d %H',
      tickValues:'every hour',
      time:"%Hh"
    }
  } 

  return(
      <ResponsiveLine
          data={data}
          margin={{ top: 30, right: 40, bottom: 30, left: 40 }}
          xScale={{
            type: 'time',
            format: formatData.format,
            precision: formatData.precision,
          }}
          xFormat={"time:" + formatData.time}
          yScale={{ type: 'linear', stacked: false}}
          colors={{ datum: 'color' }}
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
}

export default LineCurrency;
