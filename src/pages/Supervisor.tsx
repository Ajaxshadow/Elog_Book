import { AiFillLeftSquare, AiFillRightSquare, AiOutlineLoading3Quarters } from 'react-icons/ai';
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
} from 'datepicker-custum2';
import { GET_DOCUMENT, useFireHook } from '../hooks/firestoreHooks';
import {
	addDays,
	daysToWeeks,
	differenceInBusinessDays,
	differenceInCalendarWeeks,
	differenceInWeeks,
	parse,
	parseJSON,
	subDays,
} from 'date-fns';

import Button from '../components/Button';
import { CalendarTheme } from '../theme/CalendarTheme';
import { ChakraProvider } from '@chakra-ui/react';
import { DocumentData } from 'firebase/firestore/lite';
import React from 'react';
import { useAppSelector } from '../app/hooks';

const ProgressBar = ({ prg, selected }: { prg: number; selected: boolean }) => {
	return (
		<div className="flex w-full flex-col-reverse items-center ">
			<div
				className={`rounded-lg w-full h-2  ${
					selected ? 'bg-white/50' : 'bg-[#FF4A1C]/20'
				}`}>
				<div
					className={`rounded-lg bg-[#FF4A1C] h-full ${
						selected ? 'bg-white' : 'bg-[#FF4A1C]'
					}`}
					style={{ width: prg + '%' }}></div>
			</div>
			<span
				className={` w-full text-sm font-bold ${
					selected ? 'text-white' : 'text-black/50'
				}`}>
				{prg + '%'}
			</span>
		</div>
	);
};

const Initials = ({ name }: { name: string }) => {
	const [init] = React.useState({
		first: name.split(' ')[0][0],
		last: name.split(' ')[1][0],
	});
	return (
		<div className=" outline outline-1 outline-white h-10 w-10 bg-[#FF4A1C] rounded-full relative">
			<p className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-white">
				{`${init.first}${init.last}`}
			</p>
		</div>
	);
};

