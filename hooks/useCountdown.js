'use client';
import {useEffect, useState} from 'react';
import {siteConfig} from '../config/site';

export function useCountdown() {
  const [now,setNow] = useState(null);
  useEffect(()=>{
    setNow(Date.now());
    const interval=window.setInterval(()=>setNow(Date.now()),1000);
    return ()=>window.clearInterval(interval);
  },[]);
  if(now===null) return {ready:false,active:false,parts:[null,null,null,null]};
  const target=siteConfig.promoEndsAt ? new Date(siteConfig.promoEndsAt).getTime() : NaN;
  const time=Number.isFinite(target) ? Math.max(0,target-now) : 0;
  return {
    ready:true,active:time>0,
    parts:[Math.floor(time/86400000),Math.floor(time/3600000)%24,Math.floor(time/60000)%60,Math.floor(time/1000)%60],
  };
}
