import { useSelector } from 'react-redux';
import { useState } from 'react';

import UserRow from './userRow';
import PieChart from './pieChart';
import LineCurrency from './lineCurrency';
import './styles.scss';


const Dashboard = () => {

  const { wallet, name, money } = useSelector((state) => state.buyer);
  let [curSorted, setCurSorted] = useState(wallet);
  let [sortedDir, setSortedDir] = useState('up');


  const roundNum = (num) => Math.round(num * 100) / 100;

  const sortTab = (e) => {
    let type = e.target.getAttribute('type');
    let sorted = [...curSorted].sort((a, b) => {
      if (a[type] > b[type]) return sortedDir == 'up' ? 1 : -1;
      if (a[type] < b[type]) return sortedDir == 'up' ? -1 : 1;
      return 0;
    });
    setSortedDir(sortedDir == 'up' ? 'down' : 'up');
    setCurSorted(sorted);
  }

  let JSXRow = curSorted.map(elem => <UserRow key={elem.name} data={elem} />);

  let amount = 0;
  wallet.forEach(cur => amount += (cur.inverseRate * cur.quantity));

  let chartData = wallet.map(slice => ({
    'id':slice.name,
    'label':slice.name,
    'value':roundNum(slice.quantity * slice.inverseRate),
    //'color': '#' + Math.floor(Math.random()*16777215).toString(16),
  }));

  //currency line
  let prevDate = new Date();
  let lateDate = new Date();
  let diffTime = 0;
  if (wallet.length) {
    prevDate = wallet[0].sell[0].date;
    lateDate = wallet[wallet.length - 1].sell[wallet[wallet.length - 1].sell.length - 1].date;
    diffTime = Math.round((lateDate.getTime() - prevDate.getTime()) / 1000);
  }  

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

  const twoD = (digit => (String(digit).padStart(2, '0')));

  let data = [];
  wallet.forEach(cur => {
    let dataTab = [];
    cur.sell.forEach(trans => {
      const parsedDate = ''+trans.date.getFullYear()+'-'
      +twoD(trans.date.getMonth()+1)+'-'
      +twoD(trans.date.getDate())+' '
      +twoD(trans.date.getHours())+':'
      +twoD(trans.date.getMinutes())+':'
      +twoD(trans.date.getSeconds());
      dataTab.push({x: parsedDate, y: roundNum(trans.amount * cur.inverseRate)})
      console.log('parsedDate',parsedDate);
    });
    data.push({'id':cur.name, 'data':dataTab});
  });

  return (
    <div>
      <div className="pieChart">
        <PieChart data={chartData} globalVal={amount} />
      </div>
      <div className="pieChart">
        <LineCurrency data={data} formatData={formatData} />
      </div>
      <div className="dashboard">
        <div className="user-info">
          <div>{name}</div> 
          <div>Panier&nbsp;: <span>{roundNum(amount).toLocaleString()}&nbsp;$</span></div>
          <div>Disponible&nbsp;: <span>{roundNum(money).toLocaleString()}&nbsp;$</span></div>
        </div>
        <div className="currency-tab tab">
          <div className="row th">
            <div className={`cell name ${sortedDir} sorted`} onClick={sortTab} type="name">nom<div className="arrow asc"></div><div className="arrow des"></div></div>
            <div className={`cell rate ${sortedDir} sorted`} onClick={sortTab} type="rate">taux<div className="arrow asc"></div><div className="arrow des"></div></div>
            <div className={`cell inverse ${sortedDir} sorted`} onClick={sortTab} type="inverseRate">taux inversé<div className="arrow asc"></div><div className="arrow des"></div></div>
            <div className={`cell quantity ${sortedDir} sorted`} onClick={sortTab} type="quantity">quantité<div className="asc"></div><div className="des"></div></div>
            <div className="cell cta">vendre</div>
          </div>
          {JSXRow}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
