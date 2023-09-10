import { DocumentData } from 'firebase/firestore';
import React from 'react'
import { type } from 'os';
import { useAppSelector } from '../app/hooks';
import { useFireHook } from '../hooks/firestoreHooks';

export default function Supervisor() {
    
    const user = useAppSelector((state) => state.app.user);
    const {getSupees,getProg} = useFireHook();
    const [sps, setSupees] = React.useState<any[]>()
    const [prg, setPrg] = React.useState<any[]>([])
    
    const getStuff = async () => {if(user){setSupees(await getSupees(user.uid))}}
    const getPrg = async () => {if(sps){setPrg(await getProg(sps))}}
    
    React.useEffect(()=>{!sps&&getStuff();if(!prg||prg.length<1){getPrg()}},[getProg,sps,prg])

    const ProgressBar = (prg:number|any) => (
        <div className='flex items-center gap-3'>
            <div className='rounded-lg w-28 h-2 bg-black/10'>
                <div className={`rounded-lg bg-[#FF4A1C] h-full`} style={{width:prg.prg+"%"}}>
                    
                </div>
            </div> 
            <span className=' text-sm font-bold text-black/50'>{prg.prg+"%"}</span>
        </div>
    )



    return (
        <div className=' flex h-80'>
        <section className='p-5 flex-1'>
        <div className='mt-10 flex-1 flex flex-col p-2 rounded-lg bg-white'>
            <h1 className='font-bold ml-2 text-xl mb-3'>Students</h1>
            <div className=' overflow-hidden border border-1 border-black/20 rounded-lg'>
                <div className=' bg-black/20 text-black/50 text-xs flex justify-between py-2 px-4'>
                    <p className='flex-1'>Name</p>
                    <p className='flex-1'>Progress</p>
                    <p className='flex-1 text-end'>Days Left</p>
                </div>
                <div className='flex flex-col gap-2 p-2'>
                {sps&&prg?.length>0?sps.map((i,index)=>(
                    <div key={index} className='bg-white flex items-center justify-between hover:outline-[#FF4A1C]/50 hover:bg-[#FF4A1C]/5 outline outline-2 outline-transparent cursor-pointer transition-[outline] duration-200 rounded-sm px-2'>
                        <p className='flex-1'>{i.name}</p>
                        <div className='flex-1'><ProgressBar prg={prg[index][i.SiD]}/></div>
                        <p className='flex-1 text-end'>days left</p>
                    </div>
                )):null}
                </div>
            </div>
        </div>
        </section>
        <section className='flex-[2]'>
            <div></div>
        </section>
        </div>
    )
}
