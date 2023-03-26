import React from 'react'

type Props = {
    LeftSide?: JSX.Element;
    RightSide?: JSX.Element;
    isLast?: boolean;
    isFirst?: string;
    hasOneItem?: boolean;

}

export function TimeLine({ LeftSide, RightSide, isLast, isFirst, hasOneItem }: Props) {
    const bollTrueColor = 'border-blue bg-blue'
    const bollFalseColor = 'border-gray bg-gray'
    const lineTrueColor = 'bg-blue'
    const lineFalseColor = 'bg-gray'
    return (
        <>
            {isFirst !== 'create' && <div className="pl-0">
                <div className="flex flex-col">
                    <div className="relative flex min-h-[70px]">
                        <div className="flex-1 px-4 text-right">
                            <div className="">
                                <small className={`${isLast ? 'font-semibold' : ''}`}>{LeftSide}</small>
                            </div>
                        </div>

                        <div className="flex flex-initial flex-col items-center">
                            <div className={`${isLast ? bollTrueColor : bollFalseColor} flex h-4 w-4 self-baseline rounded-full  boll`}></div>
                            {!hasOneItem && <div className={`${isLast ? lineTrueColor : lineFalseColor} w-[2px] flex-grow  line`}></div>}
                        </div>

                        <div className="flex-1 px-4 text-left">
                            <small className={`capitalize ${isLast ? 'font-semibold' : ''}`}>{RightSide}</small>
                        </div>

                    </div>
                </div>
            </div>}
            {isFirst === 'create' && <div className="pl-0">
                <div className="flex flex-col">
                    <div className="relative flex min-h-[70px]">
                        <div className="flex-1 px-4 text-right">
                            <div className="">
                                <small className={`${isLast ? 'font-semibold' : ''}`}>{LeftSide}</small>
                            </div>
                        </div>

                        <div className="flex flex-initial flex-col items-center">
                            <div className={`${isLast ? bollTrueColor : bollFalseColor} flex h-4 w-4 self-baseline rounded-full  boll`}></div>

                        </div>

                        <div className="flex-1 px-4 text-left">
                            <small className={`capitalize ${isLast ? 'font-semibold' : ''}`}>{RightSide}</small>
                        </div>
                    </div>
                </div>
            </div>}
        </>


    )
}

export default TimeLine
