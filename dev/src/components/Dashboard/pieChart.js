import { ResponsivePie } from '@nivo/pie';

import { roundNum } from "../../utils/methods";
import './styles.scss';

const PieChart = ({data}) => {
  //set general data in the middle of the donut chart
  const CenteredMetric = ({ dataWithArc, centerX, centerY }) => {
    
    let total = 0
    dataWithArc.forEach(datum => {
        total += datum.value
    })
    
    return (
      <text
        x={centerX}
        y={centerY}
          textAnchor="middle"
          dominantBaseline="central"
          style={{
          fontSize: '18px',
          fontWeight: 600,
        }}
      >
        {`${roundNum(total, 10)} $`}
      </text>
    )
  }

  return(
  <ResponsivePie
      data={data}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      colors={{ datum: 'data.color' }}
      borderColor={{
          from: 'color',
          modifiers: [
              [
                  'darker',
                  0.2
              ]
          ]
      }}
      layers={['arcs', 'arcLabels', 'arcLinkLabels', 'legends', CenteredMetric]}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: 'color' }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
          from: 'color',
          modifiers: [
              [
                  'darker',
                  2
              ]
          ]
      }}
      valueFormat={value =>
        `${value} $`
      }
      tooltip={({ datum: { id, value, arc } }) => (
        <div style={{padding:6, backgroundColor: 'rgba(255, 255, 255, 0.5)', borderRadius: '5px', fontSize: 11, textAlign: 'center'}}>
          {id}: {value} $
          <br /> 
          {roundNum((Math.round((arc.angleDeg - arc.padAngle), 100) / 360 * 100), 100)} %
        </div>
      )}
      defs={[
          {
              id: 'dots',
              type: 'patternDots',
              background: 'inherit',
              color: 'rgba(255, 255, 255, 0.3)',
              size: 4,
              padding: 1,
              stagger: true
          },
          {
              id: 'lines',
              type: 'patternLines',
              background: 'inherit',
              color: 'rgba(255, 255, 255, 0.3)',
              rotation: -45,
              lineWidth: 6,
              spacing: 10
          }
      ]}
      fill={[
          {
              match: {
                  id: 'Australian Dollar'
              },
              id: 'dots'
          },
          {
              match: {
                  id: 'c'
              },
              id: 'dots'
          },
          {
              match: {
                  id: 'go'
              },
              id: 'dots'
          },
          {
              match: {
                  id: 'python'
              },
              id: 'dots'
          },
          {
              match: {
                  id: 'scala'
              },
              id: 'lines'
          },
          {
              match: {
                  id: 'lisp'
              },
              id: 'lines'
          },
          {
              match: {
                  id: 'elixir'
              },
              id: 'lines'
          },
          {
              match: {
                  id: 'javascript'
              },
              id: 'lines'
          }
      ]}
  />);
}

export default PieChart;
