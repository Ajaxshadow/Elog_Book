import { DateCalendar, DateRangeIcon, PickersDay, PickersDayProps } from '@mui/x-date-pickers';
import { GET_DOCUMENT, useFireHook } from '../hooks/firestoreHooks';
import dayjs, { Dayjs } from 'dayjs';

import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { Badge } from '@mui/material';
import { DocumentData } from 'firebase/firestore';
import React from 'react'
import styled from '@emotion/styled';
import { type } from 'os';
import { useAppSelector } from '../app/hooks';

const ProgressBar = ({prg,selected}:{prg:number,selected:boolean}) => {
    return(
    <div className='flex items-center gap-3'>
        <div className={`rounded-lg w-28 h-2  ${selected?"bg-white/50":"bg-[#FF4A1C]/20"}`}>
            <div className={`rounded-lg bg-[#FF4A1C] h-full ${selected?"bg-white":"bg-[#FF4A1C]"}`} style={{width:prg+"%"}}>
                
            </div>
        </div> 
        <span className={` text-sm font-bold  ${selected?"text-white":"text-black/50"}`}>{prg+"%"}</span>
    </div>
)}

export default function Supervisor() {
    
    const user = useAppSelector((state) => state.app.user);
    const {getSupees,getProg, getDaysLeft} = useFireHook();
    const [sps, setSupees] = React.useState<any[]>()
    const [prg, setPrg] = React.useState<any[]>([])
    const [daysL, setDaysL] = React.useState<any[]>([])
    const [selsectedStudent, setSelectedStudent] = React.useState("")
    const [highlightedDays, setHighlightedDays] = React.useState([1,2,3,4])
    const [selsectedStudentData, setSelectedStudentData] = React.useState<DocumentData>()
    
    const getStuff = async () => {if(user){setSupees(await getSupees(user.uid))}}
    const getPrg = async () => {if(sps){setPrg(await getProg(sps))}}
    const getDays = async () => {if(sps){setDaysL(await getDaysLeft(sps))}}
    
    // const HighlightedDay = styled(PickersDay)(({ theme }) => ({
    //     "&.Mui-selected": {
    //       backgroundColor: "#FF4A1C",
    //       color: "FFFFFF",
    //     },
    //   }));
      
      function ServerDay(props: PickersDayProps<Dayjs> & { highlightedDays?: number[] }) {
        const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;
      
        const isSelected =
          !props.outsideCurrentMonth && highlightedDays.indexOf(props.day.date()) >= 0;
      
          return (
              <PickersDay  {...other} disableMargin selected={isSelected} outsideCurrentMonth={outsideCurrentMonth} day={day} />
              
          );
      };
      
    const selectStud = (uid:string) => {
        if(selsectedStudent === uid){
            setSelectedStudent("")
            setSelectedStudentData(undefined)
            return null
        }
        setSelectedStudent(uid)
        GET_DOCUMENT("students",uid).then((r)=>{
            if(r){
                setSelectedStudentData(r.data())
            }
        })
    }

    React.useEffect(()=>{
        !sps&&getStuff();
        if(!prg||prg.length<1){
            getPrg()
        }
        if(!daysL||daysL.length<1){
            getDays()
        }
    },[getProg,getDays,sps,prg])

    
    return (
        <div className='mt-10 flex gap-5 h-80 px-5'>
        <section className='flex-1'>
        <div className=' flex-1 flex flex-col p-5 pb-7 rounded-lg bg-white'>
            <h1 className='font-bold ml-2 text-xl mb-3'>Students</h1>
            <div className=' overflow-hidden border border-1 border-black/10 rounded-lg'>
                <div className=' bg-black/10 text-black/50 text-xs flex justify-between py-2 px-4'>
                    <p className='flex-1'>Name</p>
                    <p className='flex-1'>Progress</p>
                    <p className='flex-1 text-end'>Days Left</p>
                </div>
                <div className='flex flex-col gap-2 p-3'>
                {sps&&prg?.length>0&&daysL?.length>0?
                    sps.map((i,index)=>(
                    <div key={index} onClick={()=>{selectStud(i.SiD)}} className={`
                     flex items-center justify-between hover:outline-[#FF4A1C]/50
                     outline outline-2 outline-transparent cursor-pointer 
                    transition-[outline] duration-200 rounded-sm py-1 px-2 
                    ${selsectedStudent === i.SiD?"bg-[#FF4A1C] text-white":"bg-white hover:bg-[#FF4A1C]/5"}
                    `}>
                        <p className='flex-1'>{i.name}</p>
                        <div className='flex-1'><ProgressBar selected={selsectedStudent === i.SiD?true:false} prg={prg[index][i.SiD]}/></div>
                        <p className='flex-1 text-end'>{daysL[index][i.SiD]}</p>
                    </div>
                )):<div className=' w-full h-32 flex flex-col justify-center font-bold text-lg items-center'>
                    <AiOutlineLoading3Quarters className=' animate-spin' color='#FF4A1C'/>
                    <p className=' text-black/50'>No students have been assigned<br />to you at this moment</p></div>}
                </div>
            </div>
        </div>
        </section>
        <section className='flex-[2] pb-5'>
            <div className='bg-white h-full p-5 rounded-lg'>
                
                {!selsectedStudentData
                    ?<div className='w-full h-full flex justify-center items-center font-black text-5xl text-black/20 uppercase'>
                        Select a student to view <br /> data here
                    </div>
                    :<div>
                        
                        <div>
                            <h1 className='font-bold text-xl'>
                                {sps?.find(x=>x.SiD == selsectedStudent).name}
                            </h1>
                            <p className='text-sm text-black/50'>{selsectedStudentData.PARTICULARS.registrationNumber}</p>
                        </div>
                        
                        <DateCalendar 
                            slots={{day:ServerDay}}
                            slotProps={{
                                day: {
                                  highlightedDays,
                                } as any,
                              }}
                              
                            value={dayjs(selsectedStudentData.PARTICULARS.startDate)} />
                    </div>
                }
            </div>
        </section>
        </div>
    )
}
