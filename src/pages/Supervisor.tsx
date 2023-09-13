import {
  Calendar,
  CalendarControls,
  CalendarDate,
  CalendarDays,
  CalendarMonth,
  CalendarMonthName,
  CalendarMonths,
  CalendarNextButton,
  CalendarPrevButton,
  CalendarWeek,
} from 'datepicker-custum2'
import { GET_DOCUMENT, useFireHook } from '../hooks/firestoreHooks';

import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { CalendarTheme } from '../theme/CalendarTheme';
import { ChakraProvider } from '@chakra-ui/react'
import { DocumentData } from 'firebase/firestore/lite';
import React from 'react'
import { addDays } from 'date-fns';
import { useAppSelector } from '../app/hooks';

const ProgressBar = ({prg,selected}:{prg:number,selected:boolean}) => {
    return(
    <div className='flex w-full flex-col-reverse items-center '>
        <div className={`rounded-lg w-full h-2  ${selected?"bg-white/50":"bg-[#FF4A1C]/20"}`}>
            <div className={`rounded-lg bg-[#FF4A1C] h-full ${selected?"bg-white":"bg-[#FF4A1C]"}`} style={{width:prg+"%"}}>
                
            </div>
        </div> 
        <span className={` w-full text-sm font-bold ${selected?"text-white":"text-black/50"}`}>{prg+"%"}</span>
    </div>
)}

const Initials = ({name}:{name:string}) =>{
    const [init] = React.useState({first:name.split(" ")[0][0],last:name.split(" ")[1][0]})
    return(
        <div className=' h-10 w-10 bg-[#FF4A1C] rounded-full relative'>
            <p className=' absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-white'>
                {`${init.first}${init.last}`}
            </p>
        </div>
    )
}

export default function Supervisor() {
    
    const user = useAppSelector((state) => state.app.user);
    const {getSupees,getProg, getDaysLeft} = useFireHook();
    const [sps, setSupees] = React.useState<any[]>()
    const [prg, setPrg] = React.useState<any[]>([])
    const [daysL, setDaysL] = React.useState<any[]>([])
    const [selsectedStudent, setSelectedStudent] = React.useState("")
    const [highlightedDay, setHighlightedDay] = React.useState<CalendarDate | undefined>()
    const [startandendDate, setStartandEndDate] = React.useState<{start:Date,end:Date}>()
    const [selsectedStudentData, setSelectedStudentData] = React.useState<DocumentData>()
    
    const getStuff = async () => {if(user){setSupees(await getSupees(user.uid))}}
    const getPrg = async () => {if(sps){setPrg(await getProg(sps))}}
    const getDays = async () => {if(sps){setDaysL(await getDaysLeft(sps))}}
      
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
                const sD = new Date(r.data().PARTICULARS.startDate)
                setStartandEndDate({start:sD,end:addDays(sD,84)})
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
        console.log({sps,prg,daysL})
    },[getProg,getDays,sps,prg])

    
    return (
        <div className='mt-10 flex gap-3 px-5'>
        <section className='flex-1 flex flex-col gap-3'>
        <div className=' flex-1 flex flex-col p-5 pb-7 rounded-lg bg-white'>
            <h1 className='font-bold ml-2 text-xl mb-3'>Students</h1>
            <div className=' overflow-hidden border border-1 border-black/10 rounded-lg'>
                <div className=' bg-black/10 text-black/50 text-xs flex justify-between py-2 px-3'>
                    <p className='w-10 mr-6 whitespace-nowrap'>Name</p>
                    <p className='flex-1 text-center'>Progress</p>
                    <p className='flex-1 text-end'>Days Left</p>
                </div>
                <div className='flex flex-col gap-2 p-3'>
                {sps&&prg?.length>0&&daysL?.length>0?
                    sps.map((i,index)=>(
                    <div key={index} onClick={()=>{selectStud(i.SiD)}} className={`
                     flex items-center justify-between hover:outline-[#FF4A1C]/50
                     outline outline-2 outline-transparent cursor-pointer 
                    transition-[outline] duration-200 rounded-sm py-1  
                    ${selsectedStudent === i.SiD?"bg-[#FF4A1C] text-white":"bg-white hover:bg-[#FF4A1C]/5"}
                    `}> 
                        <div className='mr-6'><Initials name={i.name}/></div>
                        <div className='flex-1'><ProgressBar selected={selsectedStudent === i.SiD?true:false} prg={prg[index][i.SiD]}/></div>
                        <p className='flex-1 text-end'>{daysL[index][i.SiD]}</p>
                    </div>
                )):<div className=' w-full h-32 flex flex-col justify-center font-bold text-lg items-center'>
                    <AiOutlineLoading3Quarters className=' animate-spin' color='#FF4A1C'/>
                    <p className=' text-black/50'>No students have been assigned<br />to you at this moment</p></div>}
                </div>
            </div>
        </div>
        <div className=' flex-1 flex flex-col p-5 pb-7 rounded-lg bg-white'>
            <ChakraProvider theme={CalendarTheme}>
                <Calendar disableWeekends  highlightedDay={highlightedDay?highlightedDay:undefined} singleDateSelection  value={startandendDate?startandendDate:{}} weekStartsOn={1} onSelectDate={(x:CalendarDate|any)=>{console.log(x);setHighlightedDay(x)}}>
                    <CalendarControls>
                        <CalendarPrevButton />
                        <CalendarNextButton />
                    </CalendarControls>
                    <CalendarMonths>
                        <CalendarMonth>
                            <CalendarMonthName />
                            <CalendarWeek />
                            <CalendarDays  />
                        </CalendarMonth>
                    </CalendarMonths>
                </Calendar>
            </ChakraProvider>
        </div>
        </section>
        <section className='flex-[2] justify-stretch flex-row md:flex-col pb-5'>
            <div className='bg-white h-full p-5 rounded-lg'>
                {!selsectedStudentData
                    ?<div className='w-full h-full flex justify-center items-center font-black text-5xl text-black/20 uppercase'>
                        Select a student to view <br /> data here
                    </div>
                    :<div className='flex flex-col gap-4'>
                        <div>
                            <h1 className='font-bold text-xl'>
                                {sps?.find(x=>x.SiD == selsectedStudent).name}
                            </h1>
                            <p className='text-sm text-black/50'>
                                {selsectedStudentData.PARTICULARS.registrationNumber}
                            </p>
                            <p className='text-sm text-black/50'>
                                {selsectedStudentData.WEEKLY_PROGRESS?selsectedStudentData.WEEKLY_PROGRESS.Week_1.friday:"none"}
                            </p>
                        </div>
                      
                    </div>
                }
            </div>
        </section>
        </div>
    )
}
