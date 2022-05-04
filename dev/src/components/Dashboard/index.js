import { useSelector } from 'react-redux';
import { useState } from 'react';

import { roundNum, twoD } from "../../utils/methods";
import UserRow from './userRow';
import PieChart from './pieChart';
import LineCurrency from './lineCurrency';
import './styles.scss';


const Dashboard = () => {

  const wallet = useSelector((state) => state.buyer.wallet);
  let [curSorted, setCurSorted] = useState(wallet);
  let [sortedDir, setSortedDir] = useState('up');

  //sort currency tab according to selected type of information
  const sortTab = (e) => {
    let type = e.target.getAttribute('type');
    let sorted = [...curSorted].sort((a, b) => {
      if (a[type] > b[type]) return sortedDir === 'up' ? 1 : -1;
      if (a[type] < b[type]) return sortedDir === 'up' ? -1 : 1;
      return 0;
    });
    setSortedDir(sortedDir === 'up' ? 'down' : 'up');
    setCurSorted(sorted);
  }

  // JSX element of currency user's wallet tab rows
  let JSXRow = curSorted.map(elem => <UserRow key={elem.name} data={elem} />);

  //prepare data for donut chart
  let chartData = wallet.map(slice => ({
    'id':slice.name,
    'label':slice.name,
    'value':roundNum((slice.quantity * slice.inverseRate), 100),
    'color': slice.color,
  }));

  //ascertain time period between first and last wallet transaction
  //to define time line and time scale of line chart for currency user's wallet
  let prevDate = new Date();
  let lateDate = new Date();
  let diffTime = 0;

  if (wallet.length) {
    prevDate = wallet[0].sell[0].date;
    lateDate = wallet[wallet.length - 1].sell[wallet[wallet.length - 1].sell.length - 1].date;
    diffTime = Math.round((lateDate.getTime() - prevDate.getTime()) / 1000);
  }  

  //prepare date format of wallet transaction for line chart
  let lineData = wallet.map(cur => {
    let dataTab = cur.sell.map(trans => {
      const parsedDate = `${trans.date.getFullYear()}${'-'
      }${twoD(trans.date.getMonth() + 1)}${'-'
      }${twoD(trans.date.getDate())}${' '
      }${twoD(trans.date.getHours() - 2)}${':'
      }${twoD(trans.date.getMinutes())}${':'
      }${twoD(trans.date.getSeconds())}`;
      return ({x: parsedDate, y: roundNum(trans.amount * cur.inverseRate, 10)});
    });
    return ({'id':cur.name, 'data':dataTab, 'color':cur.color});
  });

  //set legends for currency user's line chart
  const JSXLegends = lineData.map(elem => (
    <div className="legend-block" key={elem.id}>
      <div className="color" style={{backgroundColor:elem.color}}></div>{elem.id}
    </div>
  ));

  return (
    <div className="dashboard">
      {!!wallet.length &&
      <div className="charts">
        <div className="pieChart">
          <PieChart data={chartData} />
        </div>
        <div className="courb-wrapper">
          <div className="courbChart">
            <LineCurrency data={lineData} diffTime={diffTime}/>
          </div>
          <div className="legends">
            {JSXLegends}
          </div>
        </div>
      </div>}
      <div className="currency-tab tab">
        <div className="row th">
          <div className={`cell name ${sortedDir} sorted`} onClick={sortTab} type="name">
            nom
            <div className="arrow asc"></div>
            <div className="arrow des"></div>
          </div>
          <div className={`cell rate ${sortedDir} sorted`} onClick={sortTab} type="rate">
            taux
            <div className="arrow asc"></div>
            <div className="arrow des"></div>
          </div>
          <div className={`cell inverse ${sortedDir} sorted`} onClick={sortTab} type="inverseRate">
            taux inversé
            <div className="arrow asc"></div>
            <div className="arrow des"></div>
          </div>
          <div className={`cell quantity ${sortedDir} sorted`} onClick={sortTab} type="quantity">
            quantité
            <div className="arrow asc"></div>
            <div className="arrow des"></div>
          </div>
          <div className="cell cta">vendre</div>
        </div>
        {JSXRow}
      </div>
    </div>
  );
}

export default Dashboard;
