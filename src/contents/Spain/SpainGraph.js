import React from 'react'
import { useEffect, useState } from 'react'
import useDidMountEffect from "../useDidMountEffect";
import {Bar,Doughnut, Line} from "react-chartjs-2"
import Chart from 'chart.js/auto';
import axios from 'axios'

const Graph = () => {
    const [today,setToday]=useState([{Confirmed: 1}]);
    const [weekConfiremd,setWeekConfiremd]=useState([
        {todayComfirmed:1,date:1},{todayComfirmed:1,date:1},{todayComfirmed:1,date:1},{todayComfirmed:1,date:1},{todayComfirmed:1,date:1},{todayComfirmed:1,date:1},{todayComfirmed:1,date:1},{todayComfirmed:1,date:1}]);
    const [graphToday,setGraphToday]=useState(
      {
        labels:["1월","2월","3월"],
        datasets: [
            {
                label:"국내 누적 확진자",
                backgroundColor:"salmon",
                fill:false,
                data: [10,5,3]
            }
        ]
      }
    );

    const [confirmedData, setConfirmedData] = useState({
      labels:["1월","2월","3월"],
              datasets: [
                  {
                      label:"국내 누적 확진자",
                      backgroundColor:"salmon",
                      fill:true,
                      data: [10,5,3]
                  }
              ]
  });


  

   
    
 
    
       
    useEffect(()=>{
        const fetchEvent = () =>{
            fetch("https://api.covid19api.com/total/dayone/country/ES")
            .then(res=>res.json())
            .then(data=>{
              setToday(data)
              console.log(data);
              makeData(data);
            });
          
            
            
            const makeData = (items) =>{
              const arr= items.reduce((acc, cur)=>{
                  const currentDate= new Date(cur.Date);
  
                  const year = currentDate.getFullYear();
                  const month = currentDate.getMonth();
                  const date = currentDate.getDate();
                  const confirmed=cur.Confirmed;
                  const active=cur.Active;
                  const death=cur.Deaths;
                  const recovered=cur.Recovered;
  
                  const findItem= acc.find(a=> a.year === year && a.month=== month)
              
                  if(!findItem){
                      acc.push(
                          {
                              year:year, month: month,date:date, confirmed,active,death,recovered
                          }
                      )
                  }
                  if(findItem && findItem.date< date){
                      findItem.active=active;
                      findItem.death=death;
                      findItem.date=date;
                      findItem.year=year;
                      findItem.month=month;
                      findItem.recovered=recovered;
                      findItem.confirmed=confirmed;
                  }
                  return acc;
              },[]);
              const labels= arr.map(a=> `${a.year}/ ${a.month+1}`)
            setConfirmedData({
                labels,
                datasets: [
                    {
                        label:"국내 누적 확진자",
                        backgroundColor:"skyblue",
                        fill:true,
                        data: arr.map(a=>a.confirmed)
                    }
                ]
            })
            }


              
            
        }
        fetchEvent();   
    }, [])

    //첫 렌더링 막기
    useDidMountEffect(()=>{
        const setWeek = () =>{
            var week=[];
            for(let i=today.length-2;i>today.length-10;i--){
            const todayComfirmed=today[i].Confirmed-today[i-1].Confirmed;
            const date=today[i].Date;
            week.push({todayComfirmed,date});
            }
         
            setWeekConfiremd(week);

            var date=[];
            var weekdata=[];
            
            for(let i=7;i>=0;i--){
              var confirmed=week[i].todayComfirmed;
              var splitDate=week[i].date.split('-');
              var weekDate=`${splitDate[1]}/${splitDate[2].substring(0,2)}`;
              date.push(weekDate);
              weekdata.push(confirmed);
            }
    
            setGraphToday({
              labels:date,
              datasets: [
                {
                    label:"국내 확진자",
                    backgroundColor:"skyblue",
                    fill:false,
                    data: weekdata
                }
              ]
            })

        }
        setWeek();
    },[today])

   const selectArrow=(item) =>{
      const compare=document.getElementById("compareYesterday");
      if(compare==null)
      return;
     if(item>=0){
       compare.innerText=item+"↑";
     }
     else{
       compare.innerText=item+"↓";
       compare.style.background="#eff2ff";
       compare.style.color="#5673EB"
     }
   }
   

    return(
      <div>
      <div id="todaystatic">
          <div id="todayConfirmed">
            <span>오늘 확진자수</span>
            <div id="todaynumber">{weekConfiremd[0].todayComfirmed}명</div>
          </div>
          <div id="comparelist">
          <div className="compare">
            <span>vs 어제</span>
            <span id="compareYesterday" className="comparenumber">{selectArrow(
              weekConfiremd[0].todayComfirmed-weekConfiremd[1].todayComfirmed)
            }</span>
          </div>
          <div className="compare">
            <span>vs 1주일전</span>
            <span className="comparenumber">{weekConfiremd[0].todayComfirmed-weekConfiremd[7].todayComfirmed}↑</span>
          </div>
          </div>
      </div>
        <div className="graph">
          <Line
          data={graphToday}
          />
          </div>
          <div className="graph">
          <Bar 
                data={confirmedData}
          />
          </div>
      </div>
    )
}

export default Graph