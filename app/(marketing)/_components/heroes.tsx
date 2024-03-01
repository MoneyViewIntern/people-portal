import Image from "next/image";
export const Heroes =()=>{
    return(
        <div className="flex flex-col items-center justify-center  maxw-5xl">
            <div className="flex items-center">
                <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] sm:w-[350px] sm:h-[350px]">
                    <Image src="/images/documents.png"
                     fill
                     className="object-contain dark:hidden"
                     alt="Documents" />
                      <Image src="/images/documents-dark.png"
                     fill
                     className="object-contain hidden dark:block"
                     alt="Documents" />
                </div>
                <div className="relative w-[400px] h-[400px] hidden md:block">
                    <Image src="/images/reading.png"
                     fill
                     className="object-contain dark:hidden"
                     alt="Reading" />
                      <Image src="/images/reading-dark.png"
                     fill
                     className="object-contain hidden dark:block"
                     alt="Reading" />
                </div>

            </div>
        </div>
    )
}