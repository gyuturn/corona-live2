import React from 'react'
import { useEffect, useState } from 'react'
import Graph from './BrazilGraph';

const Acc = () => {
    const [acc,setAcc]=useState([{
        Confirmed: 1,
        Deaths: 1,
        Recovered: 1
    }]);//초기값 설정


    let Confirmed=acc[acc.length-1].Confirmed;
    let Deaths=acc[acc.length-1].Deaths;;
    let Recovered=acc[acc.length-1].Recovered;

    useEffect(()=>{
        const fetchEvent = () =>{
            fetch("https://api.covid19api.com/total/dayone/country/BR")
            .then(res=>res.json())
            .then(data=>setAcc(data));

            const exceptPage=document.getElementsByClassName("nation");
            for(let i=0;i<exceptPage.length;i++){
                exceptPage[i].style.background="white";
            }
            const thisPage=document.getElementById(window.location.pathname.substr(1));
            thisPage.style.background="#DCDCDC";
        }
        
        fetchEvent();
      
       
        
        
    },[])
  
    
    return(
        <div>
        <table className="Acc">
            <thead>
                <tr>
                    <td>누적 확진자</td>
                    <td>누적 사망자</td>
                    <td>누적 격리해제</td>
                </tr>
            </thead>
            <tbody>
            <tr>
                <td id="acConfirmed">{Confirmed}</td> 
                <td id="acDeaths">{Deaths}</td>
                <td>{Recovered}</td>

            </tr>
            </tbody>
        </table>
        <Graph/>
        </div>
    )
}

export default Acc