export default function Supervisor() {
	const user = useAppSelector(state => state.app.user);
	const { getSupees, getProg, getDaysLeft } = useFireHook();
	const [sps, setSupees] = React.useState<any[]>();
	const [prg, setPrg] = React.useState<any[]>([]);
	const [daysL, setDaysL] = React.useState<any[]>([]);
	const [selsectedStudent, setSelectedStudent] = React.useState('');
	const [dayEntryExists, setDayEntryExists] = React.useState(false);
	const [approved, setApproved] = React.useState(false);
	const [whatWeek, setWhatWeek] = React.useState<{
		weekNum: number;
		dayName: string;
	}>();
	const [highlightedDay, setHighlightedDay] = React.useState<
		CalendarDate | undefined
	>();
	const [startandendDate, setStartandEndDate] = React.useState<{
		start: Date;
		end: Date;
	}>();
	const [selsectedStudentData, setSelectedStudentData] =
		React.useState<DocumentData>();

	const getStuff = async () => {
		if (user) {
			setSupees(await getSupees(user.uid));
		}
	};
	const getPrg = async () => {
		if (sps) {
			setPrg(await getProg(sps));
		}
	};
	const getDays = async () => {
		if (sps) {
			setDaysL(await getDaysLeft(sps));
		}
	};

	const selectStud = (uid: string) => {
		if (selsectedStudent === uid) {
			setSelectedStudent('');
			setSelectedStudentData(undefined);
			setHighlightedDay(undefined)
			return null;
		}
		setSelectedStudent(uid);
		GET_DOCUMENT('students', uid).then(r => {
			if (r) {
				setSelectedStudentData(r.data());
				const sD = new Date(r.data().PARTICULARS.startDate);
				setHighlightedDay(sD);
				setStartandEndDate({ start: sD, end: addDays(sD, 84) });
			}
		});
	};

	const backDate = () => {
		console.log("hello")
		if(highlightedDay){setHighlightedDay(subDays(highlightedDay,1))}
	}

	const frontDate = () => {
		if(highlightedDay){setHighlightedDay(addDays(highlightedDay,1))}
	}

	React.useEffect(() => {
		!sps && getStuff();
		if (!prg || prg.length < 1) {
			getPrg();
		}
		if (!daysL || daysL.length < 1) {
			getDays();
		}
		// console.log({sps,prg,daysL})
	}, [getProg, getDays, sps, prg]);

	React.useEffect(() => {
		console.log({highlightedDay})
		const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
		if (highlightedDay && startandendDate && selsectedStudentData) {
			const x = {
				weekNum:
					differenceInCalendarWeeks(
						highlightedDay,
						startandendDate.start)+1
					,
				dayName: days[parseJSON(highlightedDay).getDay() - 1],
			};
			console.log(x.weekNum)
			try {
				let y =
					selsectedStudentData.WEEKLY_PROGRESS[`Week_${x.weekNum}`][
						`${x.dayName}`
					];
					console.log(selsectedStudentData.WEEKLY_PROGRESS)
				setDayEntryExists(true);
			} catch {
				setDayEntryExists(false);
			}
			setWhatWeek(x);
		}
	}, [highlightedDay,startandendDate]);
	return (
		<div className='flex h-screen flex-col px-3'>
			<div className="h-32 w-full"></div>
			<div className="flex-1 flex gap-3">
			
				<section className="flex flex-col gap-3">
					<div className="  flex flex-col p-2 h-fit rounded-lg bg-white">
						<h1 className="font-bold ml-2 text-xl mb-3">STUDENTS</h1>
						<div className=" overflow-hidden border border-1 border-black/10 rounded-lg">
							<div className=" bg-[#E3E8EF] text-black/50 text-xs flex justify-between py-2 px-3">
								<p className="w-10 text-center whitespace-nowrap">Name</p>
								<p className="flex-1 text-center">Progress</p>
								<p className="flex-1 text-end">Days Left</p>
							</div>
							<div className="flex flex-col gap-2 p-3">
								{sps && prg?.length > 0 && daysL?.length > 0 ? (
									sps.map((i, index) => (
										<div
											key={index}
											onClick={() => {
												selectStud(i.SiD);
											}}
											className={`
								 flex items-center justify-between hover:outline-[#FF4A1C]/50
								 outline outline-2 outline-transparent cursor-pointer 
								transition-[outline] duration-200 rounded-sm py-1
						 rounded-l-full rounded-r-lg p-2 pl-1
								${
							selsectedStudent === i.SiD
								? 'bg-[#FF4A1C] text-white'
								: 'bg-white hover:bg-[#FF4A1C]/5'
						}
								`}>
											<div className="mr-6">
												<Initials name={i.name} />
											</div>
											<div className="flex-1">
												<ProgressBar
													selected={
														selsectedStudent === i.SiD
															? true
															: false
													}
													prg={prg[index][i.SiD]}
												/>
											</div>
											<p className="flex-1 mr-2 text-end">
												{daysL[index][i.SiD]}
											</p>
										</div>
									))
								) : (
									<div className=" w-full h-32 flex flex-col justify-center font-bold text-lg items-center">
										<AiOutlineLoading3Quarters
											className=" animate-spin"
											color="#FF4A1C"
										/>
										<p className=" text-black/50">
											No students have been assigned
											<br />
											to you at this moment
										</p>
									</div>
								)}
							</div>
						</div>
					</div>
					<div className=" flex flex-col rounded-lg p-2 bg-white">
						
							<Calendar
								disableWeekends
								highlightedDay={
									highlightedDay ? highlightedDay : undefined
								}
								allowOutsideDays
								singleDateSelection
								value={startandendDate ? startandendDate : {}}
								weekStartsOn={1}
								onSelectDate={(x: CalendarDate | any) => {
									setHighlightedDay(x);
								}}>
								<CalendarControls>
									<CalendarPrevButton />
									<CalendarNextButton />
								</CalendarControls>
								<CalendarMonths>
									<CalendarMonth>
										<CalendarMonthName />
										<CalendarWeek />
										<CalendarDays />
									</CalendarMonth>
								</CalendarMonths>
							</Calendar>
					</div>
				</section>
				<section className="flex-1 justify-stretch flex-row md:flex-col pb-5">
					<div className=" h-full">
						{!selsectedStudentData ? (
							<div className="bg-white w-full px-5 h-full flex justify-center items-center font-black text-5xl text-[#E3E8EF] uppercase">
								Select a student to view <br /> data here
							</div>
						) : (
							<div className="flex h-full flex-col gap-4">
								<div className='flex h-full flex-col gap-3'>
									<div className='bg-white p-2 rounded-lg"'>
										<h1 className="font-bold uppercase text-xl">
											{
												sps?.find(x =>
													x.SiD
														? x.SiD == selsectedStudent
														: false
												).name
											}
										</h1>
										<p className="text-sm uppercase text-black/50">
											{
												selsectedStudentData.PARTICULARS
													.registrationNumber
											}
										</p>
									</div>
			
									<div className='p-2 rounded-lg  gap-9 flex flex-1 self-start  h-fit justify-between items-center'>
									<div
										className=" cursor-pointer z-50 group"
										onClick={backDate}>
										<AiFillLeftSquare
											size={80}
											className=" stroke-black stroke-[5px] rounded-lg  text-black/10 group-hover:text-[#FF4A1C] group-hover:stroke-0 transition-colors"
										/>
										<p className="w-full text-center text-xs font-extrabold group-hover:text-[#FF4A1C] transition-colors">
											Prev Day
										</p>
									</div>
									<div className='bg-white rounded-xl overflow-hidden'>
										<div className='h-full justify-center flex flex-col'>
											<div className=' font-bold bg-[#94979B] text-white text-right p-2'><p className='text-xs'>Daily Entry for</p> {highlightedDay?<span className=' text-xl font-black'>{
											highlightedDay.toString().split(" ")[2]+" "+
											highlightedDay.toString().split(" ")[0]+" "+
											highlightedDay.toString().split(" ")[1]}
											</span>:""}</div>
												<div className='p-20'>
													<div style={{aspectRatio:"1/1.4"}} className=" text-sm h-[30rem]  overflow-scroll border-[#FF4A1C]/50 shadow-xl rounded-lg text-black/80 w-full">
														<div className=' p-2 flex justify-end bg-black/5'>
															<Button handleClick={()=>{setApproved(true)}} slimmer value={approved?"Approved":"Approve"}/>
														</div>
														<p style={{
														backgroundImage: "linear-gradient(rgba(0,0,0,0.3) 1px, transparent 0px)",
														paddingInline:20,
														backgroundSize: "100% 2em",
														backgroundPositionY: "1.5rem",
														lineHeight: "2em",
													}}>
														{selsectedStudentData.WEEKLY_PROGRESS &&
														whatWeek &&
														dayEntryExists
															? selsectedStudentData.WEEKLY_PROGRESS[
																	`Week_${whatWeek.weekNum}`
															  ][`${whatWeek.dayName}`]
															: 'none'}
													</p>
													</div>
												</div>
										</div>
									</div>
									<div
										className=" cursor-pointer z-50 group"
										onClick={frontDate}>
										<AiFillRightSquare
											size={80}
											className=" stroke-black stroke-[5px] rounded-lg  text-black/10 group-hover:text-[#FF4A1C] group-hover:stroke-0 transition-colors"
										/>
										<p className="w-full text-center text-xs font-extrabold group-hover:text-[#FF4A1C] transition-colors">
											Next Day
										</p>
									</div>
									</div>
								</div>
							</div>
						)}
					</div>
				</section>
			</div>
		</div>
	);
}
