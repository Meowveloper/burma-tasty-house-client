import CountUp from "react-countup";
interface IProps {
    end : number, 
    duration : number, 
    text : string
}
export default function CountUpCard({ end, duration = 3, text }: IProps) {
    return (
        <div className="bg-dark-elevate px-3 py-4 rounded-normal">
            <CountUp start={0} end={end} duration={duration} className="text-[50px] text-wrap break-words" />
            <div className="px-3 text-white">{text}</div>
        </div>
    );
}
